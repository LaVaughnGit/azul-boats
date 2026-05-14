import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import "./globals.css";
import { BookingModalProvider } from "@/components/booking-modal-provider";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  icons: { icon: "/icons/favicon.svg" },
  title: "Azul Boat Rentals | Luxury Boat Rentals in Miami, FL",
  description:
    "Experience the beauty of Biscayne Bay aboard a 24ft Crownline Bowrider. Self-drive or captained rentals from $80/hr. Up to 12 passengers. Book online today.",
  keywords: "boat rental miami, luxury boat rental, biscayne bay, crownline, miami water sports",
  openGraph: {
    title: "Azul Boat Rentals | Luxury Boat Rentals in Miami, FL",
    description: "Experience the beauty of Biscayne Bay aboard a 24ft Crownline Bowrider.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${dmSans.variable} h-full`}
      style={{ backgroundColor: "#06061A" }}
    >
      <body className="min-h-full flex flex-col">
        <BookingModalProvider>{children}</BookingModalProvider>
      </body>
    </html>
  );
}
