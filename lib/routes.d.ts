import { Role } from "./generated/prisma/index.js"; 

type NonPrismaRole = "patient" | "sign-in";

export type AllRoles = Role | NonPrismaRole; 
export declare const routeAccess: Record<string, AllRoles[]>;