"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const statusMessage = searchParams.get("statusMessage") || "Unknown Failure Reason"
  return (
    <div className="flex min-h-screen flex-col items-center gap-y-4 p-24">
      <h1 className="text-center">Your Bkash payment was unsuccessfull for the following reason:</h1>
      <p className="text-center">{statusMessage || "Unkonwn reason"}</p>
      <Link href="/">
        <Button>Try Again</Button>
      </Link>
    </div>
  )
};