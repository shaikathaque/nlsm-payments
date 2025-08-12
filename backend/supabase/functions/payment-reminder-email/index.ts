// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { createClient } from "jsr:@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import type { Database } from '../../../../database.types.ts'
import { Resend } from "npm:resend";

console.log("Hello from payment-reminder-email edge function!")

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

export const supabaseClient = createClient<Database>(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

const handler = async (request: Request): Promise<Response> => {
  // const payload = await request.json()
  // console.log("Payload: ", payload);

  const { data: userAthletes, error: userAthletesError } = await supabaseClient
    .from('user_athletes')
    .select('user_id')

  if (userAthletesError) {
    throw userAthletesError
  }

  if (!userAthletes || userAthletes.length === 0) {
    return new Response(JSON.stringify({ message: 'No users to email.' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  }

  const userIds = userAthletes.map((ua) => ua.user_id);

  const { data: profiles, error: profilesError } = await supabaseClient
    .from('profiles')
    .select('email')
    .in('id', userIds)

  if (profilesError) {
    throw profilesError
  }

  const emails = profiles.map((p) => p.email).filter(Boolean) as string[]

  console.log('Found emails:', emails);

  const batchEmailPayload = emails.map((email) => ({
    from: 'NLSM Team <team@pay.nlsmbd.com>',
    to: email,
    subject: 'Test NLSM Payment Reminder',
    reply_to: "team@nlsmbd.com",
    html: '<p>Dear NLSM athlete/parent, your are kindly requested to pay your dues to NLSM.</p>',
  }));

  console.log('Batch email payload:', batchEmailPayload);

  const resend = new Resend(RESEND_API_KEY);

  const batchEmailResponse = await resend.batch.send(batchEmailPayload);

  console.log('Batch email response:', batchEmailResponse);

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

Deno.serve(handler)
