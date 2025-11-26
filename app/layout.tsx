import type { Metadata } from "next";
// Ganti import Geist/Geist_Mono dengan Inter dan Roboto Mono
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

// Definisikan Inter sebagai font Sans-serif utama
const inter = Inter({
  variable: "--font-sans", // Menggunakan nama variabel umum
  subsets: ["latin"],
});

// Definisikan Roboto Mono untuk kode atau data monospaced
const robotoMono = Roboto_Mono({
  variable: "--font-mono", // Menggunakan nama variabel umum
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SENTRA HIS",
  description:
    "SENTRA, Enterprise Resource Management (ERM) System khusus layanan kesehatan. Solusi terpadu untuk administrasi RS/Klinik dan Rekam Medis Elektronik (RME) yang compliant SatuSehat. Memberikan data kesehatan yang real-time untuk penyedia layanan dan pasien.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* Terapkan variabel font yang baru (inter dan robotoMono) */}
        <body
          className={`${inter.variable} ${robotoMono.variable} antialiased`}
        >
          {children}
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
