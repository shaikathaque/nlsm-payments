"use client"

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("trxID") || "Unknown Failure Reason"
  return (
    <div className="flex min-h-screen flex-col items-center gap-y-4 p-24">
        <h1 className="text-center">Your Bkash Payment was successful!</h1>
        <p className="text-center">Your transaction ID is: {transactionId}</p>
    </div>
  )
};