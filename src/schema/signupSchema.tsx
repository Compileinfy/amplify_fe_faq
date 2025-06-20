import { z } from "zod";

export const signupSchema = z.object({
  firstname: z.string().min(1, "Firstname is required").regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),
  lastname: z.string().min(1, "Lastname is required").regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
    
});

export type FormData = z.infer<typeof signupSchema>;

