-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER');

-- CreateEnum
CREATE TYPE "EmergencyRelation" AS ENUM ('SPOUSE', 'PARENT', 'CHILD', 'SIBLING', 'FRIEND', 'OTHER');

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "emergency_name" TEXT,
ADD COLUMN     "emergency_number" TEXT,
ADD COLUMN     "emergency_relation" "EmergencyRelation",
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "marital_status" "MaritalStatus",
ADD COLUMN     "privacy_consent" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Allergy" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "severity" TEXT,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalHistory" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "diagnosis_date" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
