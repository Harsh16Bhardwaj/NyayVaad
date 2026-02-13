import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Josefin_Sans } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import ReduxProvider from '@/components/ReduxProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  display: 'swap',
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
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${josefinSans.variable}`}>
        <body suppressHydrationWarning className="antialiased bg-neutral-950">
          <ReduxProvider>
            <Header />
            {children}
            <Footer />
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
