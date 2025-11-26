import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            SENTRA:
            <br />
            <span className="text-blue-500 text-4xl md:text-5xl">
              Digitalisasi Faskes, Solusi Manajemen Operasional Terlengkap.
            </span>
          </h1>
        </div>

        <div className="text-center max-w-xl flex flex-col items-center justify-center">
          <p className="mb-8">
            SENTRA adalah Hospital Management System (HMS) terpadu yang menjamin
            efisiensi bisnis Anda dan kepatuhan SatuSehat. Lengkap dengan
            Aplikasi Pasien untuk akses RME instan, aman, dan di genggaman.
          </p>

          <div className="flex gap-4">
            {userId ? (
              <>
                <Link href={"/dashboard"}>
                  <Button>Masuk ke Dashboard</Button>
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button className="md:text-base font-light">
                    Lihat Demo SENTRA Gratis
                  </Button>
                </Link>

                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="md:text-base underline hover:text-blue-600"
                  >
                    Akses Data Medis Pasien
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <footer className="mt-8">
        <p className="text-center text-sm">
          &copy; 2025 SENTRA Hospital Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
