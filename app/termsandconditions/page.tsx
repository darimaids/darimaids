"use client";

import React, { useEffect, useState } from "react";

const Terms = () => {
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
        <h1 className="text-5xl font-bold">Terms & Conditions</h1>
        <p className="text-[#E3E3E3] text-xl mt-2 max-w-2xl">
          Please review these terms before using the Darimaids platform.
        </p>
      </div>

      {/* Content Section */}
      <div className="py-16 px-6 sm:px-[286px] bg-white dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="text-center mb-10">
          <h2 className="text-[#1F2937] dark:text-white text-2xl font-semibold">
            Agreement to Terms
          </h2>
        </div>

        <div className="mx-auto text-[#1F2937] dark:text-gray-300 space-y-4 text-base leading-relaxed">
          <p>
            By using Darimaids, you confirm that you have read, understood, and
            agreed to the Terms & Conditions stated here. If you do not agree,
            you should discontinue the use of our website, booking tools,
            dashboard, or any related services.
          </p>

          <h3 className="text-xl font-semibold mt-8">1. Use of the Platform</h3>
          <p>
            Darimaids provides tools to simulate pricing, book home cleaning
            services, manage recurring appointments, and make secure payments.
            You agree to use the platform responsibly and only for lawful
            purposes.
          </p>
          <p>
            You are responsible for maintaining accurate account information and
            safeguarding your login credentials.
          </p>

          <h3 className="text-xl font-semibold mt-8">
            2. Account Registration
          </h3>
          <p>
            Certain features require creating an account. You agree to provide
            complete, accurate, and updated information at all times.
          </p>
          <p>
            Darimaids may suspend or terminate accounts that contain inaccurate
            information or violate our terms.
          </p>

          <h3 className="text-xl font-semibold mt-8">3. Service Bookings</h3>
          <p>
            When you book a cleaning, you agree to provide correct details about
            your home, service type, add-ons, address, and schedule. Pricing is
            based on the information you provide.
          </p>
          <p>
            After payment, confirmation will be sent via email/SMS/WhatsApp, and
            the booking will be visible in your dashboard if applicable.
          </p>

          <h3 className="text-xl font-semibold mt-8">4. Payments & Fees</h3>
          <p>
            Payments are processed securely through approved payment providers.
            Darimaids does not store or handle card information.
          </p>
          <p>
            Recurring bookings may include discounted pricing depending on the
            frequency selected (weekly, bi-weekly, or monthly).
          </p>
          <p>All fees will be shown clearly before completing payment.</p>

          <h3 className="text-xl font-semibold mt-8">
            5. Cancellation & Rescheduling Policy
          </h3>
          <p>
            You may cancel or reschedule your booking from the confirmation
            email or dashboard. However, cancellations made less than 24 hours
            before your scheduled cleaning may incur a late-cancellation fee, as
            configured in our policies.
          </p>
          <p>
            No-shows or entry refusal at the service location may also attract a
            fee.
          </p>

          <h3 className="text-xl font-semibold mt-8">6. Refund Policy</h3>
          <p>
            Completed cleanings are non-refundable. If a booking fails due to a
            payment issue or no cleaner assignment, our support team will assist
            you to resolve the issue or issue refunds when applicable.
          </p>
          <p>
            Refund timelines depend on your bank or payment provider and may
            take 3–7 business days.
          </p>

          <h3 className="text-xl font-semibold mt-8">
            7. Prohibited Activities
          </h3>
          <p>
            You agree not to engage in activities including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Misrepresentation of service or home details</li>
            <li>Attempting fraudulent payments or chargebacks</li>
            <li>Unauthorized access to the Darimaids admin portal</li>
            <li>Copying or redistributing site content without permission</li>
            <li>Any actions violating state, federal, or local laws</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8">
            8. Limitation of Liability
          </h3>
          <p>Darimaids is not responsible for:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Delays caused by cleaners, external platforms, or third parties
            </li>
            <li>Incorrect details provided by the user during booking</li>
            <li>
              Service unavailability due to maintenance or technical issues
            </li>
            <li>
              Damages resulting from misuse of the platform or policy violations
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-8">9. Privacy</h3>
          <p>
            All personal and booking information is handled in accordance with
            our privacy policy. We do not sell your data to unauthorized third
            parties.
          </p>

          <h3 className="text-xl font-semibold mt-8">10. Updates to Terms</h3>
          <p>
            Darimaids may update these Terms & Conditions as needed. Any changes
            become effective immediately once published on the platform.
          </p>

          <h3 className="text-xl font-semibold mt-8">11. Contact Us</h3>
          <p>
            For questions or concerns about these Terms, please contact our
            support team using the communication channels provided on our
            website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
