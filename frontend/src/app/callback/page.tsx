"use client"

// possible statuses: success, failure, cancel

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { executePayment } from "../actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMutation } from "@tanstack/react-query";
import * as Sentry from "@sentry/nextjs";
import { toast } from "@/components/ui/use-toast";
import { recordFailedPayment } from "../actions/payments";

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const paymentId = searchParams.get("paymentID");

  const mutation = useMutation({
    mutationFn: executePayment,
    onSuccess: ({ statusCode, statusMessage, trxID }) => {
      if (statusCode === "0000") {
        router.push(`/payment/success?status=${statusCode}&statusMessage=${statusMessage}&trxID=${trxID}`);
        return;
      }

      // Insufficient Balance
      if (statusCode === "2023") {
        router.push(`/payment/failure?status=${statusCode}&statusMessage=${statusMessage}`);
        return;
      }

      // Payment failed due to other reasons
      router.push(`/payment/failure?status=${statusCode}&statusMessage=${statusMessage}`);
    },
    onError: (error) => {
      console.log("Execute Payment onError:", error);
      Sentry.captureException(error);
    }
  });

  const failureMutation = useMutation({
    mutationFn: recordFailedPayment,
    onSettled: (data, error) => {
      console.log(46, data, error);
      router.push(`/payment/failure?status=${status}`);
    }
  });

  useEffect(() => {
    if (status === "success" && paymentId) {
      mutation.mutate(paymentId);
    } else {
      if (paymentId) {
        failureMutation.mutate(paymentId);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {mutation.isPending && 
        <div className="flex flex-col items-center gap-y-4">
          <h1>Your Payment is Processing</h1>
          <LoadingSpinner />
        </div>
      }      
    </div>
  )
};

