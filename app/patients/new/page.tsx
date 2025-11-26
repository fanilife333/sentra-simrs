import React, { useState } from "react";
import {
  useForm,
  FieldErrors,
  UseFormRegister,
  FieldError,
} from "react-hook-form";
// Untuk membuat file ini runnable, kita akan memuat Zod dan mengimpornya secara dummy.
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  User,
  Phone,
  Briefcase,
  Heart,
  AlertTriangle,
} from "lucide-react";

// =================================================================
// 1. ENUM DAN SKEMA PASIEN (Mocking external imports)
// =================================================================

/** ENUM untuk Jenis Kelamin */
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

/** ENUM untuk Status Pernikahan */
export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

/** ENUM untuk Hubungan Kontak Darurat */
export enum EmergencyRelation {
  SPOUSE = "SPOUSE",
  PARENT = "PARENT",
  CHILD = "CHILD",
  OTHER = "OTHER",
}

// Interface untuk data formulir (seharusnya datang dari skema Zod)
export interface NewPatientData {
  nik: string;
  ihsNumber: string | null;
  firstName: string;
  lastName: string | null;
  dateOfBirth: string; // Akan berupa string dari input type="date"
  gender: Gender;
  maritalStatus: MaritalStatus;
  bloodType: string | null;
  phoneNumber: string;
  email: string | null;
  address: string;
  insuranceProviderId: string;
  emergencyName: string;
  emergencyNumber: string;
  emergencyRelation: EmergencyRelation;
  privacyConsent: boolean;
}

// Skema Zod untuk Validasi
export const NewPatientSchema = z.object({
  nik: z.string().min(16, "NIK harus 16 digit.").max(16, "NIK harus 16 digit."),
  ihsNumber: z.string().optional().nullable(),
  firstName: z.string().min(2, "Nama Depan wajib diisi."),
  lastName: z.string().optional().nullable(),
  dateOfBirth: z.string().min(1, "Tanggal Lahir wajib diisi."),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Jenis Kelamin wajib dipilih." }),
  }),
  maritalStatus: z.nativeEnum(MaritalStatus, {
    errorMap: () => ({ message: "Status Pernikahan wajib dipilih." }),
  }),
  bloodType: z.string().optional().nullable(),
  phoneNumber: z
    .string()
    .min(10, "Nomor telepon tidak valid.")
    .max(15, "Nomor telepon terlalu panjang."),
  email: z.string().email("Format Email tidak valid.").optional().nullable(),
  address: z.string().min(10, "Alamat lengkap wajib diisi."),
  insuranceProviderId: z.string().uuid("Provider Asuransi wajib dipilih."),
  emergencyName: z.string().min(2, "Nama Kontak Darurat wajib diisi."),
  emergencyNumber: z.string().min(10, "Nomor Darurat tidak valid."),
  emergencyRelation: z.nativeEnum(EmergencyRelation, {
    errorMap: () => ({ message: "Hubungan Darurat wajib dipilih." }),
  }),
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, "Wajib menyetujui privasi."),
});

// =================================================================
// 2. DATA DUMMY (Untuk Provider Asuransi)
// =================================================================

const DUMMY_INSURANCE_PROVIDERS = [
  { id: "123e4567-e89b-12d3-a456-426614174000", name: "BPJS Kesehatan" },
  { id: "123e4567-e89b-12d3-a456-426614174001", name: "Asuransi Mandiri" },
  { id: "00000000-0000-0000-0000-000000000000", name: "Umum (Non-Asuransi)" },
];

// =================================================================
// 3. KOMPONEN FORMULIR REUSABLE
// =================================================================

interface FormFieldProps {
  label: string;
  name: keyof NewPatientData;
  type?: string;
  placeholder?: string;
  errors: FieldErrors<NewPatientData>;
  register: UseFormRegister<NewPatientData>;
  required?: boolean;
}

// Komponen Input Dasar
const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  errors,
  register,
  required = true,
}) => {
  const fieldError = errors[name];
  const isTextArea = type === "textarea";

  const InputComponent = isTextArea ? "textarea" : "input";

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <InputComponent
        id={name}
        // Pastikan type hanya diberikan ke tag <input>
        {...(!isTextArea ? { type } : {})}
        {...register(name, { valueAsDate: type === "date" })}
        placeholder={placeholder}
        rows={isTextArea ? 3 : undefined}
        className={`mt-1 block w-full rounded-lg border shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ${
          fieldError
            ? "border-red-500 ring-red-100 bg-red-50"
            : "border-gray-300 bg-white"
        }`}
      />
      {fieldError?.message && (
        <p className="mt-1 text-xs text-red-600 font-semibold flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {(fieldError as FieldError).message}
        </p>
      )}
    </div>
  );
};

