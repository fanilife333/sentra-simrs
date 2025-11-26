/*
  Warnings:

  - You are about to drop the column `insurance_provider` on the `patients` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'MIDWIFE';
ALTER TYPE "Role" ADD VALUE 'LAB_OFFICER';
ALTER TYPE "Role" ADD VALUE 'FINANCE_OFFICER';

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "insurance_provider",
ADD COLUMN     "insuranceProviderId" TEXT;

-- CreateTable
CREATE TABLE "InsuranceProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT,

    CONSTRAINT "InsuranceProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceProvider_name_key" ON "InsuranceProvider"("name");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_insuranceProviderId_fkey" FOREIGN KEY ("insuranceProviderId") REFERENCES "InsuranceProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
