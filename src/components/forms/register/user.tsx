import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { userRegisterationSchema } from "@/api/schemas";
import { useRef, useState } from "react";
import { CarMakeFormField } from "@/components/custom/carmake-formfield";
import ErrorAlert from "@/components/custom/erroralert";
import client from "@/api/client";
import { AxiosResponse } from "axios";
import { extractNestedErrorMessages } from "@/api/utils";
import { NavigateFunction, useNavigate } from "react-router";

type UserRegistrationFormValues = z.infer<typeof userRegisterationSchema>;

function UserRegistrationForm() {
  const navigate: NavigateFunction = useNavigate();
  const [registerErrorMsg, setRegisterErrorMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<UserRegistrationFormValues>({
    resolver: zodResolver(userRegisterationSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      carmake: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof userRegisterationSchema>) {
    try {
      const requestBody: object = {
        account: {
          email: values.email,
          username: values.username,
          password: values.passwordConfirm,
          phone_number: values.phoneNumber,
        },
        carmake: values.carmake,
        first_name:
          values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1),
        last_name:
          values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1),
      };

      const response: AxiosResponse = await client.post(
        "/users/register/",
        requestBody,
      );
      if (response.status == 201) {
        console.log("registered successfully: ", response.data);
      }

      setRegisterErrorMsg(null);
      navigate("/");
    } catch (err: unknown) {
      if (err?.response?.data) {
        const errorData = err.response.data;
        const extractedErrors = extractNestedErrorMessages(errorData);
        console.log("Extracted Errors:", extractedErrors);

        const firstError = Object.values(extractedErrors)[0];
        setRegisterErrorMsg(
          firstError.charAt(0).toUpperCase() + firstError.slice(1) ||
            "An unexpected error occurred",
        );
      } else {
        console.log(err);
        setRegisterErrorMsg("An unexpected error occurred");
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Account</CardTitle>
        <CardDescription>
          Find workshops and schedule repairs in minutes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <ErrorAlert error={registerErrorMsg} />
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {/* First Name Field */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last Name Field */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-end justify-between gap-1">
              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="+201234567890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CarMakeFormField form={form} name="carmake" label="Car Make" />
            </div>
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password Confirm Field */}
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            if (formRef.current) {
              formRef.current.requestSubmit();
            }
          }}
          className="w-full h-8"
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UserRegistrationForm;
