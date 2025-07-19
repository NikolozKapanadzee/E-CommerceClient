"use client";
import React, { useState } from "react";
import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/Button";
import { Label } from "@/app/ui/Label";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleResendCode = async () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
    }, 3000);
  };
  const otpNumberField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="bg-[#e5e7eb] min-h-screen flex items-center justify-center p-4">
      <form className="bg-white w-full max-w-md h-auto min-h-[450px] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          We've sent a verification code to your email address. Please enter the
          code below.
        </p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit code"
              maxLength={6}
              value={otp}
              onChange={otpNumberField}
              className="text-center text-lg tracking-widest"
            />
          </div>
          <Button type="submit" className="w-full">
            Verify Code
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