// Komponen Select Dasar
const FormSelect: React.FC<
  FormFieldProps & { options: { value: string; label: string }[] }
> = ({ label, name, options, errors, register, required = true }) => {
  const fieldError = errors[name];

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        className={`mt-1 block w-full rounded-lg border shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none bg-white pr-8 transition duration-150 ${
          fieldError
            ? "border-red-500 ring-red-100 bg-red-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <option value="">Pilih...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {fieldError?.message && (
        <p className="mt-1 text-xs text-red-600 font-semibold flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {(fieldError as FieldError).message}
        </p>
      )}
    </div>
  );
};

// =================================================================
// 4. KOMPONEN UTAMA
// =================================================================

const NewPatientPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPatientData>({
    resolver: zodResolver(NewPatientSchema),
    defaultValues: {
      nik: "",
      ihsNumber: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: undefined, // undefined agar validasi Zod berjalan
      maritalStatus: undefined,
      bloodType: "",
      phoneNumber: "",
      email: "",
      address: "",
      insuranceProviderId: "",
      emergencyName: "",
      emergencyNumber: "",
      emergencyRelation: undefined,
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: NewPatientData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    // --- Pemrosesan Data sebelum API Call ---
    // Pastikan dateOfBirth diubah ke format yang diterima backend (misalnya ISO string)
    let dateOfBirthString: string = "";
    if (data.dateOfBirth) {
      // Asumsi data.dateOfBirth adalah string 'YYYY-MM-DD' dari input type="date"
      // Kita tambahkan T00:00:00.000Z untuk menghindari masalah zona waktu
      dateOfBirthString = data.dateOfBirth + "T00:00:00.000Z";
    }

    const payload = {
      ...data,
      dateOfBirth: dateOfBirthString,
      // Mengubah string kosong menjadi null untuk field opsional (sesuai Zod)
      ihsNumber: data.ihsNumber || null,
      lastName: data.lastName || null,
      bloodType: data.bloodType || null,
      email: data.email && data.email.trim() !== "" ? data.email : null,
    };
    // --- Akhir Pemrosesan Data ---

    try {
      // Dummy API call: Simulasi pengiriman data
      console.log("Data Pasien siap dikirim:", payload);

      // Simulasi delay API (2 detik)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulasi Sukses
      setSubmitMessage({
        type: "success",
        text: `Pasien ${data.firstName} berhasil didaftarkan dengan ID Pasien #98765.`,
      });
      reset(); // Reset form setelah sukses

      // Jika Anda ingin menguji Error, uncomment baris ini:
      // throw new Error("Nomor NIK sudah terdaftar.");
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitMessage({
        type: "error",
        text: `Gagal mendaftarkan pasien. Error: ${
          (error as Error).message || "Kesalahan jaringan."
        }`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Opsi Enum
  const genderOptions = [
    { value: Gender.MALE, label: "Laki-laki" },
    { value: Gender.FEMALE, label: "Perempuan" },
  ];

  const maritalStatusOptions = [
    { value: MaritalStatus.SINGLE, label: "Belum Menikah" },
    { value: MaritalStatus.MARRIED, label: "Menikah" },
    { value: MaritalStatus.DIVORCED, label: "Cerai Hidup" },
    { value: MaritalStatus.WIDOWED, label: "Cerai Mati" },
  ];

  const emergencyRelationOptions = [
    { value: EmergencyRelation.PARENT, label: "Orang Tua" },
    { value: EmergencyRelation.SPOUSE, label: "Pasangan" },
    { value: EmergencyRelation.CHILD, label: "Anak" },
    { value: EmergencyRelation.OTHER, label: "Lainnya" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          Pendaftaran Pasien Baru
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sistem Informasi Manajemen Rumah Sakit (SIMRS)
        </p>

        {/* Pesan Status Submit */}
        {submitMessage && (
          <div
            className={`p-4 rounded-xl mb-6 shadow-lg transition-all duration-300 flex items-center ${
              submitMessage.type === "success"
                ? "bg-green-100 text-green-800 border-l-4 border-green-500"
                : "bg-red-100 text-red-800 border-l-4 border-red-500"
            }`}
            role="alert"
          >
            {submitMessage.type === "success" ? (
              <Check className="h-6 w-6 mr-3" />
            ) : (
              <AlertTriangle className="h-6 w-6 mr-3" />
            )}
            <span className="font-medium">{submitMessage.text}</span>
          </div>
        )}

        {/* FORMULIR PASIEN BARU */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100"
        >
          {/* BAGIAN 1: INFORMASI DASAR */}
          <section className="border-b pb-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
              <User className="h-6 w-6 mr-2 text-blue-500" /> Data Diri Pasien
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <FormField
                label="NIK (Nomor Induk Kependudukan)"
                name="nik"
                errors={errors}
                register={register}
                placeholder="16 digit NIK"
              />
              <FormField
                label="Nomor IHS (Optional)"
                name="ihsNumber"
                errors={errors}
                register={register}
                required={false}
                placeholder="Contoh: 100090185"
              />
              <FormField
                label="Nama Depan"
                name="firstName"
                errors={errors}
                register={register}
                placeholder="Contoh: Budi"
              />
              <FormField
                label="Nama Belakang (Optional)"
                name="lastName"
                errors={errors}
                register={register}
                required={false}
                placeholder="Contoh: Santoso"
              />
              <FormField
                label="Tanggal Lahir"
                name="dateOfBirth"
                type="date"
                errors={errors}
                register={register}
              />
              <FormSelect
                label="Jenis Kelamin"
                name="gender"
                options={genderOptions}
                errors={errors}
                register={register}
              />
              <FormSelect
                label="Status Pernikahan"
                name="maritalStatus"
                options={maritalStatusOptions}
                errors={errors}
                register={register}
              />
              <FormField
                label="Golongan Darah (Optional)"
                name="bloodType"
                errors={errors}
                register={register}
                required={false}
                placeholder="Contoh: O atau AB"
              />
            </div>
          </section>

          {/* BAGIAN 2: KONTAK DAN ASURANSI */}
          <section className="border-b pb-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
              <Phone className="h-6 w-6 mr-2 text-blue-500" /> Kontak, Alamat &
              Asuransi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <FormField
                label="Nomor Telepon"
                name="phoneNumber"
                errors={errors}
                register={register}
                placeholder="Contoh: 081234567890"
              />
              <FormField
                label="Email (Optional)"
                name="email"
                errors={errors}
                register={register}
                type="email"
                required={false}
                placeholder="Contoh: budi@mail.com"
              />
            </div>
            <div className="mt-4">
              <FormField
                label="Alamat Lengkap"
                name="address"
                errors={errors}
                register={register}
                type="textarea"
                placeholder="Alamat lengkap pasien saat ini"
              />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <FormSelect
                label="Provider Asuransi"
                name="insuranceProviderId"
                options={DUMMY_INSURANCE_PROVIDERS.map((p) => ({
                  value: p.id,
                  label: p.name,
                }))}
                errors={errors}
                register={register}
              />
              {/* Field kosong untuk balancing layout */}
              <div></div>
            </div>
          </section>

          {/* BAGIAN 3: KONTAK DARURAT DAN PERSETUJUAN */}
          <section className="pb-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
              <Heart className="h-6 w-6 mr-2 text-blue-500" /> Darurat &
              Persetujuan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
              <FormField
                label="Nama Kontak Darurat"
                name="emergencyName"
                errors={errors}
                register={register}
              />
              <FormField
                label="Nomor Telepon Darurat"
                name="emergencyNumber"
                errors={errors}
                register={register}
              />
              <FormSelect
                label="Hubungan Darurat"
                name="emergencyRelation"
                options={emergencyRelationOptions}
                errors={errors}
                register={register}
              />
            </div>

            <div className="mt-8 flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="privacyConsent"
                  type="checkbox"
                  {...register("privacyConsent")}
                  className={`focus:ring-blue-500 h-5 w-5 text-blue-600 rounded shadow-sm cursor-pointer ${
                    errors.privacyConsent ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="ml-4 text-sm">
                <label
                  htmlFor="privacyConsent"
                  className="font-bold text-gray-800 cursor-pointer"
                >
                  Persetujuan Privasi Data Pasien
                </label>
                <p className="text-gray-600 mt-1">
                  Saya menyatakan bahwa semua data yang diisikan adalah benar
                  dan saya setuju data pasien ini diolah sesuai kebijakan
                  privasi SIMRS.
                </p>
                {errors.privacyConsent?.message && (
                  <p className="mt-2 text-xs text-red-600 font-semibold">
                    <AlertTriangle className="h-3 w-3 mr-1 inline-block" />
                    {errors.privacyConsent.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* TOMBOL SUBMIT */}
          <div className="pt-6 border-t flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto flex items-center justify-center py-3 px-8 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white transition duration-300 transform hover:scale-[1.01] ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Mendaftarkan...
                </>
              ) : (
                "Daftarkan Pasien Baru"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPatientPage;
