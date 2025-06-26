"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { getCurrentUser, signIn } from "aws-amplify/auth";
import outputs from "../../amplify_outputs.json";
import { SigninFormData, signinSchema } from "@/schema/signinSchema";

Amplify.configure(outputs);


const Signin = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninFormData>({
    mode: "onChange",
    resolver: zodResolver(signinSchema),
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        router.replace("/");
      } catch {
        // User not signed in
      }
    };
    checkUser();
  }, [router]);

  const onSubmit = async (data: SigninFormData) => {
    try {
      setIsSubmitting(true);
      await signIn({ username: data.email, password: data.password });

      const user = await getCurrentUser();

      document.cookie = `userId=${user.userId}; path=/; max-age=86400`;

      setTimeout(() => {
        localStorage.setItem("loginTime", Date.now().toString());
        router.push("/");
      }, 1000);
    } catch (error: unknown) {
      console.error("Login failed:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] mx-auto mt-20 p-6 rounded-xl border border-gray-300 shadow-md bg-white"
    >
      <div className="flex border-b mb-4">
        <button
          type="button"
          className="w-1/2 py-2 text-black font-medium border-b-2 border-black"
        >
          SignIn
        </button>
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="w-1/2 py-2 border-l border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          SignUp
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`px-6 py-2 text-sm rounded-md text-white flex items-center justify-center ${
              !isValid || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signin;
