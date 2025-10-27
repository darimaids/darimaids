"use client";

import React, { useEffect, useState } from "react";

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll tracking logic
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
        className="fixed top-0 left-0 h-[4px] bg-[#6A4AAD] z-50 transition-all duration-200 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <div className="bg-[#6A4AAD] w-full h-[498px] text-center flex flex-col justify-center items-center px-4 text-white">
        <h1 className="text-5xl font-bold">About Darimaids</h1>
        <p className="text-[#E3E3E3] text-xl mt-2 max-w-2xl">
          We're on a mission to help you reclaim your time by providing
          exceptional cleaning services you can trust.
        </p>
      </div>

      {/* Story Section */}
      <div className="py-16 px-6 sm:px-[286px] bg-white dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="text-center mb-10">
          <h2 className="text-[#1F2937] dark:text-white text-2xl font-semibold">
            Our Story
          </h2>
          <p className="text-[#666] dark:text-gray-400">
            Learn more about our journey and what makes Darimaids different
          </p>
        </div>

        <div className="mx-auto text-[#1F2937] dark:text-gray-300 space-y-4 text-base leading-relaxed">
          <p>
            Founded in 2018, Darimaids began with a simple mission: to provide
            reliable, professional cleaning services that give busy individuals
            and families more time to focus on what truly matters.
          </p>
          <p>
            Our team of carefully vetted cleaning professionals undergoes
            rigorous training and background checks to ensure your home is in
            the best hands. We use eco-friendly products and proven techniques
            to deliver exceptional results every time.
          </p>
          <p>
            Today, we serve thousands of satisfied customers across the city,
            maintaining our commitment to quality, reliability, and outstanding
            customer service.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3 text-center">
          <div className="bg-[#FAFAFA] dark:bg-[#2B2B2B] py-10 rounded-[8px]">
            <h3 className="text-4xl font-bold text-[#6A4AAD]">5,000+</h3>
            <p className="text-[#666] dark:text-gray-300">Happy Customers</p>
          </div>
          <div className="bg-[#FAFAFA] dark:bg-[#2B2B2B] py-10 rounded-[8px]">
            <h3 className="text-4xl font-bold text-[#6A4AAD]">50+</h3>
            <p className="text-[#666] dark:text-gray-300">
              Professional Cleaners
            </p>
          </div>
          <div className="bg-[#FAFAFA] dark:bg-[#2B2B2B] py-10 rounded-[8px]">
            <h3 className="text-4xl font-bold text-[#6A4AAD]">98%</h3>
            <p className="text-[#666] dark:text-gray-300">Satisfaction Rate</p>
          </div>
        </div>

        {/* Hours Section */}
        <div className="mt-16 bg-[#FAFAFA] dark:bg-[#2B2B2B] p-8 rounded-xl shadow-sm">
          <h3 className="text-2xl font-semibold text-center mb-6 text-[#1F2937] dark:text-gray-100">
            Our Hours
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
            Our regular cleaning services are available during these hours:
          </p>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 text-[#1F2937] dark:text-gray-300 max-w-lg mx-auto">
            <div className="flex justify-between py-3 font-medium">
              <span>Monday - Friday</span>
              <span className="text-[#6A4AAD] dark:text-[#B9A8E4]">
                8:00 AM - 8:00 PM
              </span>
            </div>
            <div className="flex justify-between py-3 font-medium">
              <span>Saturday</span>
              <span className="text-[#6A4AAD] dark:text-[#B9A8E4]">
                8:00 AM - 8:00 PM
              </span>
            </div>
            <div className="flex justify-between py-3 font-medium">
              <span>Sunday</span>
              <span className="text-[#6A4AAD] dark:text-[#B9A8E4]">
                8:00 AM - 8:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-16 bg-[#FAFAFA] dark:bg-[#2B2B2B] p-8 rounded-xl shadow-sm">
          <h3 className="text-2xl font-semibold text-center mb-6 text-[#1F2937] dark:text-gray-100">
            Our Location
          </h3>
          <div className="text-center text-[#1F2937] dark:text-gray-300 mb-4">
            📍 123 Clean Street, Sparkle City, FL 33101
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm h-[350px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.254585977861!2d-80.19179028496557!3d25.76167938363837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b7e3f9c4e3ef%3A0xf7f45e1c7b6b1a5a!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1698551282340!5m2!1sen!2sus"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
