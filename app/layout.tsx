import type { Metadata } from "next";
import { Header } from "@/components/Header/header";
import { Footer } from "@/components/Footer/footer";
import { inter } from "@/utils/fonts";
import Providers from "@/components/DarkLightMode/providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "QVIL Studios",
    template: "%s | QVIL Studios",
  },
  description:
    "Fashion in Distortion - Contemporary fashion design by Justin J Vargas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
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
