"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../../schemas/signUpSchema";
import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/Button";
import { Label } from "@/app/ui/Label";
import Link from "next/link";
import { axiosInstance } from "../../../lib/axiosInstance";
import { useRouter } from "next/navigation";

type SignUpFormData = {
  email: string;
  password: string;
};

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await axiosInstance.post("/auth/sign-up", data);
      console.log("Signup successful:", response.data);
      localStorage.setItem("email", data.email);
      router.push("/auth/otpCode");
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response.data : "") ||
        error.message ||
        "Signup failed. Please try again.";
      console.error("Signup failed:", errorMessage);
    }
  };

  return (
    <div className="bg-[#e5e7eb] min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md h-auto min-h-[450px] rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Sign Up
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
            Sign Up
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/signIn"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
