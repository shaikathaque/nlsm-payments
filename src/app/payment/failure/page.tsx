"use client"

import { redirect, useSearchParams } from "next/navigation";

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  return (
    <div>
      <div className="flex flex-col justify-center">
        <h1 className="text-center">Your Bkash payment was unsuccessfull for the following reason</h1>
        <p className="text-center">{status || "Unkonwn reason"}</p>
      </div>
    </div>
  )
};