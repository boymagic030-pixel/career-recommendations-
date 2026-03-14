import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components";

export const metadata: Metadata = {
  title: "CareerAI - Discover Your Perfect Career Path | AI-Powered Career Guidance",
  description: "Transform your future with AI-powered career recommendations. Take our comprehensive assessment and discover careers that match your skills, interests, and personality. Free for students.",
  keywords: "career guidance, AI career recommendation, career assessment, aptitude test, career counseling, job matching, skill analysis",
  authors: [{ name: "CareerAI Team - St. Joseph College of Engineering" }],
  openGraph: {
    title: "CareerAI - Discover Your Perfect Career Path",
    description: "AI-powered career guidance system helping students make informed career decisions.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
