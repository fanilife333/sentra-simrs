/*
  Warnings:

  - The `status` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `payment_method` on the `Billing` table. All the data in the column will be lost.
  - The `status` column on the `Billing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `MedicalRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `is_active` on the `users` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('ONSITE', 'TELEMEDICINE');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "MedicalRecordStatus" AS ENUM ('DRAFT', 'FINAL', 'AMENDED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'CANCELED', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'TRANSFER', 'CARD', 'INSURANCE', 'OTHER');

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "status",
ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
DROP COLUMN "type",
ADD COLUMN     "type" "AppointmentType" NOT NULL;

-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "payment_method",
ADD COLUMN     "paymentMethod" "PaymentMethod",
DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "status",
ADD COLUMN     "status" "MedicalRecordStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_active",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
