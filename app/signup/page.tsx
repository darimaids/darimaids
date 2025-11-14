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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// store
import { useCustomerStore } from "@/store/useCustomerStore";

// api
import { createCustomer, createWorker } from "@/services/auth/authentication";

// icons
import { EyeOff, Eye } from "lucide-react";

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
  const [workerData, setWorkerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
    province: "",
    zipCode: "",
    gender: "",
    dateOfBirth: "",
    workExperience: {
      yearOfExperience: "",
      preferredService: "",
      preferredWorkArea: "",
      availability: "",
      shortBio: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCustomerPassword, setShowCustomerPassword] = useState(false);
  const [showWorkerPassword, setShowWorkerPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkerChange = (e: any) => {
    const { name, value } = e.target;
    setWorkerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkExpChange = (e: any) => {
    const { name, value } = e.target;
    setWorkerData((prev) => ({
      ...prev,
      workExperience: { ...prev.workExperience, [name]: value },
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createCustomer,
    onSuccess: (res: any) => {
      if (res?.success && res?.data?.token) {
        const { token, user } = res.data;
        sessionStorage.setItem("accessToken", token);
        setCustomerData(token, user);
        toast.success("Account created successfully!");
        router.push("/emailVerification");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    },
    onError: (error: any) => {
      console.error("Signup Error:", error);
      toast.error(error || "Something went wrong. Try again later.");
    },
  });

  const workerMutation = useMutation({
    mutationFn: createWorker,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success("Worker account created successfully!");
        router.push("/emailVerification");
      } else {
        toast.error("Worker signup failed.");
      }
    },
    onError: (err: any) => {
      toast.error(err || "Something went wrong.");
    },
  });

  const handleWorkerSignup = () => {
    workerMutation.mutate({
      ...workerData,
      yearOfExperience: Number(workerData.workExperience.yearOfExperience),
    });
  };

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

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="worker">Worker</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
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
                showPassword={showCustomerPassword}
                setShowPassword={setShowCustomerPassword}
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
          </TabsContent>

          {/* WORKER SIGNUP FORM */}
          <TabsContent value="worker">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={workerData.firstName}
                  onChange={handleWorkerChange}
                  placeholder="Enter first name"
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={workerData.lastName}
                  onChange={handleWorkerChange}
                  placeholder="Enter last name"
                />
              </div>

              <InputField
                label="Email Address"
                name="email"
                value={workerData.email}
                onChange={handleWorkerChange}
                placeholder="Enter email"
              />

              <InputField
                label="Phone Number"
                name="phoneNumber"
                value={workerData.phoneNumber}
                onChange={handleWorkerChange}
                placeholder="Enter phone number"
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                value={workerData.password}
                onChange={handleWorkerChange}
                placeholder="Enter your password"
                showPassword={showWorkerPassword}
                setShowPassword={setShowWorkerPassword}
              />

              <InputField
                label="Address"
                name="address"
                value={workerData.address}
                onChange={handleWorkerChange}
                placeholder="Enter address"
              />

              <InputField
                label="Province"
                name="province"
                value={workerData.province}
                onChange={handleWorkerChange}
                placeholder="Enter province"
              />

              <InputField
                label="ZIP Code"
                name="zipCode"
                value={workerData.zipCode}
                onChange={handleWorkerChange}
                placeholder="Enter ZIP Code"
              />

              <div>
                <label className="block text-sm text-[#666] dark:text-gray-300 mb-1">
                  Gender
                </label>

                <Select
                  value={workerData.gender}
                  onValueChange={(value) =>
                    setWorkerData((prev) => ({ ...prev, gender: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* DOB */}
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={workerData.dateOfBirth}
                onChange={handleWorkerChange}
              />

              {/* Work Experience Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Years of Experience"
                  name="yearOfExperience"
                  value={workerData.workExperience.yearOfExperience}
                  onChange={handleWorkExpChange}
                  placeholder="e.g. 5"
                />
                <InputField
                  label="Preferred Service"
                  name="preferredService"
                  value={workerData.workExperience.preferredService}
                  onChange={handleWorkExpChange}
                  placeholder="Cleaning"
                />
                <InputField
                  label="Preferred Work Area"
                  name="preferredWorkArea"
                  value={workerData.workExperience.preferredWorkArea}
                  onChange={handleWorkExpChange}
                  placeholder="Lakewood"
                />
                <InputField
                  label="Availability"
                  name="availability"
                  value={workerData.workExperience.availability}
                  onChange={handleWorkExpChange}
                  placeholder="Full-time"
                />
              </div>

              <div>
                <label className="block text-sm text-[#666] dark:text-gray-300 mb-1">
                  Short Bio
                </label>
                <Textarea
                  name="shortBio"
                  value={workerData.workExperience.shortBio}
                  onChange={handleWorkExpChange}
                  placeholder="Tell us about yourself"
                  className="w-full h-28"
                />
              </div>

              <Button
                className="w-full py-6 mt-4 text-white font-semibold"
                disabled={workerMutation.isPending}
                onClick={handleWorkerSignup}
              >
                {workerMutation.isPending ? <Spinner /> : "Sign Up"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

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
  showPassword,
  setShowPassword,
}: any) => (
  <div className="relative">
    <label className="block text-sm text-[#666] dark:text-gray-300 mb-1">
      {label}
    </label>

    <Input
      name={name}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pr-10"
    />

    {type === "password" && (
      <button
        type="button"
        className="absolute right-3 top-[45px] transform -translate-y-1/2"
        onClick={() => setShowPassword((prev: boolean) => !prev)}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    )}
  </div>
);

export default Signup;
