import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#2D1F49] text-[white] w-full">
      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 xl:px-40 py-16">
        {/* Top Section - Brand and Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
          {/* Left Section - Brand */}
          <div className="flex flex-col space-y-6 max-w-[400px]">
            {/* Logo */}
            <div className="mb-5">
              <Image
                src="/darimaids_logo_white.svg"
                width={140}
                height={40}
                alt="DariMoids"
                className="h-8 w-auto"
              />
            </div>

            {/* Tagline */}
            <p className="text-[15px] leading-[22px] text-[#CAC7D1] font-normal">
              Sparkly Made Effortlessly
            </p>
          </div>

          {/* Right Section - Links and Contact */}
          <div className="flex flex-col md:flex-row gap-16">
            {/* Quick Links */}
            <div className="flex flex-col space-y-4 min-w-[160px]">
              <h3 className="text-[16px] font-semibold mb-2">Quick Links</h3>
              <div className="flex flex-col space-y-3">
                {["Home", "About", "Services", "My Bookings", "FAQs"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-[14px] text-[#CAC7D1] hover:text-white transition-colors font-normal"
                    >
                      {link}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Contact & Socials */}
            <div className="flex flex-col space-y-6 min-w-[200px]">
              {/* Contact Us */}
              <div className="flex flex-col space-y-4">
                <h3 className="text-[16px] font-semibold">Contact us</h3>
                <div className="flex flex-col space-y-3">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 shrink-0" />
                    <a
                      href="mailto:discoverofficel@darimaids.com"
                      className="text-[14px] text-[#CAC7D1] hover:text-white transition-colors font-normal break-all"
                    >
                      discoverofficel@darimaids.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 shrink-0" />
                    <a
                      href="tel:+2348013425496"
                      className="text-[14px] text-[#CAC7D1] hover:text-white transition-colors font-normal"
                    >
                      +234 801 342 5496
                    </a>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="flex flex-col space-y-4">
                <h3 className="text-[16px] font-semibold">Socials</h3>
                <div className="flex gap-3">
                  {["facebook", "twitter", "instagram", "linkedin"].map(
                    (platform) => (
                      <div
                        key={platform}
                        className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        <span className="text-[12px] font-medium text-white">
                          {platform.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-6">
          {/* Bottom Section - Copyright and Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright - Mobile */}
            <p className="text-[13px] text-gray-400 font-light lg:hidden text-center md:text-left w-full">
              © 2025 DariMaids. All rights reserved.
            </p>

            {/* Copyright - Desktop (centered) */}
            <p className="text-[13px] text-gray-400 font-light hidden lg:block">
              © 2025 DariMaids. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6 text-[13px] text-[#CAC7D1]">
              <a
                href="#"
                className="hover:text-white transition-colors font-normal"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors font-normal"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
