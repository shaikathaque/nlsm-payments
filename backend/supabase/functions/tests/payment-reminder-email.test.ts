import {
  assert,
} from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js@2";

// Will load the .env file to Deno.env
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

// Set up the configuration for the Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
};

const testBasicReminderEmail = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const { data: func_data, error: func_error } = await client.functions.invoke("payment-reminder-email", {});

  // Check for errors from the function invocation
  if (func_error) {
    throw new Error("Invalid response: " + func_error.message);
  }

  // Log the response from the function
  console.log(JSON.stringify(func_data, null, 2));

  // Assert that the function returned the expected result
  assert(func_data, "Function should return a response object.");
};

// Register and run the tests
Deno.test("Basic Report Generation Test", testBasicReminderEmail);

