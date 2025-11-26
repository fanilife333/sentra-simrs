-- CreateIndex
CREATE INDEX "Allergy_patientId_idx" ON "Allergy"("patientId");

-- CreateIndex
CREATE INDEX "Appointment_patientId_doctorId_idx" ON "Appointment"("patientId", "doctorId");

-- CreateIndex
CREATE INDEX "Appointment_dateTime_idx" ON "Appointment"("dateTime");

-- CreateIndex
CREATE INDEX "MedicalHistory_patientId_idx" ON "MedicalHistory"("patientId");

-- CreateIndex
CREATE INDEX "MedicalRecord_patientId_idx" ON "MedicalRecord"("patientId");

-- CreateIndex
CREATE INDEX "MedicalRecord_doctorId_idx" ON "MedicalRecord"("doctorId");

-- CreateIndex
CREATE INDEX "MedicalRecord_fasyankesId_idx" ON "MedicalRecord"("fasyankesId");

-- CreateIndex
CREATE INDEX "Service_fasyankesId_idx" ON "Service"("fasyankesId");

-- CreateIndex
CREATE INDEX "patients_nik_idx" ON "patients"("nik");

-- CreateIndex
CREATE INDEX "patients_ihsNumber_idx" ON "patients"("ihsNumber");

-- CreateIndex
CREATE INDEX "patients_phone_number_idx" ON "patients"("phone_number");

-- CreateIndex
CREATE INDEX "users_fasyankesId_role_idx" ON "users"("fasyankesId", "role");
