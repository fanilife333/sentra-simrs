import { auth } from "@clerk/nextjs/server";

type AllRoles = "ADMIN" | "MANAGER" | "DOCTOR" | "NURSE" | "MIDWIFE" | "REGISTRAR" | "LAB_OFFICER" | "FINANCE_OFFICER" | "patient" | "sign-in";

interface CustomSessionClaims {
  metadata: {
    role?: AllRoles; 
    [key: string]: unknown;
  };
}

export async function getRole(): Promise<string> { 
    const { sessionClaims } = await auth();

    if (!sessionClaims) {
        return "patient"; 
    }

    const claims = sessionClaims as unknown as CustomSessionClaims; 

    const role = claims.metadata.role || "patient";

    if (role === 'patient' || role === 'sign-in') {
        return role;
    }

    return role; 
}

/*
Jika dikembalikan:
- ADMIN -> app/page.tsx me-redirect ke /admin
- patient -> app/page.tsx me-redirect ke /patient
*/