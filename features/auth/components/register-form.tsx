"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import placeHolder from "@/assets/svgs/placeholder.svg";
import { AsyncButton } from "@/components/common/async-button";
import { GoogleIcon } from "@/components/common/icons";
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
import { APP_INFO } from "@/lib/configs/app-info";
import { cn } from "@/lib/utils/tailwind";
import { useAuthContext } from "../contexts/auth-context";

const formSchema = z
	.object({
		userName: z
			.string()
			.min(3, { message: "Username must be at least 3 characters" }),
		email: z.string().email({ message: "Please enter a valid email address" }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type FormValues = z.infer<typeof formSchema>;

export const RegisterForm = () => {
	const router = useRouter();
	const {
		register,
		isRegistering,
		registerError,
		resetRegister,
		isAuthenticated,
	} = useAuthContext();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	// Redirect if already authenticated
	useEffect(() => {
		if (isAuthenticated) {
			router.push("/dashboard");
		}
	}, [isAuthenticated, router]);

	// Reset register error when form values change
	useEffect(() => {
		if (registerError) {
			resetRegister();
		}
	}, [registerError, resetRegister]);

	async function onSubmit(values: FormValues) {
		await register({
			userName: values.userName,
			email: values.email,
			password: values.password,
		});
	}

	return (
		<div className={cn("flex flex-col gap-6")}>
			<Card className="p-0 overflow-hidden">
				<CardContent className="grid md:grid-cols-2 p-0">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center text-center">
									<p className="font-bold text-2xl">Create an account</p>
									<p className="text-muted-foreground text-balance">
										Register for your {APP_INFO.name} account
									</p>
								</div>

								<FormField
									control={form.control}
									name="userName"
									render={({ field }) => (
										<FormItem className="gap-4 grid">
											<FormLabel htmlFor="userName">Username</FormLabel>
											<FormControl>
												<Input
													id="userName"
													placeholder="johndoe"
													disabled={isRegistering}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="gap-4 grid">
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<Input
													id="email"
													type="email"
													placeholder="email@example.com"
													disabled={isRegistering}
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
										<FormItem className="gap-4 grid">
											<FormLabel htmlFor="password">Password</FormLabel>
											<FormControl>
												<Input
													id="password"
													type="password"
													disabled={isRegistering}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="gap-4 grid">
											<FormLabel htmlFor="confirmPassword">
												Confirm Password
											</FormLabel>
											<FormControl>
												<Input
													id="confirmPassword"
													type="password"
													disabled={isRegistering}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<AsyncButton
									type="submit"
									className="w-full"
									isLoading={isRegistering}
									loadingText="Registering..."
								>
									Register
								</AsyncButton>

								<div className="after:top-1/2 after:z-0 after:absolute relative after:inset-0 after:flex after:items-center after:border-t after:border-border text-sm text-center">
									<span className="z-10 relative bg-card px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>

								<div className="gap-4 grid grid-cols-1">
									<Button
										variant="outline"
										type="button"
										className="w-full"
										disabled={isRegistering}
									>
										<GoogleIcon className="size-4" />
										<span>Register with Google</span>
									</Button>
								</div>

								<div className="text-sm text-center">
									Already have an account?{" "}
									<Link
										href="/auth/login"
										className="underline underline-offset-3"
									>
										Login
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

			<div className="text-muted-foreground *:[a]:hover:text-primary text-xs text-center *:[a]:underline *:[a]:underline-offset-3 text-balance">
				By register an account, you agree to our{" "}
				<Link href="/terms-of-service">Terms of Service</Link> and{" "}
				<Link href="/privacy-policy">Privacy Policy</Link>.
			</div>
		</div>
	);
};
