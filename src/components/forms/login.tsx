import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorAlert from "@/components/custom/erroralert";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import client from "@/api/client";
import { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router";
import { loginSchema } from "@/api/schemas";

function LoginForm() {
  const navigate: NavigateFunction = useNavigate();

  // NOTE: states
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState(null);

  // INFO: form submit handler
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const response: AxiosResponse = await client.post(
        "/accounts/login/",
        values,
      );
      const json: { access: string; refresh: string } = response.data;

      // NOTE: store access and refresh tokens in local storage
      localStorage.setItem("accessToken", json.access);
      localStorage.setItem("refreshToken", json.refresh);

      setError(null);
      navigate("/profile");
    } catch (err: unknown) {
      setError(err?.response?.data?.detail || "An unexpected error occurred");
    }
  }

  // NOTE: component
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <ErrorAlert error={error} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="me@example.com" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex flex-col gap-5 items-center p-0">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div>
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;