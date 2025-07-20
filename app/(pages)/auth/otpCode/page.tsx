"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpVerificationSchema } from "../../../schemas/otpVerificationSchema";
import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/Button";
import { Label } from "@/app/ui/Label";
import { axiosInstance } from "../../../lib/axiosInstance";
import { useRouter } from "next/navigation";

type OTPFormData = {
  otp: number;
};

export default function OTPVerification() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OTPFormData>({
    resolver: yupResolver(otpVerificationSchema),
  });

  const [isResending, setIsResending] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);

  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";

  const onSubmit = async (data: OTPFormData) => {
    if (!email) {
      setErrorMsg("Email not found. Please sign up again.");
      return;
    }
    setIsVerifying(true);
    setErrorMsg("");
    try {
      const response = await axiosInstance.post("/auth/verify-email", {
        email,
        otpCode: data.otp,
      });

      localStorage.removeItem("email");
      router.push("/auth/signIn");
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setErrorMsg("Email not found. Please sign up again.");
      return;
    }
    setIsResending(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await axiosInstance.post("/auth/resend-verification-code", { email });
      setSuccessMsg("Verification code resent! Check your email.");
    } catch (error) {
      setErrorMsg("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    setSuccessMsg("");
    const formatted = e.target.value.replace(/\D/g, "").slice(0, 6);
    setValue("otp", Number(formatted));
  };

  return (
    <div className="bg-[#e5e7eb] min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md h-auto min-h-[450px] rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          We've sent a verification code to your email. Enter it below.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit code"
              className="text-center text-lg tracking-widest"
              onChange={handleOtpChange}
              disabled={isVerifying}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          {successMsg && (
            <p className="text-green-600 text-sm text-center">{successMsg}</p>
          )}

          <Button type="submit" className="w-full" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Code"}
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResending}
            className="text-blue-600 hover:text-blue-800 underline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? "Sending..." : "Resend verification code"}
          </button>
        </div>
      </form>
    </div>
  );
}
