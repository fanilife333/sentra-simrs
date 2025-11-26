import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { routeAccess } from "./lib/routes.js"; 

// 1. Definisikan Rute Publik
const publicRoutes = createRouteMatcher([
    '/', // Halaman Utama
    '/sign-in(.*)', // Halaman Login Clerk
    '/sign-up(.*)', // Halaman Register Clerk
    '/api(.*)', // Rute API
]);

const matchers = Object.keys(routeAccess).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccess[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const url = new URL(req.url);

  // 2. Jika rute adalah publik, jangan lakukan cek RBAC, lanjut saja.
  if (publicRoutes(req)) {
      return NextResponse.next();
  }

  // 3. Logika Penentuan Peran
  const role =
    userId && sessionClaims?.metadata?.role
      ? sessionClaims.metadata.role 
      : userId
      ? "patient" // Default role jika sudah login tapi metadata belum terisi
      : "sign-in"; // Role jika belum login

  // 4. Logika Pengecekan RBAC
  const matchingRoute = matchers.find(({ matcher }) => matcher(req));

  // Jika rute yang diakses ada di routeAccess TAPI peran TIDAK DIZINKAN
  if (matchingRoute && !matchingRoute.allowedRoles.includes(role)) {
    // Alihkan pengguna ke rute default peran mereka
    return NextResponse.redirect(new URL(`/${role}`, url.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};