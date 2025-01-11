import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email cannot be empty",
    })
    .email(),
  password: z
    .string({
      required_error: "Password cannot be empty",
    })
    .min(1),
});

const userRegisterationSchema = z
  .object({
    email: z.string({ required_error: "Email cannot be empty" }).email(),
    username: z
      .string({
        required_error: "Username cannot be empty",
      })
      .min(2, "Username must be > 2 character(s)"),
    password: z
      .string({
        required_error: "Password cannot be empty",
      })
      .min(2, "Password must be > 2 characters long"),
    passwordConfirm: z.string({
      required_error: "Password confirmation cannot be empty",
    }),
    phoneNumber: z
      .string()
      .regex(/^\+20[0-9]{10}$/, "Invalid phone number format"),
    firstName: z
      .string({
        required_error: "First name cannot be empty",
      })
      .min(1, "First name must be > 1 character long"),
    lastName: z
      .string({
        required_error: "Last name cannot be empty",
      })
      .min(1, "Last name must be > 1 character long"),
    carmake: z
      .number({
        required_error: "Carmake is required",
      })
      .gt(0, {
        message: "No car make selected",
      }),
  })
  .refine((data) => data.password == data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords must match",
  });

export { loginSchema, userRegisterationSchema };
