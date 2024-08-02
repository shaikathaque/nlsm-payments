"use server";

import { createClient } from "@/utils/supabase/server";
import * as Sentry from "@sentry/nextjs";

const supabase = createClient();

interface RecordPendingPaymentPayload {
  email: string;
  amount: number;
  athleteName: string;
  branch?: "UTTARA_IHSB" | "BASHUNDHARA_SG" ;
  paymentID: string;
}

export const recordPendingPayment = async (paymentData: RecordPendingPaymentPayload) => {
  return await Sentry.withServerActionInstrumentation(
    "recordPendingPayment",
    async () => {
      const { email, amount, athleteName, branch = "BASHUNDHARA_SG", paymentID } = paymentData;
      try {
        const { data, error } = await supabase.from("payments").insert(
          {
            method: "BKASH",
            payment_status: "IN_PROGRESS",
            branch: branch,
            athlete_name: athleteName,
            amount: String(amount),
            email,
            bkash_payment_id: paymentID
          }
        );

        if (error) {
          console.log(error);
          throw new Error("Failed to record new payment to DB", error);
        }
        return data;
      } catch(err) {
        console.log(err);
        Sentry.captureException(err);
        throw new Error("Failed to add payment to DB", err as Error);
      }
    }
  )
};

export const recordCompletePayment = async (paymentId: string) => {
  return await Sentry.withServerActionInstrumentation(
    "recordCompletePayment",
    async () => {
      try {
        const { data, error } = await supabase.from("payments").update(
          {
            payment_status: "COMPLETE"
          }
        ).eq('bkash_payment_id', paymentId );

        if (error) {
          throw new Error("Failed to update payment status to complete", error);
        }
        return data;
      } catch(err) {
        Sentry.captureException(err);
        throw new Error("Failed to update payment status to complete", err as Error);
      }
    }
  )
};

export const recordFailedPayment = async (paymentId: string) => {
  return await Sentry.withServerActionInstrumentation(
    "recordFailedPayment",
    async () => {
      try {
        console.log(76, paymentId);
        const { data, error } = await supabase.from("payments").update(
          {
            payment_status: "FAILED"
          }
        ).eq('bkash_payment_id', paymentId );
        console.log(81, paymentId, data, error);
        if (error) {
          throw new Error("Failed to update payment status to failed", error);
        }
        return data;
      } catch(err) {
        Sentry.captureException(err);
        throw new Error("Failed to update payment status to failed", err as Error);
      }
    }
  )
};
