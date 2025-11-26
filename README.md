# Sentra SIMRS: Hospital Management Information System

A modern, scalable Hospital Management Information System (SIMRS) built on the Next.js stack, designed for operational efficiency, data integrity, and strict role-based security.

## Project Overview

This system manages core hospital operations, focusing on robust security via Role-Based Access Control (RBAC) integrated directly into the routing layer.

## Key Features

- **Role-Based Access Control (RBAC):** Strict authorization implemented via **Clerk Middleware (Proxy)** and custom JWT session claims to restrict URL access based on user roles (`ADMIN`, `DOCTOR`, `NURSE`, etc.).
- **Secure Authentication:** High-availability user and session management leveraging **Clerk** for reliability and scalability.
- **Data Scoping Readiness:** Architectural design supports data segregation based on Facility ID (`fasyankesId`), ensuring staff can only view and manage data relevant to their assigned unit or branch.
- **Core Data Modules:** Database schema prepared for essential modules including Staff, Patient Management, and Medical Records.
- **Modern Architecture:** Built on the **Next.js App Router** for optimal performance, server-side rendering, and **TypeScript** for compile-time type safety.

## Technology Stack

| Category                | Technology               | Purpose                                                                   |
| :---------------------- | :----------------------- | :------------------------------------------------------------------------ |
| **Framework**           | **Next.js** (App Router) | High-performance full-stack React framework.                              |
| **Language**            | **TypeScript**           | Ensures type safety, maintainability, and code predictability.            |
| **Database ORM**        | **Prisma**               | Type-safe database access and streamlined schema management.              |
| **Authentication/Auth** | **Clerk**                | Authentication, user management, and custom JWT claim injection for RBAC. |
| **Database**            | PostgreSQL/MySQL         | Reliable relational data storage (configurable via `DATABASE_URL`).       |

---

## Authorization Structure

The system utilizes custom claims within the Clerk JWT session to assign user roles (e.g., `'ADMIN'`). The authorization logic resides in **`proxy.ts`** and enforces rules defined in the **`lib/routes.ts`** mapping file.

### Example Access Rules:

| Role                | Primary Accessible Routes                              |
| :------------------ | :----------------------------------------------------- |
| `ADMIN` / `MANAGER` | `/admin`, `/record/*`, `/billing`, `/doctor`, `/staff` |
| `DOCTOR`            | `/doctor`, `/record/patients`, `/patients/*`           |
| `REGISTRAR`         | `/staff`, `/patients/new`, `/record/patients`          |
| `patient`           | `/patient-portal`, `/`                                 |

---

## Environment Requirements

To run this project, the following environment variables are required. These variables **must** be stored in a `.env.local` file and **must not** be committed to the repository.

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL`

_(Refer to **`.env.example`** for the required structure)_

## Project Setup and Execution

1.  **Clone the Repository:**
    ```bash
    git clone [REPOSITORY URL]
    cd sentra-simrs
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Database Setup (Prisma):**
    Ensure your database is running and the `DATABASE_URL` is configured in `.env.local`.
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```
4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

The application will be accessible at `http://localhost:3000`.
