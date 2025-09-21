import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { I18nextProvider } from "react-i18next";
import { i18nInstance } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OmniPoster",
  description: "Plan, schedule, and publish social content across platforms.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-slate-950 text-white`}>
        <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
      </body>
    </html>
  );
}
