const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const handler = async (request: Request): Promise<Response> => {
  
  const payload = await request.json();
  console.log("payload", payload);
  const { record } = payload;
  const  { email, amount, branch, method, athlete_name, bkash_transaction_id, payment_status } = record;

  // Check if payment state is COMPLETE
  if (payment_status !== "COMPLETE") {
    return new Response(JSON.stringify({ message: "Payment not in complete state" }), {
      status: 418,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const body = {
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'NLSM Payment Confirmation',
    html: `
      <div>
        <h1>We have received your payment<h1>
        <p>Branch: ${branch}</p>
        <p>Athlete name: ${athlete_name}</p>
        <p>Payment method: ${method}</p>
        <p>Amount: ${amount}</p>
      </div>
    `,
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
