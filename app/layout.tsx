import type { Metadata } from "next";
import { Almarai } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/utils/theme-provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const almarai = Almarai({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Darimaids",
  description:
    "Professional Cleaning Services | Book expert home cleaning in minutes — quick, safe, and affordable.",
  icons: {
    icon: "/darimaid.svg",
    shortcut: "/darimaid.svg",
    apple: "/darimaid.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${almarai.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
