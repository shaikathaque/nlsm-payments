'use server';

import { redirect } from "next/navigation";

const { 
  BKASH_USERNAME,
  BKASH_PASSWORD,
  BKASH_APP_KEY,
  BKASH_APP_SECRET_KEY,
  BKASH_API_URL,
  BKASH_CALLBACK_URL
} = process.env;

let BKASH_ID_TOKEN: string;
let BKASH_REFRESH_TOKEN: string;
let TOKEN_EXPIRY_TIME: number;

export const startPayment = async () => {
  let paymentPageUrl;
  try {
    // Case: token is not loaded yet
    // This is incorrect because it the API may load an old ID token
    if (!BKASH_ID_TOKEN) {
      const { id_token, refresh_token, expires_in } = await getAccessToken();
      BKASH_ID_TOKEN = id_token;
      BKASH_REFRESH_TOKEN = refresh_token;
      TOKEN_EXPIRY_TIME = Date.now() + expires_in 
    }

    // Case: token is expired or will expire in 5 minutes

    if (TOKEN_EXPIRY_TIME && (TOKEN_EXPIRY_TIME - Date.now() > 300)) {
      await refreshToken();
    }
    
    const createPaymentResult = await createPayment();

    const { message } = createPaymentResult;
    if (message === "The incoming token has expired") {
      await refreshToken();
      // retry the request now the token is refresed
      throw new Error("Create payment failed", message);
    }

    const { bkashURL, statusCode } = createPaymentResult;
    if (statusCode !== "0000" ) {
      throw new Error("Create payment failed", createPaymentResult);
    }

    // save the redirect url as next.js doesn't support redirect inside of try/catch block
    paymentPageUrl = bkashURL;
  } catch(err) {
    // Notify user something went wrong
    console.log("startPayment Error:", err);
  } finally {
    if (paymentPageUrl) {
      redirect(paymentPageUrl);
    }
  }
};

export const getAccessToken = async () => {
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
    console.log(59, data);
    return data;
  } catch(err) {
    console.log("Failed to get access token", err);
  }
};

const createPayment = async () => {
  try {
    if (!BKASH_APP_KEY) {
      throw new Error("Missing bkash app key");
    }
    if (!BKASH_API_URL) {
      throw new Error("Missing bkash api url");
    }

    const result = await fetch(`${BKASH_API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        authorization: BKASH_ID_TOKEN,
        "x-app-key": BKASH_APP_KEY,
      },
      body: JSON.stringify({
        mode: "0011",
        payerReference: "ekjfdednrekjfvbrwkjf",
        callbackURL: BKASH_CALLBACK_URL,
        amount: "500",
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "ewlkfedwenmrlewknfcewf",
      })
    })
    const data = await result.json();
    return data;
  } catch(err) {
    throw new Error("Failed to create payment", err as Error);
  }
};

const refreshToken = async () => {
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
        refresh_token: BKASH_REFRESH_TOKEN
      })
    });
    const data = await result.json();
    const { id_token, refresh_token, expires_in } = data;
    BKASH_ID_TOKEN = id_token;
    BKASH_REFRESH_TOKEN = refresh_token;    
    TOKEN_EXPIRY_TIME = Date.now() + expires_in;
    return data;
  } catch(err) {
    console.log("Error refreshing token", err);
  }
}

export const executePayment = async (paymentID: string) => {
  try {
    if (!BKASH_APP_KEY) {
      throw new Error("Missing bkash app key");
    }
    if (!BKASH_API_URL) {
      throw new Error("Missing bkash api url");
    }

    const result = await fetch(`${BKASH_API_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        authorization: BKASH_ID_TOKEN,
        "x-app-key": BKASH_APP_KEY,
      },
      body: JSON.stringify({
        paymentID
      })
    })
    const data = await result.json();

    const { message } = data;
    if (message === "Unauthorized") {
      await refreshToken();
      // reload the page to repeat the payment execution request
    }

    console.log("executePayment data:", data);
    return data;
  } catch(err) {
    throw new Error("Failed to execute payment", err as Error);
  }
};

