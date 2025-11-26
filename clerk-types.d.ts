declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: string;
      fasyankesId?: string; 
      staffId?: string; 
      firstName?: string;
    };
  }
}