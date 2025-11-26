import { z } from 'zod';
import { Gender, MaritalStatus, EmergencyRelation } from '@prisma/client';

// Helper function untuk memeriksa NIK 16 digit
const nikSchema = z.string()
  .min(16, "NIK harus 16 digit.")
  .max(16, "NIK harus 16 digit.")
  .regex(/^[0-9]+$/, "NIK harus berupa angka.")

// Zod Schema untuk validasi data saat membuat pasien baru (Create Patient)
export const NewPatientSchema = z.object({
  // --- INFORMASI DASAR ---
  nik: nikSchema, // Menggunakan skema NIK yang sudah didefinisikan
  ihsNumber: z.string().optional().nullable(),
  firstName: z.string().min(2, "Nama depan minimal 2 karakter."),
  lastName: z.string().optional().nullable(),
  // Date of Birth akan dikirim sebagai string, lalu di-cast menjadi Date di server
  dateOfBirth: z.string().min(1, "Tanggal lahir wajib diisi.")
    .refine((val) => !isNaN(new Date(val).getTime()), { // Memastikan string bisa diubah jadi Date
      message: "Format tanggal lahir tidak valid."
    }),
  
  // Menggunakan enum dari Prisma. Mengganti objek konfigurasi yang bermasalah.
  gender: z.nativeEnum(Gender, {
    message: "Jenis kelamin wajib diisi dan harus valid."
  }),
  maritalStatus: z.nativeEnum(MaritalStatus, {
    message: "Status pernikahan wajib diisi dan harus valid."
  }),
  bloodType: z.string().optional().nullable(),
  
  // --- KONTAK DAN ALAMAT ---
  address: z.string().min(5, "Alamat wajib diisi."),
  phoneNumber: z.string().min(8, "Nomor telepon minimal 8 digit."),
  email: z.string().email("Format email tidak valid.").optional().nullable().or(z.literal('')),
  
  // --- KONTAK DARURAT ---
  emergencyName: z.string().min(2, "Nama kontak darurat wajib diisi."),
  emergencyNumber: z.string().min(8, "Nomor darurat wajib diisi."),
  emergencyRelation: z.nativeEnum(EmergencyRelation, {
    message: "Hubungan darurat wajib diisi dan harus valid."
  }),
  
  // --- ASURANSI & PERSETUJUAN ---
  // insuranceProviderId harus berupa UUID string
  insuranceProviderId: z.string().uuid("ID provider asuransi tidak valid."), 
  
  // PERBAIKAN AKHIR UNTUK MENGHILANGKAN ERROR invalid_type_error DI TYPESCRIPT
  // Kita gunakan z.boolean() polos, lalu refine untuk validasi nilainya harus TRUE
  privacyConsent: z.boolean().refine(val => val === true, {
    // Pesan ini akan muncul jika nilainya adalah FALSE, atau jika tipe datanya bukan boolean (seringkali Zod menangani type error tanpa perlu invalid_type_error di sini)
    message: "Persetujuan privasi wajib dicentang.",
  }),
  
  // Semua field yang opsional di database harus menggunakan .optional().nullable()
});

// Zod juga bisa digunakan untuk membuat tipe TypeScript dari skema
export type NewPatientData = z.infer<typeof NewPatientSchema>;