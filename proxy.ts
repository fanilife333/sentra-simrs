// proxy.ts (FINAL & SESUAI KEBUTUHAN LANDING PAGE STATIS)

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

interface UserJwtPayload {
    metadata: {
        role: "ADMIN" | "MANAGER" | "DOCTOR" | "NURSE" | "MIDWIFE" | "REGISTRAR" | "LAB_OFFICER" | "FINANCE_OFFICER" | "patient" | "sign-in";
    };
}

// @ts-ignore 
import { NextResponse } from "next/server"; 

import { routeAccess } from "./lib/routes.js"; 

const publicRoutes = createRouteMatcher([
    '/', // Halaman Root sekarang PUBLIK & STATIS
    '/sign-in(.*)', 
    '/sign-up(.*)', 
    '/api(.*)', 
]);

const matchers = Object.keys(routeAccess).map((route) => ({
    matcher: createRouteMatcher([route]),
    allowedRoles: routeAccess[route as keyof typeof routeAccess], 
}));

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();
    const url = new URL(req.url);
    const pathname = url.pathname; 

    const claims = sessionClaims as unknown as UserJwtPayload | null; 

    // Jika rute adalah publik (termasuk '/')
    if (publicRoutes(req)) {
        return NextResponse.next();
    }

    const role =
        userId && claims?.metadata?.role
            ? claims.metadata.role 
            : userId
            ? "patient" 
            : "sign-in"; 

    const intendedRedirectPath = `/${role.toLowerCase()}`;

    // 🛑 KOREKSI: HAPUS BLOK REDIRECT DARI ROOT (/)
    // Blok ini dihapus agar pengguna logged in tetap bisa melihat landing page.
    /*
    if (userId && role !== "sign-in" && pathname === '/') {
        return NextResponse.redirect(new URL(intendedRedirectPath, url.origin));
    }
    */
    
    // ✅ PERTAHANKAN: Mencegah Loop Redirect saat user sudah di dashboard yang benar
    if (pathname === intendedRedirectPath) {
        return NextResponse.next();
    }

    const matchingRoute = matchers.find(({ matcher }) => matcher(req));

    // Jika rute yang diakses ADA di routeAccess TAPI peran TIDAK DIZINKAN
    if (matchingRoute && !matchingRoute.allowedRoles.includes(role)) {
        // Redirect ke rute default peran mereka
        return NextResponse.redirect(new URL(intendedRedirectPath, url.origin)); 
    }

    // Lanjutkan jika tidak ada kondisi redirect yang terpenuhi
    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};