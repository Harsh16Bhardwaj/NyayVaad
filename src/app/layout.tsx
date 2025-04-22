import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Josefin_Sans } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "NyayVaad",
  description: "Your Legal AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#8B5CF6',
          colorTextOnPrimaryBackground: 'white',
        }
      }}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/onboarding"
    >
      <html lang="en">
        <body
          className={`${poppins.variable} ${josefinSans.variable} antialiased bg-neutral-900`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