/*
  Example API responses

  createPaymentResult 
  {
    paymentID: 'TR0011uXvkIHi1721914517574',
    bkashURL: 'https://sandbox.payment.bkash.com/?paymentId=TR0011uXvkIHi1721914517574&hash=IIXf7SnWYKHEB!UkSTHj32NEJ(-GP(VWMeISlA.CZ*FIIfey7V65E_hs.A!bGFoe6KeC8ho0PsgsUR5r9*qtShHhoNQ1u4AJS54t1721914517574&mode=0011&apiVersion=v1.2.0-beta/',
    callbackURL: 'http://localhost:3000',
    successCallbackURL: 'http://localhost:3000?paymentID=TR0011uXvkIHi1721914517574&status=success&signature=01ocP0yi8N',
    failureCallbackURL: 'http://localhost:3000?paymentID=TR0011uXvkIHi1721914517574&status=failure&signature=01ocP0yi8N',
    cancelledCallbackURL: 'http://localhost:3000?paymentID=TR0011uXvkIHi1721914517574&status=cancel&signature=01ocP0yi8N',
    amount: '500',
    intent: 'sale',
    currency: 'BDT',
    paymentCreateTime: '2024-07-25T19:35:17:574 GMT+0600',
    transactionStatus: 'Initiated',
    merchantInvoiceNumber: '123456',
    statusCode: '0000',
    statusMessage: 'Successful'
  }

  Token grant result
  {
    statusCode: '0000',
    statusMessage: 'Successful',
    id_token: 'eyJraWQiOiJvTVJzNU9ZY0wrUnRXQ2o3ZEJtdlc5VDBEcytrckw5M1NzY0VqUzlERXVzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzZmNmMTFhOC0yYTI0LTQ5YjAtYjZlNC1iYTZkOGFiOWNlNDgiLCJhdWQiOiI2cDdhcWVzZmljZTAxazltNWdxZTJhMGlhaCIsImV2ZW50X2lkIjoiZjRkNzgzNmUtMDNlOS00ZDhkLTgzYzQtNjM4ZjRjNmExNmZhIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MjE5MTIzNjMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9yYTNuUFkzSlMiLCJjb2duaXRvOnVzZXJuYW1lIjoiMDE3NzA2MTg1NjciLCJleHAiOjE3MjE5MTU5NjMsImlhdCI6MTcyMTkxMjM2M30.UJycIzXTygq0HXrE8RCW0qoh5PRRNOFR4oJIB-T0XPnOnMACvOykyvR33eeIYGpBMALZKQSIgHx7Wljn2_T6ZiZqBYeNxeH80RbXTs1YYhbaPkiQCuUZKuxqivrsDtZUWgRatV4Z93_AEkXyuGBkah-QbK3v35dHVx0RzJlufMt2IRmREmWk3fL4obQ4FkhkfkUMWCJCwxNagWwbVyK4ZbRc1r6-Mz9sibncIApfu8IuzN9Ym5UGfjO9rtgAvMyicHtboSbnh0SbJMHmJ_ZBniPMBgFgPwPrNfUc6bRLVvQ5FxUaKMHGe-YkNR8AQQ6pPCesJGjoeuFTXidHJ3UQXA',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.bPangHVcB0rm2PrHAZsSFsxRCxh7Hpjzb1-YliKdr-OPXQUZf7TFiTLkVHVbaxtjX8zK90aS1LKj222GV1xB-RT_NAvwsSOBWaf9D08FJM7Wqvc5PYwitAAXkUEWikNUo_TdxG86GuBc4eVpvHcSovJT9Yq-ZxbeA187U6ZREi57u7tf6HgnpDdX1Gd-dYSoFQ-XgdZpJdtMdZvawUZhbVwvw6YYkF7In-aGjlfpaE3y0yGUIFoKBJZY-hCTUuJFuXzkF9g-1NSZLAd_Wx6acA3HxWz0psrDRrs0TiNTV7EK91o_vKfCIHKLYZCUpvLyz42D03_Q3smMlQNdViFOAQ.EDvYdQNqWRNMyBiw.zAXf2fPNIhRxLTAJISag6fP3OesiaHD_iqw1_5DkwZUeYV13a6KOdvYpyZnVTWRLMKSXz-y2_oVlIqIt5Os8vX8YtLWPIzswIJArL3T2SCkz7Zxr-tcXi6a-DqwF3Q2eWKyoB1sdZHEczbhO2Y3XNet1vqWvkhqUS7vUhbV72KjIcIU2PoFyznfZsmGdjBa54yVdOxAHceaKHa1eWAfhoDo6iH0mUZ8QeNcnF0csfZ3JPMTWm8isIjyvxQ88YT0U_9HhczyhP1ffDj7QiCl73W0NPbdiVo3ihG691_fCxYAtQYm8UR8Hr-bYlNyAlYf_jj4aVDrscX2IskomideIbvyLw-FRgqcx4CbbeKGmg9bziQO_9MyogkT3GNHxoKh1GenOky8LAx3XbOXKFNZa7AkNeWRdwxcyg5h0UUM6MESfh6iwYydXMDoXV6LFVJ9cd0k31BRFAKxEfUp4J6-JOQoYDcyn0VB7TGWyEpNXXHao3ziBA4_gHVLfW0PyE9u2dCSl72oz0JqzmT955Oic-qods3XtYWWHaupwS8B8D7YVSHnexFdl6vyqIpry3jgw2Wf54_NuMUo7MsjVKyV1JhXUc1sCgtHhGrw93BjBv_GXmEwY_-kz0eUFBJzGzOdBrLxs6CNT9BaDLGf7RrTSyvabLuPVgKK0Owt_v7EfaBFaj5zPEv7RXYLZ9Awsp0AuYr_HgiZWuEUrMdIXfQmAbAt4AQI6uLj0dXsrc2Kdw2skuoY1JNkVHOy_i_RFmA00VSshIZGPF5NBSC9FgHQL-dIKyyKr7v2_NELQxOIafRKiSA_C2K3wNdd9orUrIrMTsTpBpX-T0DbiWmKFIQxxqiHa7CvitpSNF3ffNWD5OsyX2Ee6Tn-CMK3aA-_HilV58YOtvbR8nDGGnWgmGxY3dKpDVJi-gq5HAksItKemI7lljyEGSbHiUXbi_0plGJwKAwX9_B4Rfs9PonS5p0kZurhZtNDDOzAjiCdT9KKoMYvexqFry_sQS7V9Rbilfzx_KBvkuS1zFlaa_YIRcS9tgDtAJC-_OMGRo48E-9KXMA9yhqhGSKwQxBZ92veidYswsNlKiHTZ5rQ7PYwm4BzV5NHJFJnHjttNHSYa_ASwC9GN-CtX1Nv3ZTFGU3sm6A-lasLhjxzS9Ean1Y6JC2O0fbzZJmgxJeSlAvH7YFz0WortPU8cadWoRGLFN-7sjuk__GUmVFcOGKzj5DNXtmmJBKYdJsCZIHW_laG50WiJ5KEQ4kNA_RxCnK3ni1DtX0jdmdWhz2ieCBn5tmxmCcFm2BJcAo-MkT0.lawP2bMPkvhIUet_5kchlg'
  }

  executePayment data: {
    paymentID: 'TR0011Qm8ygki1721929303220',
    trxID: 'BGP60JZRYQ',
    transactionStatus: 'Completed',
    amount: '500',
    currency: 'BDT',
    intent: 'sale',
    paymentExecuteTime: '2024-07-25T23:43:29:746 GMT+0600',
    merchantInvoiceNumber: 'ewlkfedwenmrlewknfcewf',
    payerReference: 'ekjfdednrekjfvbrwkjf',
    customerMsisdn: '01770618575',
    statusCode: '0000',
    statusMessage: 'Successful'
  }
*/