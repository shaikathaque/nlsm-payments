import { render } from 'npm:@react-email/components';
import { NLSMReceiptEmail } from './email.tsx';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const handler = async (request: Request): Promise<Response> => {
  
  const payload = await request.json();
  console.log("payload", payload);
  const { record } = payload;
  const  { email, amount, branch, method, athlete_name, bkash_transaction_id, payment_status, id, created_at } = record;

  // Check if payment state is COMPLETE
  if (payment_status !== "COMPLETE") {
    return new Response(JSON.stringify({ message: "Payment not in complete state" }), {
      status: 418,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const emailHtml = await render(NLSMReceiptEmail({
      email,
      amount,
      branch,
      athlete_name,
      method,
      bkash_transaction_id,
      orderId: id,
      date: new Date(created_at).toLocaleDateString("en-GB", { timeZone: "Asia/Dhaka" })
  }))

  const body = {
    from: 'team@pay.nlsmbd.com',
    to: email,
    subject: 'NLSM Payment Confirmation',
    reply_to: "team@nlsmbd.com",
    html: emailHtml,
  }
  console.log("body:", body)

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
