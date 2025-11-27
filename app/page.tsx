import { Button } from "@/components/ui/button.js";
// @ts-ignore
import { UserButton } from "@clerk/nextjs";
// @ts-ignore
import { auth } from "@clerk/nextjs/server";
// @ts-ignore
import Link from "next/link";
// @ts-ignore
import { redirect } from "next/navigation";

import { getRole } from "@/utils/roles.js";

export default async function Home() {
  const { userId } = await auth();
  const role = userId ? await getRole() : null;

  if (userId && role) {
    redirect(`/${role.toLowerCase()}`);
  }

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
            {/* TAMPILAN JIKA USER LOGGED IN TAPI GAGAL DIALihkan (KASUS EDGE) */}
            {userId ? (
              <>
                <p className="text-gray-500">
                  Anda sudah terautentikasi. Silakan refresh jika tidak
                  dialihkan.
                </p>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              // TAMPILAN UNTUK PENGGUNA LOGGED OUT
              <>
                {/* 6. PENGGUNAAN KOMPONEN LINK HARUS BENAR */}
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
