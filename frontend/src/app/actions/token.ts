import { createClient } from '@/utils/supabase/server';
import * as Sentry from "@sentry/nextjs";

const { 
  BKASH_USERNAME,
  BKASH_PASSWORD,
  BKASH_APP_KEY,
  BKASH_APP_SECRET_KEY,
  BKASH_API_URL,
} = process.env;

const supabase = createClient();

export const getIDToken = async () => {
  return await Sentry.withServerActionInstrumentation(
    "getIDToken",
    async () => {
      const { data, error } = await supabase.from("bkash_tokens").select("id_token, refresh_token, expires_at").order('created_at', { ascending: false }).limit(1);

  if (error) {
    throw new Error(error.message);
  }

  // Case: no token in DB
  // get access token from bKash and save in DB
  if (data.length === 0) {
    const { id_token, refresh_token, expires_in } = await getAccessToken();
    await supabase.from("bkash_tokens").insert({ id_token, refresh_token, expires_at: Date.now() + expires_in });
    return id_token;
  }

  const { id_token, refresh_token, expires_at } = data[0];

  if (!id_token || !refresh_token || !expires_at) {
    throw new Error("Invalid token data in DB");
  }

  // Case: token in DB but expired
  // refresh token and save in DB
  if (expires_at < Date.now()) {
    // TODO: delete all existing tokens
    console.log("Token expired, refreshing token");
    const { id_token, refresh_token: newRefreshToken, expires_in } = await getRefreshToken(refresh_token);

    const SECONDS_TO_MILLISECONDS = 1000;
    const newExpiryTime = Date.now() + expires_in * SECONDS_TO_MILLISECONDS;

    console.log("existing expiry time", new Date(expires_at).toLocaleString());
    console.log("current_time", new Date(Date.now()).toLocaleString());
    console.log("new expiry time", new Date(newExpiryTime).toLocaleString());

    await supabase.from("bkash_tokens").upsert({ id_token, refresh_token: newRefreshToken, expires_at: newExpiryTime });
    return id_token;
  }

  if (!id_token) {
    throw new Error("Unable to get id token");
  }

  // Case: token in DB and not expired
  return id_token;
    }
  )
}

export const getAccessToken = async () => {
  return await Sentry.withServerActionInstrumentation(
    "getAccessToken",
    async () => {
      try {
        if (!BKASH_USERNAME || !BKASH_PASSWORD) {
          throw new Error("Missing bkash username or password");
        }
        if (!BKASH_API_URL) {
          throw new Error("Missing bkash api url");
        }
    
        const result = await fetch(`${BKASH_API_URL}/token/grant`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
            username: BKASH_USERNAME,
            password: BKASH_PASSWORD,
          },
          body: JSON.stringify({
            app_key: BKASH_APP_KEY,
            app_secret: BKASH_APP_SECRET_KEY
          })
        });
        const data = await result.json();
        return data;
      } catch(err) {
        Sentry.captureException(err);
        throw new Error("Error getting access token", err as Error);
      }
    }
  )
};

const getRefreshToken = async (refreshToken: string) => {
  return await Sentry.withServerActionInstrumentation(
    "getRefreshToken",
    async () => {
      try {
        if (!BKASH_USERNAME || !BKASH_PASSWORD) {
          throw new Error("Missing bkash username or password");
        }
        if (!BKASH_API_URL) {
          throw new Error("Missing bkash api url");
        }
    
        const result = await fetch(`${BKASH_API_URL}/token/grant`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
            username: BKASH_USERNAME,
            password: BKASH_PASSWORD,
          },
          body: JSON.stringify({
            app_key: BKASH_APP_KEY,
            app_secret: BKASH_APP_SECRET_KEY,
            refresh_token: refreshToken
          })
        });
        const data = await result.json();
        return data;
      } catch(err) {
        Sentry.captureException(err);
        throw new Error("Error refreshing token", err as Error);
      }
    }
  )
}

