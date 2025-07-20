"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../schemas/signInSchema";
import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/Button";
import { Label } from "@/app/ui/Label";
import Link from "next/link";
import { axiosInstance } from "../../../lib/axiosInstance";
import { useRouter } from "next/navigation";

type SignInFormData = {
  email: string;
  password: string;
};

export default function Signin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await axiosInstance.post("/auth/sign-in", data);
      console.log("Signin successful:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      router.push("/");
    } catch (error: any) {
      console.error("Signin failed:", error);
      let errorMessage = "Signin failed. Please try again.";

      if (error.response?.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      console.error("Error message:", errorMessage);
    }
  };
  return (
    <div className="bg-[#e5e7eb] min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md h-auto min-h-[450px] rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Sign In
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            href="/auth/signUp"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
