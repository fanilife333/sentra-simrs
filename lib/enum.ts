// lib/enums.ts

/**
 * =================================================================
 * DEFINISI ENUMS/KONSTANTA
 * File ini berisi konstanta dan daftar pilihan yang digunakan di banyak
 * bagian aplikasi (misalnya: Form Select Options).
 * =================================================================
 */

// 1. Pilihan Status Perkawinan (Marital Status)
export const MARITAL_STATUS_OPTIONS = [
  { value: 'SINGLE', label: 'Belum Menikah' },
  { value: 'MARRIED', label: 'Menikah' },
  { value: 'DIVORCED', label: 'Cerai Hidup' },
  { value: 'WIDOWED', label: 'Cerai Mati' },
];

// 2. Pilihan Jenis Kelamin (Gender)
export const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Laki-laki' },
  { value: 'FEMALE', label: 'Perempuan' },
];

// 3. Pilihan Golongan Darah (Blood Type)
export const BLOOD_TYPE_OPTIONS = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'AB', label: 'AB' },
  { value: 'O', label: 'O' },
  { value: 'UNKNOWN', label: 'Tidak Tahu' },
];

// 4. Pilihan Hubungan Darurat (Emergency Relation)
export const EMERGENCY_RELATION_OPTIONS = [
  { value: 'PARENT', label: 'Orang Tua' },
  { value: 'SPOUSE', label: 'Pasangan (Suami/Istri)' },
  { value: 'CHILD', label: 'Anak' },
  { value: 'SIBLING', label: 'Saudara Kandung' },
  { value: 'OTHER', label: 'Lainnya' },
];

// Anda juga bisa mendefinisikan Enums murni jika dibutuhkan, misalnya:
export enum AppointmentStatus {
    SCHEDULED = 'SCHEDULED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    NO_SHOW = 'NO_SHOW',
}