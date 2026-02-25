import type { Metadata } from "next";
import { Header } from "@/components/Header/header";
import { Footer } from "@/components/Footer/footer";
import { inter } from "@/utils/fonts";
import Providers from "@/components/DarkLightMode/providers";
import "@/styles/globals.css";

const siteUrl = "https://qvilstudios.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "QVIL Studios",
    template: "%s | QVIL Studios",
  },
  description:
    "Fashion in Distortion - Contemporary fashion design by Justin J Vargas",
  keywords: ["fashion", "design", "QVIL Studios", "Justin J Vargas", "contemporary fashion", "fashion distortion"],
  authors: [{ name: "Justin J Vargas" }],
  creator: "QVIL Studios",
  openGraph: {
    title: "QVIL Studios",
    description: "Fashion in Distortion - Contemporary fashion design by Justin J Vargas",
    url: siteUrl,
    siteName: "QVIL Studios",
    images: [
      {
        url: "/images/qvils-og.png",
        width: 1200,
        height: 630,
        alt: "QVIL Studios - Fashion in Distortion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QVIL Studios",
    description: "Fashion in Distortion - Contemporary fashion design by Justin J Vargas",
    images: ["/images/qvils-og.png"],
    creator: "@qvilstudios",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QVIL Studios",
  description: "Fashion in Distortion - Contemporary fashion design by Justin J Vargas",
  url: siteUrl,
  logo: `${siteUrl}/images/qvils-og-nobg1.png`,
  founder: {
    "@type": "Person",
    name: "Justin J Vargas",
  },
  sameAs: [
    "https://instagram.com/qvilstudios",
    "https://tiktok.com/@qvilstudios",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
