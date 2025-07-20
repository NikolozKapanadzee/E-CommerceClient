import * as yup from "yup";

export const otpVerificationSchema = yup.object({
  otp: yup
    .number()
    .typeError("OTP must be a number")
    .required("OTP is required")
    .min(100000, "OTP must be a 6-digit code")
    .max(999999, "OTP must be a 6-digit code"),
});
