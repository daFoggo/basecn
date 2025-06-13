"use client";

import type React from "react";

import placeHolder from "@/assets/svgs/placeholder.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MessageSquareReply } from "lucide-react";

// Step 1: Email schema
const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Step 2: OTP schema
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

// Step 3: New password schema
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

type Step = "email" | "otp" | "password";

export const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  // Email form
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // OTP form
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Handle email submission
  function onEmailSubmit(values: EmailFormValues) {
    console.log("Email submitted:", values);
    setEmail(values.email);
    // Here you would typically send a request to your backend to send an OTP
    // For now, we'll just move to the next step
    setStep("otp");
  }

  // Handle OTP submission
  function onOtpSubmit(values: OtpFormValues) {
    console.log("OTP submitted:", values);
    // Here you would typically verify the OTP with your backend
    // For now, we'll just move to the next step
    setStep("password");
  }

  // Handle password submission
  function onPasswordSubmit(values: PasswordFormValues) {
    console.log("New password submitted:", values);
    // Here you would typically send a request to update the password
    // After successful update, redirect to login page
    router.push("/auth/login");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="p-0 overflow-hidden">
        <CardContent className="grid md:grid-cols-2 p-0">
          <div className="p-6 md:p-8">
            {step === "email" && (
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col items-center text-center">
                    <p className="font-bold text-2xl">Forgot Password</p>
                    <p className="text-muted-foreground text-balance">
                      Enter your email to receive a verification code
                    </p>
                  </div>

                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="gap-3 grid">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Send Verification Code
                  </Button>

                  <div className="text-sm text-center">
                    Remember your password?{" "}
                    <Link
                      href="/auth/login"
                      className="underline underline-offset-4"
                    >
                      Back to login
                    </Link>
                  </div>
                </form>
              </Form>
            )}

            {step === "otp" && (
              <Form {...otpForm}>
                <form
                  onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col items-center text-center">
                    <p className="font-bold text-2xl">Verify OTP</p>
                    <p className="text-muted-foreground text-balance">
                      Enter the 6-digit code sent to {email}
                    </p>
                  </div>

                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="gap-3 grid">
                        <FormLabel htmlFor="otp">Verification Code</FormLabel>
                        <FormControl>
                          <div className="flex justify-center">
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Verify Code
                  </Button>

                  <div className="text-sm text-center">
                    Didn&apos;t receive a code?{" "}
                    <Button
                      type="button"
                      variant="secondary"
                    >
                      Resend code
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {step === "password" && (
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col items-center text-center">
                    <p className="font-bold text-2xl">Reset Password</p>
                    <p className="text-muted-foreground text-balance">
                      Create a new password for your account
                    </p>
                  </div>

                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="gap-3 grid">
                        <FormLabel htmlFor="password">New Password</FormLabel>
                        <FormControl>
                          <Input id="password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="gap-3 grid">
                        <FormLabel htmlFor="confirmPassword">
                          Confirm New Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>
                </form>
              </Form>
            )}
          </div>

          <div className="hidden md:block relative bg-muted">
            <Image
              src={placeHolder || "/placeholder.svg"}
              alt="Image"
              className="absolute inset-0 dark:brightness-[0.2] dark:grayscale w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
