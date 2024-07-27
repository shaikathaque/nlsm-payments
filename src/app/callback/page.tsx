"use client"

// possible statuses: success, failure, cancel

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { executePayment } from "../actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const paymentId = searchParams.get("paymentID");

  useEffect(() => {
    console.log("Callback status:", status);
    console.log("Callback paymentId:", paymentId);

    const completePayment = async (paymentId: string) => {
      await executePayment(paymentId);
    };

    if (status === "success" && paymentId) {
      completePayment(paymentId);
    } else {
      console.log("Payment not successfull with status", status);
    }
  }, []);

  if (status !== "success") {
    router.push(`/payment/failure?status=${status}`);
  }

  return (
    <div>
      {status === "success" && 
        <div>
          Executing Payment
          <LoadingSpinner />
        </div>
      }      
    </div>
  )
};

// executePayment data: { statusCode: '2023', statusMessage: 'Insufficient Balance' }
