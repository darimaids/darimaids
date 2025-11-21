import type { Metadata } from "next";
import { Almarai } from "next/font/google";
import "./globals.css";

// components
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";

// util
import { ThemeProvider } from "@/utils/theme-provider";

// provider
import ReactQueryClientProvider from "@/provider/ReactQueryClientProvider";

const almarai = Almarai({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.darimaids.com"),
  title: {
    default: "Darimaids | Professional Cleaning Services",
    template: "%s | Darimaids",
  },
  description:
    "Professional Cleaning Services | Book expert home cleaning in minutes — quick, safe, and affordable.",
  keywords: [
    "cleaning services",
    "home cleaning",
    "maid service",
    "housekeeping",
    "professional cleaners",
    "Darimaids",
  ],
  authors: [{ name: "Darimaids" }],
  creator: "Darimaids",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.darimaids.com",
    title: "Darimaids | Professional Cleaning Services",
    description:
      "Professional Cleaning Services | Book expert home cleaning in minutes — quick, safe, and affordable.",
    siteName: "Darimaids",
    images: [
      {
        url: "/og-image.jpg", // Ensure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: "Darimaids - Professional Cleaning Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darimaids | Professional Cleaning Services",
    description:
      "Professional Cleaning Services | Book expert home cleaning in minutes — quick, safe, and affordable.",
    images: ["/og-image.jpg"], // Same as OG image
    creator: "@darimaids", // Replace with actual handle if available
  },
  icons: {
    icon: "/darimaid.svg",
    shortcut: "/darimaid.svg",
    apple: "/darimaid.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.darimaids.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Darimaids",
  image: "https://www.darimaids.com/darimaid.svg",
  "@id": "https://www.darimaids.com",
  url: "https://www.darimaids.com",
  telephone: "", // Add phone number if available
  address: {
    "@type": "PostalAddress",
    streetAddress: "", // Add address if available
    addressLocality: "",
    postalCode: "",
    addressCountry: "AE", // Assuming UAE based on context, adjust if needed
  },
  description:
    "Professional Cleaning Services | Book expert home cleaning in minutes — quick, safe, and affordable.",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${almarai.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryClientProvider>
            <Header />
            {children}
            <Toaster position="top-center" richColors />
            <Footer />
          </ReactQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
