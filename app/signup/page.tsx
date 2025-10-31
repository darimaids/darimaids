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

// store
import { useCustomerStore } from "@/store/useCustomerStore";

// api
import { createCustomer } from "@/services/auth/authentication";

const Signup = () => {
  const router = useRouter();
  const { setCustomerData } = useCustomerStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
    province: "",
    zipCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createCustomer,
    onSuccess: (res: any) => {
      if (res?.success && res?.data?.token) {
        const { token, user } = res.data;
        sessionStorage.setItem("accessToken", token);
        setCustomerData(token, user);
        toast.success("Account created successfully!");
        router.push("/");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    },
    onError: (error: any) => {
      console.error("Signup Error:", error);
      toast.error(error || "Something went wrong. Try again later.");
    },
  });

  const handleSignup = () => {
    const {
      fullName,
      email,
      phoneNumber,
      password,
      address,
      province,
      zipCode,
    } = formData;

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !password ||
      !address ||
      !province ||
      !zipCode
    ) {
      toast.info("Please fill in all fields.", {
        position: "top-center",
        style: { backgroundColor: "#3b82f6", color: "#fff" },
      });
      return;
    }

    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-[#6A4AAD] flex justify-center items-center px-4 py-20">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl py-10 sm:py-16 px-6 sm:px-12 w-full sm:w-[584px] shadow-lg">
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
          Create your account
        </h1>

        {/* Form */}
        <div className="space-y-4">
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          <InputField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
          <InputField
            label="Province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            placeholder="Enter your province"
          />
          <InputField
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter your ZIP code"
          />

          <Button
            className="w-full py-6 mt-4 text-white font-semibold"
            disabled={isPending}
            onClick={handleSignup}
          >
            {isPending ? (
              <span className="flex items-center gap-2 justify-center">
                <Spinner />
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            className="text-[#6A4AAD] font-semibold cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

// Small helper component for inputs
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: any) => (
  <div>
    <label className="block text-sm text-[#666] dark:text-gray-300 mb-1">
      {label}
    </label>
    <Input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full"
    />
  </div>
);

export default Signup;
