type AllRoles = "ADMIN" | "MANAGER" | "DOCTOR" | "NURSE" | "MIDWIFE" | "REGISTRAR" | "LAB_OFFICER" | "FINANCE_OFFICER" | "patient" | "sign-in";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: AllRoles; 
      fasyankesId?: string; 
      staffId?: string; 
      firstName?: string;
    };
  }
}