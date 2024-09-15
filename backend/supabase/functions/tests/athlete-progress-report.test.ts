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

// Test the creation and functionality of the Supabase client
const testClientCreation = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  // Verify if the Supabase URL and key are provided
  if (!supabaseUrl) throw new Error("supabaseUrl is required.");
  if (!supabaseKey) throw new Error("supabaseKey is required.");

  // Test a simple query to the database
  const { data: table_data, error: table_error } = await client
    .from("athletes")
    .select("*")
    .limit(1);
  if (table_error) {
    throw new Error("Invalid Supabase client: " + table_error.message);
  }
  assert(table_data, "Data should be returned from the query.");
};

const testBasicReportGeneration = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const { data: func_data, error: func_error } = await client.functions.invoke("athlete-progress-report", {
    body: {
      record: {
        athlete_id: "999",
        year: 2024,
        quarter: 4,
        passing: 9,
        dribbling: 7,
        shooting: 6,
        discipline: 10,
        awareness: 9,
        attendance: 10,
        comments: "Rising Start!",
      }
    }
  });

  // Check for errors from the function invocation
  if (func_error) {
    throw new Error("Invalid response: " + func_error.message);
  }

  // Log the response from the function
  console.log(JSON.stringify(func_data, null, 2));

  // Assert that the function returned the expected result
  assert(func_data.length > 0, "Function should return a non-empty result.");
};

// Register and run the tests
Deno.test("Client Creation Test", testClientCreation);
Deno.test("Basic Report Generation Test", testBasicReportGeneration);
