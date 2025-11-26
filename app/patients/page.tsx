import React, { useState, useEffect } from "react";

// Tipe data yang sesuai dengan respons dari GET /api/patients
interface PatientData {
  id: string;
  nik: string;
  ihsNumber: string | null;
  firstName: string;
  lastName: string | null;
  dateOfBirth: string; // Akan berupa string ISO Date
  gender: "MALE" | "FEMALE";
  phoneNumber: string;
  address: string;
  insuranceProvider: {
    name: string;
  } | null;
}

// Komponen utama halaman Pasien
const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data pasien dari API
  const fetchPatients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Panggil API Route yang sudah kita buat
      const response = await fetch("/api/patients");

      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const result = await response.json();
      setPatients(result.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Gagal memuat daftar pasien. Silakan cek koneksi server.");
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil fungsi fetch saat komponen pertama kali dimuat
  useEffect(() => {
    fetchPatients();
  }, []);

  // Format tanggal lahir menjadi format yang lebih mudah dibaca (DD MMMM YYYY)
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString; // Kembali ke string aslinya jika parsing gagal
    }
  };

  // --- RENDERING UI ---

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Daftar Pasien</h1>
        <button
          onClick={() => alert("Fitur tambah pasien akan segera dibuat!")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          + Pasien Baru
        </button>
      </div>

      {/* Menampilkan Status Loading */}
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
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
          <span className="text-lg text-gray-600">Memuat data pasien...</span>
        </div>
      )}

      {/* Menampilkan Pesan Error */}
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4"
          role="alert"
        >
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Tabel Data Pasien */}
      {!isLoading && patients.length > 0 && (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Lengkap
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NIK / IHS Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tgl. Lahir / Jenis Kel.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asuransi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontak
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {patient.firstName} {patient.lastName}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {patient.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">
                        {patient.nik}
                      </div>
                      <div className="text-xs text-gray-500">
                        IHS: {patient.ihsNumber || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(patient.dateOfBirth)}
                      </div>
                      <div
                        className={`text-xs font-semibold ${
                          patient.gender === "MALE"
                            ? "text-blue-500"
                            : "text-pink-500"
                        }`}
                      >
                        {patient.gender === "MALE" ? "Laki-laki" : "Perempuan"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          patient.insuranceProvider
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {patient.insuranceProvider?.name || "UMUM"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href={`/patients/${patient.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Lihat Detail
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Status Data Kosong */}
      {!isLoading && patients.length === 0 && !error && (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-600 mb-2">
            Belum ada data pasien.
          </p>
          <p className="text-gray-500">
            Silakan tambahkan pasien baru untuk mulai mengelola SIMRS Anda.
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
