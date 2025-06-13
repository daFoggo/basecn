"use client";

import placeHolder from "@/assets/svgs/placeholder.svg";
import { GoogleIcon } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { APP_CONFIG } from "@/lib/config/app";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }).min(1, { message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required and must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="p-0 overflow-hidden">
        <CardContent className="grid md:grid-cols-2 p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <p className="font-bold text-2xl">Welcome back</p>
                  <p className="text-muted-foreground text-balance">
                    Login to your {APP_CONFIG.name} account
                  </p>
                </div>
                
                <FormField
                  control={form.control}
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
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="gap-3 grid">
                      <div className="flex items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href="/auth/forgot-password"
                          className="ml-auto text-sm hover:underline underline-offset-2"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Login
                </Button>
                
                <div className="after:top-1/2 after:z-0 after:absolute relative after:inset-0 after:flex after:items-center after:border-t after:border-border text-sm text-center">
                  <span className="z-10 relative bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                
                <div className="gap-4 grid grid-cols-1">
                  <Button variant="outline" type="button" className="w-full">
                    <GoogleIcon className="size-4" />
                    <span>Login with Google</span>
                  </Button>
                </div>
                
                <div className="text-sm text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="underline underline-offset-4"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          
          <div className="hidden md:block relative bg-muted">
            <Image
              src={placeHolder || "/placeholder.svg"}
              alt="Image"
              className="absolute inset-0 dark:brightness-[0.2] dark:grayscale w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="text-muted-foreground *:[a]:hover:text-primary text-xs text-center *:[a]:underline *:[a]:underline-offset-4 text-balance">
        By logging in, you agree to our{" "}
        <Link href="/terms-of-service">Terms of Service</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </div>
    </div>
  );
};
