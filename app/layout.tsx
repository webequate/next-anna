import "@/styles/globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://annaelisejohnson.com"),
  title: {
    default: "Anna Elise Johnson",
    template: "%s | Anna Elise Johnson",
  },
  description: "Anna Elise Johnson's artist website.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anna Elise Johnson",
    description: "Anna Elise Johnson's artist website.",
    url: "https://annaelisejohnson.com",
    siteName: "Anna Elise Johnson",
    images: [
      {
        url: "https://annaelisejohnson.com/images/anna-og.jpg",
        width: 1200,
        height: 630,
        alt: "Anna Elise Johnson",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/anna.png",
  },
};

export const revalidate = 60; // default revalidation unless overridden per page

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Consider self-hosting fonts or using next/font for optimal loading */}
      </head>
      <body
        className={`flex flex-col bg-light-1 dark:bg-black ${montserrat.variable}`}
      >
        <div className="mx-auto w-full max-w-7xl sm:px-8 lg:px-16">
          <main className="min-h-screen bg-white dark:bg-neutral-900 sm:border-x border-dark-3 dark:border-light-3 px-6 sm:px-8 lg:px-16">
            <div className="bg-white dark:bg-neutral-900">
              <Providers>{children}</Providers>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
