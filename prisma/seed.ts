import { 
  PrismaClient,
  Role, 
  UserStatus, 
  Gender, 
  AppointmentStatus, 
  AppointmentType, 
  MedicalRecordStatus,
  MaritalStatus,
  EmergencyRelation,
  BillStatus,
  PaymentMethod 
} from '@prisma/client'

// Inisialisasi Prisma Client
const prisma = new PrismaClient()

// --- DATA KONSTAN & DUMMY ---
const PASSWORD_HASH = '$2a$10$wL4P8jX6S4.S9iA4bB3q2O0Z.n0d6f4R8gH7kI0lM2oP3qR4sT5uV6wY7z8A' 
const FASYANKES_ORG_ID = '01000000' 
const PATIENT_IHS_NUMBER = '100001859002000002' 

async function main() {
  console.log(`\n--- START SEEDING FOR SENTRA SIMRS (FINAL SCHEMA) ---`)
  
  // ===========================================
  // 1. CLEAR DATA
  // ===========================================
  
  await prisma.paymentRecord.deleteMany()
  await prisma.billItem.deleteMany()
  await prisma.bill.deleteMany()
  
  await prisma.service.deleteMany()
  await prisma.medicalRecord.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.medicalHistory.deleteMany()
  await prisma.allergy.deleteMany()
  await prisma.rating.deleteMany()
  await prisma.auditLog.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.insuranceProvider.deleteMany()
  await prisma.workingDay.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.staff.deleteMany()
  await prisma.fasyankes.deleteMany()
  console.log('✅ Existing relational data cleared (using new Billing/Payment models).')

  // ===========================================
  // 2. CORE ENTITIES (FASYANKES, STAFF, DOCTOR, PROVIDER)
  // ===========================================

  // 2.1. FASYANKES (Organisasi)
  const fasyankes = await prisma.fasyankes.create({
    data: {
      name: 'RS Sentra Medika Utama',
      organizationId: FASYANKES_ORG_ID,
      address: 'Jl. Merdeka No. 45, Kota Bandung',
      phone: '022-87654321',
    },
  })
  console.log(`✅ Fasyankes created: ${fasyankes.name}`)
  
  // 2.2. INSURANCE PROVIDER
  const bpjs = await prisma.insuranceProvider.create({
    data: {
      name: 'BPJS Kesehatan',
      contact: '1500400',
    }
  })
  console.log(`✅ Insurance Provider created: ${bpjs.name}`)


  // 2.3. STAFF: DOKTER
  const doctorStaff = await prisma.staff.create({
    data: {
      firstName: 'Dr. Budi',
      lastName: 'Santoso',
      email: 'budi.santoso@sentra.com',
      passwordHash: PASSWORD_HASH,
      role: Role.DOCTOR,
      status: UserStatus.ACTIVE,
      phone: '08123000111',
      department: 'Umum',
      licenseNumber: '445/001/UMUM/2025',
      fasyankesId: fasyankes.id,
    },
  })
  console.log(`✅ Staff (Doctor Role) created: ${doctorStaff.email}`)

  // 2.4. DOCTOR PROFILE (Buat profil Dokter klinis menggunakan ID Staff)
  const doctorProfile = await prisma.doctor.create({
    data: {
      specialization: 'Dokter Umum',
      staffId: doctorStaff.id,
    }
  })
  console.log(`✅ Doctor Profile created (Specialization: ${doctorProfile.specialization})`)

  // 2.5. WORKING DAY 
  await prisma.workingDay.create({
    data: {
      dayOfWeek: 'Monday',
      startTime: '08:00',
      closeTime: '16:00',
      doctorId: doctorProfile.id,
    }
  })
  console.log('✅ Doctor Working Day created (Monday 08:00-16:00)')


  // 2.6. STAFF: ADMIN
  await prisma.staff.create({
    data: {
      firstName: 'Admin',
      lastName: 'Pusat',
      email: 'admin@sentra.com',
      passwordHash: PASSWORD_HASH,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      fasyankesId: fasyankes.id,
    },
  })
  console.log(`✅ Staff (Admin Role) created: admin@sentra.com`)

  // ===========================================
  // 3. PATIENT & RIWAYAT MEDIS
  // ===========================================

  // 3.1. PATIENT 
  const patient = await prisma.patient.create({
    data: {
      nik: '3273011234567890', 
      ihsNumber: PATIENT_IHS_NUMBER, 
      firstName: 'Dewi',
      lastName: 'Sartika',
      dateOfBirth: new Date('1990-05-15'),
      gender: Gender.FEMALE,
      
      maritalStatus: MaritalStatus.MARRIED,
      bloodType: 'A+',
      imageURL: null, 
      
      address: 'Jl. Sudirman No. 10',
      phoneNumber: '081234567890',
      email: 'dewi.sartika@example.com',
      
      emergencyName: 'Bambang Sudiro',
      emergencyNumber: '081987654321',
      emergencyRelation: EmergencyRelation.SPOUSE,
      
      privacyConsent: true,
      
      serviceConsent: true,
      medicalConsent: true,
      colorCode: '#FF5733', 
      
      insuranceProviderId: bpjs.id, 
    }
  })
  console.log(`✅ Patient created: ${patient.firstName}`)

  // 3.2. RIWAYAT MEDIS (Alergi & Riwayat Kondisi)
  await prisma.allergy.create({
    data: {
      patientId: patient.id,
      name: 'Alergi Obat: Amoxicillin',
      severity: 'High',
    }
  })

  await prisma.medicalHistory.create({
    data: {
      patientId: patient.id,
      condition: 'Asthma (Controlled)',
      diagnosisDate: new Date('2015-10-01'),
      notes: 'Rutin menggunakan inhaler.',
    }
  })
  console.log('✅ Patient medical history and allergy created.')

  // ===========================================
  // 4. APPOINTMENT & MEDICAL RECORD (ENCOUNTER)
  // ===========================================

  // 4.1. APPOINTMENT
  const appointment = await prisma.appointment.create({
    data: {
      dateTime: new Date('2025-11-25T10:00:00Z'),
      status: AppointmentStatus.COMPLETED,
      type: AppointmentType.ONSITE,
      patientId: patient.id,
      doctorId: doctorProfile.id, 
      reason: "Flu dan batuk",
    }
  })
  
  // 4.2. MEDICAL RECORD (Encounter)
  const medicalRecord = await prisma.medicalRecord.create({
    data: {
      encounterId: 'ENC1234567890', 
      date: new Date('2025-11-25T10:30:00Z'),
      status: MedicalRecordStatus.FINAL,
      chiefComplaint: 'Demam dan sakit tenggorokan sejak 2 hari.',
      diagnosis: 'J02.9 - Faringitis Akut', 
      treatmentPlan: 'Obat simptomatik dan istirahat total.',
      notes: 'Pasien diberikan edukasi dan resep antibiotik.',
      
      patientId: patient.id,
      doctorId: doctorProfile.id, 
      fasyankesId: fasyankes.id,
      appointmentId: appointment.id,
    }
  })
  console.log(`✅ Medical Record created (Encounter ID: ${medicalRecord.encounterId})`)
  
  // 4.3. DIAGNOSIS
  await prisma.diagnosis.create({
    data: {
      medicalRecordId: medicalRecord.id,
      doctorId: doctorProfile.id,
      symptoms: 'Sakit tenggorokan parah, demam 38.5C.',
      diagnosisCode: 'J02.9',
      diagnosisDescription: 'Acute pharyngitis, unspecified.',
      prescribedMedications: 'Amoxicillin 500mg (3x1), Paracetamol 500mg (3x1).',
      followUpPlan: 'Kontrol dalam 3 hari atau jika kondisi memburuk.',
    }
  })
  console.log('✅ Detail Diagnosis created.')
  
  // ===========================================
  // 5. SERVICES & BILLING
  // ===========================================

  // 5.1. SERVICE
  const serviceKonsultasi = await prisma.service.create({
    data: {
      name: 'Konsultasi Dokter Umum',
      code: 'KDU001',
      price: 50000.00,
      description: 'Layanan konsultasi dan diagnosis oleh dokter umum.',
      fasyankesId: fasyankes.id,
    }
  })
  
  const unitCost = serviceKonsultasi.price
  const quantity = 1
  const totalAmount = unitCost * quantity

  // 5.2. BILL
  const bill = await prisma.bill.create({
    data: {
      patientId: patient.id,
      medicalRecordId: medicalRecord.id,
      billDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      receiptNumber: `RCPT-${Date.now()}`,
      subtotal: totalAmount,
      discountAmount: 0.0,
      totalAmount: totalAmount,
      status: BillStatus.FULL_PAID,
    }
  })
  console.log(`✅ Bill created (Receipt: ${bill.receiptNumber})`)

  // 5.3. BILL ITEM
  await prisma.billItem.create({
    data: {
      billId: bill.id,
      serviceId: serviceKonsultasi.id,
      medicalRecordId: medicalRecord.id,
      quantity: quantity,
      unitCost: unitCost,
      totalCost: totalAmount,
    }
  })
  console.log('✅ Bill Item created.')

  // 5.4. PAYMENT RECORD 
  await prisma.paymentRecord.create({
    data: {
      billId: bill.id,
      amountPaid: totalAmount,
      paymentMethod: PaymentMethod.TRANSFER,
      referenceNumber: `TRX-${Date.now()}`,
    }
  })
  console.log('✅ Payment Record created.')

  console.log(`\n--- SEEDING COMPLETE ---`)
}

main()
  .catch((e) => {
    console.error("FATAL: Seeding failed with error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })