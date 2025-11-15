import React from "react";
import Image from "next/image";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// icons
import { CheckCircle } from "lucide-react";

const Body = () => {
  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0F0F0F] transition-colors duration-300 text-[#1F2937] dark:text-gray-200">
      <section className="py-20 px-6 sm:px-[286px]">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-center">
            Why Choose Darimaids?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-14 text-center">
            We’re not just another cleaning service — here’s why thousands of
            homeowners trust us with their homes.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="max-w-[500px]">
            <ul className="space-y-5">
              {[
                {
                  title: "Thoroughly Vetted Cleaners",
                  desc: "We interview, background check, and continuously rate all our professionals. Only the best join our team.",
                },
                {
                  title: "100% Satisfaction Guarantee",
                  desc: "If you’re not completely happy, we’ll return and fix it at no additional cost. Your peace of mind is guaranteed.",
                },
                {
                  title: "Transparent Pricing",
                  desc: "No hidden fees or surprise charges. You see the final price before booking, and that’s what you pay.",
                },
                {
                  title: "Easy Online Management",
                  desc: "Schedule, reschedule, or communicate with your cleaner easily through our platform. Total control at your fingertips.",
                },
                {
                  title: "All Supplies Included",
                  desc: "Our professionals bring all necessary equipment and eco-friendly cleaning products. You provide nothing but access.",
                },
              ].map((item, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <CheckCircle className="text-[#6A4AAD] w-5 h-5 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full sm:max-w-md mx-auto lg:mx-0">
            <Image
              src="/cleaner-light.svg"
              alt="Professional cleaner (light)"
              width={400}
              height={450}
              className="object-cover w-full dark:hidden"
            />
            <Image
              src="/cleaner-dark.svg"
              alt="Professional cleaner (dark)"
              width={400}
              height={450}
              className="object-cover w-full hidden dark:block"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-[286px]">
        <h2 className="text-3xl font-bold mb-2 text-center">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-14 text-center">
          Three easy steps from booking to bliss. No surprises, just results.
        </p>

        <div className="space-y-24">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-[439px] text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">
                Tell Us a Bit About You
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up in just 30 seconds with your email or social login. This
                helps us save your details for faster booking next time and lets
                you track all your cleanings in one place.
              </p>
            </div>
            <div className="relative w-full sm:max-w-md mx-auto lg:mx-0">
              <Image
                src="/first-light.svg"
                alt="Create Account Form (light)"
                width={400}
                height={300}
                className="w-full h-auto dark:hidden"
              />
              <Image
                src="/first-dark.svg"
                alt="Create Account Form (dark)"
                width={400}
                height={300}
                className="w-full h-auto hidden dark:block"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-10">
            <div className="max-w-[439px] text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Schedule Cleaning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select your service, frequency, and address. See your final,
                all-inclusive price before you book. No hidden fees, no
                surprises — just transparent pricing and full control.
              </p>
            </div>
            <div className="relative w-full sm:max-w-md mx-auto lg:mx-0">
              <Image
                src="/second-light.svg"
                alt="Booking Form (light)"
                width={400}
                height={300}
                className="w-full h-auto dark:hidden"
              />
              <Image
                src="/second-dark.svg"
                alt="Booking Form (dark)"
                width={400}
                height={300}
                className="w-full h-auto hidden dark:block"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-[439px] text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">
                Confirm booking & Relax
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pay using secure payment channels — your details are safely
                encrypted and charged only after the job is complete. Sit back
                and relax while we handle the rest.
              </p>
            </div>
            <div className="relative w-full sm:max-w-md mx-auto lg:mx-0">
              <Image
                src="/third-light.svg"
                alt="Booking Confirmation (light)"
                width={400}
                height={300}
                className="w-full h-auto dark:hidden"
              />
              <Image
                src="/third-dark.svg"
                alt="Booking Confirmation (dark)"
                width={400}
                height={300}
                className="w-full h-auto hidden dark:block"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#6A4AAD] py-20 text-center px-6 relative overflow-hidden h-[450px] flex flex-col justify-center items-center text-[#EADDCD]">
        <div className="absolute left-0 md:left-0 top-1/2 transform -translate-y-1/2 opacity-20">
          <img src="/half-logo-left.svg" alt="Darimaids Logo" />
        </div>
        <div className="absolute right-0 md:right-0 top-1/2 transform -translate-y-1/2 opacity-20">
          <img src="/half-logo-right.svg" alt="Darimaids Logo" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-1">
            Hazzle free cancellation
          </h2>
          <p className=" mb-8">
            Your first clean is just a click away. Book your trusted cleaning
            service now!
          </p>
          <Link href="/login">
            <Button className="bg-[#EADDCD] text-[#6A4AAD] hover:bg-[#e2d5ff] px-8 py-4 rounded-lg font-semibold sm:py-5 sm:px-[120px] transition-all duration-500">
              Book your first clean
            </Button>
          </Link>
          <p className="text-xs mt-1">
            No commitments. Easy booking. Cancel anytime.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6 sm:px-[286px] bg-[#FAFAFA] dark:bg-[#0F0F0F] transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1F2937] dark:text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Got questions? We’ve got answers. Here’s everything you need to know
            before booking your next cleaning.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What type of cleaning do I need?
              </AccordionTrigger>
              <AccordionContent>
                It depends on your home’s condition and how often it’s cleaned.
                For regular upkeep, choose a <b>Standard Cleaning</b>. If it’s
                your first time or after a long gap, go for a{" "}
                <b>Deep Cleaning</b>. Moving in or out? Pick our{" "}
                <b>Move In/Out Cleaning</b>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                What is included in each type of cleaning?
              </AccordionTrigger>
              <AccordionContent>
                Each service includes core tasks like dusting, vacuuming,
                mopping, and sanitizing bathrooms and kitchens. Deep cleaning
                adds extras like appliance interiors, grout scrubbing, vents,
                and detailed surface polishing. Airbnb and White Glove services
                are tailored to specific needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Do you need to see my home before giving a quote?
              </AccordionTrigger>
              <AccordionContent>
                Not necessarily. Most quotes are based on your home’s size and
                type of service. However, if you request a custom or complex
                cleaning, we may schedule a quick consultation to ensure
                accurate pricing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                Is my personal information safe?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely. We take data privacy seriously. Your details are
                securely encrypted and used only for service-related purposes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                What forms of payment do you accept?
              </AccordionTrigger>
              <AccordionContent>
                We accept major debit/credit cards and secure online payment
                methods. Cash is not accepted for safety and accountability
                reasons.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                What’s the difference between a standard and deep cleaning?
              </AccordionTrigger>
              <AccordionContent>
                Standard cleaning maintains cleanliness — ideal for weekly or
                monthly upkeep. Deep cleaning is more detailed, reaching under
                furniture, scrubbing tiles, and sanitizing neglected areas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>
                How long will my cleaning take?
              </AccordionTrigger>
              <AccordionContent>
                It depends on your home’s size and selected service. A standard
                clean for a 2-bed home typically takes 2–3 hours. Deep or
                move-in/out cleanings may take longer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>
                Do I need to provide cleaning supplies?
              </AccordionTrigger>
              <AccordionContent>
                Nope! Our cleaners come fully equipped with all eco-friendly
                products and tools needed to deliver a spotless clean.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>
                Are your products pet friendly?
              </AccordionTrigger>
              <AccordionContent>
                Yes. We use eco-conscious, non-toxic, and pet-safe cleaning
                solutions. You can rest easy knowing your furry friends are
                safe.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>
                Can I schedule recurring cleaning?
              </AccordionTrigger>
              <AccordionContent>
                Definitely! Choose from weekly, bi-weekly, or monthly plans for
                continuous sparkle — with flexible rescheduling anytime through
                your account.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionTrigger>
                Cancellation or Reschedule policy
              </AccordionTrigger>
              <AccordionContent>
                You can cancel or reschedule up to 24 hours before your
                appointment for free. Cancellations within 24 hours may incur a
                small fee to cover our team’s reserved time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger>
                What makes DariMaids different?
              </AccordionTrigger>
              <AccordionContent>
                DariMaids combines professional-grade quality, vetted cleaners,
                eco-friendly practices, transparent pricing, and stellar
                customer support. We’re built on trust, care, and consistency.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Body;
