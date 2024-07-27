"use client"

// possible statuses: success, failure, cancel

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { executePayment } from "../actions";

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const paymentId = searchParams.get("paymentID");



  useEffect(() => {
    const completePayment = async (paymentId: string) => {
      await executePayment(paymentId);
    };

    if (status === "success" && paymentId) {
      completePayment(paymentId);
    } else {
      console.log("Payment not successfull with status", status);
    }
  }, []);

  console.log("Callback status:", status);
  console.log("Callback paymentId:", paymentId);

  return (
    <div>
      <h1>Callback Page</h1>
      {status === "success" && <p>Executing Payment</p>}
      {status === "failure" && <p>Bkash Payment Failed</p>}
      {status === "cancel" && <p>Bkash Payment was cancelled</p>}
    </div>
  )
};