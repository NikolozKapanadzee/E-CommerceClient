import React from "react";
import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/Button";
import { Label } from "@/app/ui/Label";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="bg-[#e5e7eb] min-h-screen flex items-center justify-center p-4">
      <form className="bg-white w-full max-w-md h-auto min-h-[450px] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Sign Up
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" />
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
