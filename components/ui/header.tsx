"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// icons
import { Globe, Menu, X } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import MoodToogle from "@/components/ui/mood";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-100 dark:border-[#6A4AAD]/20">
      <div className="flex justify-between items-center px-4 md:px-10 lg:px-[284px] py-6 h-[80px]">
        {/* Logo */}
        <Link href="/">
          <div>
            <Image
              src="/darimaids_logo.svg"
              width={117}
              height={54}
              alt="Brand Logo"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <ul className="flex gap-4 items-center text-[#1F2937] dark:text-gray-300 cursor-pointer">
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/about">
              <li>About</li>
            </Link>
            <Link href="/serviceCatalog">
              <li>Services</li>
            </Link>
            <Link href="/bookings">
              <li>My Bookings</li>
            </Link>
          </ul>
        </div>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer" />
            <p className="text-sm">EN/US</p>
          </div>
          <MoodToogle />
          <Link href="/booking">
            <Button className="px-6">Get a Quote</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-[#6A4AAD]/20 bg-white dark:bg-[#121212]">
          <ul className="flex flex-col py-4 px-6 gap-4 text-[#1F2937] dark:text-gray-300 cursor-pointer">
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/about">
              <li>About</li>
            </Link>
            <Link href="/serviceCatalog">
              <li>Services</li>
            </Link>
            <Link href="/bookings">
              <li>My Bookings</li>
            </Link>
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer" />
                <p className="text-sm">EN/US</p>
              </div>
              <MoodToogle />
            </div>
            <Link href="/booking">
              <Button className="mt-2 w-full">Get a Quote</Button>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
