'use client'

import { startPayment } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import ButtonLoading from "./ui/button-loading";


const MIN_AMOUNT_BDT = 1;
const MAX_AMOUNT_BDT = 20000;

const formSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
  amount: z.coerce.number({ required_error: "Amount is required", invalid_type_error: "Please enter a valid number" }).gte(MIN_AMOUNT_BDT).lt(MAX_AMOUNT_BDT),
  athleteName: z.string({ required_error: "Athlete name is required" }),
});

export default function PaymentForm() {
  const router = useRouter()
  
  const mutation = useMutation({
    mutationFn: startPayment,
    onSuccess: ({ bkashURL }) => {
      if (bkashURL) {
        router.push(bkashURL);
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error starting payment",
        description: JSON.stringify(error),
      })
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      athleteName: "",
      email: "",
      amount: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="text-lg">NLSM Payments Form</h1>
        <FormField
          control={form.control}
          name="athleteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Athlete Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment amount</FormLabel>
              <FormControl>
                <Input inputMode="numeric" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email for payment confirmation</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {
          mutation.isPending ? (
            <ButtonLoading text="Proceed to Bkash Payment" />
          ) : (
            <Button type="submit">Proceed to Bkash Payment</Button>
          )
        }
        
      </form>
    </Form>
  )
};