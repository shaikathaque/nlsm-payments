import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

import { render } from 'npm:@react-email/components';
import { NLSMReportEmail } from './report.tsx';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

export const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

const handler = async (request: Request): Promise<Response> => {

  if (!RESEND_API_KEY) {
    console.log("Missing RESEND_API_KEY");
    return new Response(JSON.stringify({ message: "RESEND_API_KEY not found in environment variables." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const payload = await request.json();

  if (payload && payload?.type !== "INSERT") {
    return new Response(JSON.stringify({ message: "Emails are only sent on record insert." }), {
      status: 418,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { record } = payload;
  const  { 
    athlete_id,
    date,
    scores,
    comments,
  } = record;

  // get athlete details based on id
  const { data: athlete, error: athleteError } = await supabaseClient
    .from("athletes")
    .select("*")
    .eq("id", athlete_id)
    .single();

  console.log("athlete", athlete);
  console.log("athlete_progress record:", record);

  const emailHtml = await render(NLSMReportEmail({
    date,
    first_name: athlete?.first_name,
    last_name: athlete?.last_name,
    scores,
    comments
  }))

  const body = {
    from: 'NLSM Team <team@pay.nlsmbd.com>',
    to: athlete.email,
    subject: 'NLSM Athelete Progress Report',
    reply_to: "team@nlsmbd.com",
    html: emailHtml,
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

Deno.serve(handler)
