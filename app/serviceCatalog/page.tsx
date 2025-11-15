"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getServices } from "@/services/catalog/serviceCatalog";

interface CatalogItem {
  _id: string;
  serviceName: string;
  description: string;
  serviceType: string[];
  prices: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CatalogResponse {
  success: boolean;
  count: number;
  catalogs: CatalogItem[];
}

const ServicesPage: React.FC = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery<CatalogResponse>({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const catalogs = data?.catalogs ?? [];

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0F0F0F] transition-colors duration-300">
      {/* Header */}
      <div className="bg-[#6A4AAD] w-full h-[498px] text-center flex flex-col justify-center items-center px-4 text-white">
        <h1 className="text-5xl font-bold">Our Cleaning Services</h1>
        <p className="text-[#E3E3E3] text-xl mt-2 max-w-2xl">
          Professional cleaning solutions tailored to your needs. Reclaim your
          time and love your home.
        </p>
      </div>

      <div className="py-16 px-6 sm:px-[286px]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-100 dark:border-[#2E2E2E] min-h-[520px] flex flex-col"
              >
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />

                <Skeleton className="h-4 w-4/5 mb-2" />
                <Skeleton className="h-4 w-3/5 mb-2" />
                <Skeleton className="h-4 w-4/6 mb-2" />

                <div className="mt-auto pt-4">
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            ))}

          {!isLoading &&
            catalogs.map((service) => (
              <div
                key={service._id}
                className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 hover:shadow-md transition flex flex-col justify-between min-h-[520px] border border-gray-100 dark:border-[#2E2E2E]"
              >
                <div>
                  <div className="pb-4 border-b border-gray-200 dark:border-[#2E2E2E]">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {service.serviceName}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    {service.serviceType?.slice(0, 5).map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-start mb-2">
                        <Check className="text-[#409261] mt-1 w-4 h-4 shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {item}
                        </p>
                      </div>
                    ))}

                    <div className="mt-5 mb-3">
                      {service.prices?.map((priceItem, idx) => {
                        const [label, price] = priceItem
                          .split("=")
                          .map((p) => p.trim());

                        return (
                          <p
                            key={idx}
                            className="text-[#6A4AAD] dark:text-[#B9A8E4] font-medium text-sm sm:text-base flex justify-between"
                          >
                            <span>{label ?? ""}</span>
                            <span>{price ?? ""}</span>
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/booking")}
                  className="w-full py-4 mt-auto bg-[#6A4AAD] hover:bg-[#5a3b99] dark:bg-[#7C5DC5] dark:hover:bg-[#6F4FB7] text-white transition"
                >
                  Get a Quote
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
