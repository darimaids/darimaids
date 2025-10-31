"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// api
import { otpVerification } from "@/services/auth/authentication";

const VerifyEmail = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: otpVerification,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success("Email verified successfully!");
        router.push("/login");
      } else {
        toast.error("Verification failed. Please check your OTP.");
      }
    },
    onError: (error: any) => {
      console.error("OTP Verification Error:", error);
      toast.error("Invalid or expired OTP code.");
    },
  });

  const handleVerify = () => {
    if (!otp.trim()) {
      toast.info("Please enter your OTP code.", {
        position: "top-center",
        style: { backgroundColor: "#3b82f6", color: "#fff" },
      });
      return;
    }

    mutate(otp.trim());
  };

  return (
    <div className="min-h-screen bg-[#6A4AAD] flex justify-center items-center px-4 text-[#1F2937]">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl py-10 sm:py-16 px-6 sm:px-12 w-full max-w-md shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/d_login.svg"
            alt="Darimaids Logo"
            width={80}
            height={71}
          />
        </div>

        {/* Header */}
        <h1 className="text-lg sm:text-xl font-semibold text-center dark:text-white mb-8">
          Verify Email Address
        </h1>

        {/* OTP Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#666] dark:text-gray-300 mb-1">
              OTP Code
            </label>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full text-center tracking-[6px] text-lg dark:text-white font-medium"
            />
          </div>

          <Button
            className="w-full py-6 mt-4 text-white font-semibold"
            disabled={isPending}
            onClick={handleVerify}
          >
            {isPending ? (
              <span className="flex items-center gap-2 justify-center">
                <Spinner />
              </span>
            ) : (
              "Verify Email"
            )}
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          Didn’t receive an OTP?{" "}
          <span
            className="text-[#6A4AAD] font-semibold cursor-pointer hover:underline"
            onClick={() =>
              toast.info("Please check your inbox again.", {
                position: "top-center",
                style: { backgroundColor: "#3b82f6", color: "#fff" },
              })
            }
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
