"use client";

import React, { useEffect, useState } from "react";

const PrivacyPolicy = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-[#FAFAFA] dark:bg-[#0F0F0F] transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#6A4AAD] z-50 transition-all duration-200 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <div className="bg-[#6A4AAD] w-full h-[420px] text-center flex flex-col justify-center items-center px-4 text-white">
        <h1 className="text-5xl font-bold">Privacy Policy</h1>
        <p className="text-[#E3E3E3] text-xl mt-2 max-w-2xl">
          Learn how Darimaids collects, uses, and protects your personal
          information.
        </p>
      </div>

      {/* Content Section */}
      <div className="py-16 px-6 sm:px-[286px] bg-white dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="text-center mb-10">
          <h2 className="text-[#1F2937] dark:text-white text-2xl font-semibold">
            Your Privacy Matters to Us
          </h2>
        </div>

        <div className="mx-auto text-[#1F2937] dark:text-gray-300 space-y-4 text-base leading-relaxed">
          <p>
            At Darimaids, we are committed to safeguarding the privacy and
            security of your personal information. This Privacy Policy explains
            what data we collect, how we use it, who we share it with, and the
            rights you have regarding your information.
          </p>

          <h3 className="text-xl font-semibold mt-8">
            1. Information We Collect
          </h3>
          <p>
            We collect information to provide you with smooth booking
            experiences and high-quality services. This includes:
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number.
            </li>
            <li>
              <strong>Service Details:</strong> Home address, service type,
              recurring preference, booking notes, add-ons.
            </li>
            <li>
              <strong>Payment Information:</strong> Processed securely by
              third-party payment providers. Darimaids does not store card
              details.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, device
              information, and cookies to improve performance.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-8">
            2. How We Use Your Information
          </h3>
          <p>
            Your information helps us deliver a seamless booking experience. We
            use your data to:
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>Process bookings, payments, and recurring services</li>
            <li>Send booking confirmations and reminders</li>
            <li>Communicate with you via Email, SMS, or WhatsApp</li>
            <li>Optimize platform performance and improve services</li>
            <li>Support customer inquiries and resolve disputes</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8">
            3. Sharing Your Information
          </h3>
          <p>
            Darimaids does not sell your personal information. We only share
            data when necessary to deliver services:
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Cleaners/Contractors:</strong> Only essential booking
              details required to complete assigned services.
            </li>
            <li>
              <strong>Payment Providers:</strong> For secure card processing and
              verification.
            </li>
            <li>
              <strong>Scheduling Platforms:</strong> Like ZenMaid or Calendly
              for booking assignments.
            </li>
            <li>
              <strong>Messaging Providers:</strong> For sending confirmations
              and reminders.
            </li>
            <li>
              <strong>Regulatory Authorities:</strong> When required for legal
              compliance or fraud prevention.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-8">4. Cookies & Tracking</h3>
          <p>
            We use cookies and similar technologies to enhance user experience,
            analyze usage, and improve platform functionality. You may disable
            cookies through your browser settings, but some features may not
            function correctly.
          </p>

          <h3 className="text-xl font-semibold mt-8">5. Data Security</h3>
          <p>
            We implement industry-standard security measures to protect your
            data. While we take every precaution, no system can guarantee
            complete security. Payment information remains handled entirely by
            PCI-compliant partners.
          </p>

          <h3 className="text-xl font-semibold mt-8">6. Data Retention</h3>
          <p>
            We retain your information for as long as necessary to provide
            services, comply with legal requirements, improve our processes, or
            maintain your account.
          </p>

          <h3 className="text-xl font-semibold mt-8">7. Your Privacy Rights</h3>
          <p>You may have the right to:</p>

          <ul className="list-disc list-inside space-y-2">
            <li>Access and update your personal information</li>
            <li>Request deletion of your data</li>
            <li>Opt out of non-essential communications</li>
            <li>Request a copy of your stored information</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8">8. Children’s Privacy</h3>
          <p>
            Darimaids is not intended for use by individuals under 18. If we
            discover that data from a minor has been collected, we will delete
            it promptly.
          </p>

          <h3 className="text-xl font-semibold mt-8">
            9. Updates to This Policy
          </h3>
          <p>
            We may update this Privacy Policy periodically. Updated versions are
            effective immediately upon posting.
          </p>

          <h3 className="text-xl font-semibold mt-8">10. Contact Us</h3>
          <p>
            For questions or concerns about your privacy, please contact our
            support team through the channels listed on our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
