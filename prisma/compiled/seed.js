"use strict";
// seed.ts yang sudah disempurnakan
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// ✅ PERBAIKAN: Impor dotenv dan path untuk memuat .env secara eksplisit
var dotenv = require("dotenv");
var path = require("path");
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
// --- END PERBAIKAN LOADING ENV ---
var client_1 = require("@prisma/client");
// Inisialisasi Prisma Client
var prisma = new client_1.PrismaClient();
// --- DATA KONSTAN & DUMMY ---
var PASSWORD_HASH = '$2a$10$wL4P8jX6S4.S9iA4bB3q2O0Z.n0d6f4R8gH7kI0lM2oP3qR4sT5uV6wY7z8A';
var FASYANKES_ORG_ID = '01000000';
var PATIENT_IHS_NUMBER = '100001859002000002';
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var fasyankes, bpjs, doctorUser, adminUser, patient, medicalRecord, serviceKonsultasi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\n--- START SEEDING FOR SENTRA SIMRS (FINAL SCHEMA) ---");
                    // 1. CLEAR DATA (Wajib untuk Development)
                    return [4 /*yield*/, prisma.billing.deleteMany()];
                case 1:
                    // 1. CLEAR DATA (Wajib untuk Development)
                    _a.sent();
                    return [4 /*yield*/, prisma.serviceRecord.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.service.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.medicalRecord.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.appointment.deleteMany()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.medicalHistory.deleteMany()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.allergy.deleteMany()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, prisma.patient.deleteMany()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, prisma.insuranceProvider.deleteMany()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, prisma.fasyankes.deleteMany()];
                case 11:
                    _a.sent();
                    console.log('✅ Existing relational data cleared.');
                    return [4 /*yield*/, prisma.fasyankes.create({
                            data: {
                                name: 'RS Sentra Medika Utama',
                                organizationId: FASYANKES_ORG_ID,
                                address: 'Jl. Merdeka No. 45, Kota Bandung',
                                phone: '022-87654321',
                            },
                        })];
                case 12:
                    fasyankes = _a.sent();
                    console.log("\u2705 Fasyankes created: ".concat(fasyankes.name));
                    return [4 /*yield*/, prisma.insuranceProvider.create({
                            data: {
                                name: 'BPJS Kesehatan',
                                contact: '1500400',
                            }
                        })];
                case 13:
                    bpjs = _a.sent();
                    console.log("\u2705 Insurance Provider created: ".concat(bpjs.name));
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                firstName: 'Dr. Budi',
                                lastName: 'Santoso',
                                email: 'budi.santoso@sentra.com',
                                passwordHash: PASSWORD_HASH,
                                role: client_1.Role.DOCTOR,
                                status: client_1.UserStatus.ACTIVE,
                                fasyankesId: fasyankes.id,
                            },
                        })];
                case 14:
                    doctorUser = _a.sent();
                    console.log("\u2705 User (Doctor) created: ".concat(doctorUser.email));
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                firstName: 'Admin',
                                lastName: 'Pusat',
                                email: 'admin@sentra.com',
                                passwordHash: PASSWORD_HASH,
                                role: client_1.Role.ADMIN,
                                status: client_1.UserStatus.ACTIVE,
                                fasyankesId: fasyankes.id,
                            },
                        })];
                case 15:
                    adminUser = _a.sent();
                    console.log("\u2705 User (Admin) created: ".concat(adminUser.email));
                    return [4 /*yield*/, prisma.patient.create({
                            data: {
                                nik: '3273011234567890',
                                ihsNumber: PATIENT_IHS_NUMBER,
                                firstName: 'Dewi',
                                lastName: 'Sartika',
                                dateOfBirth: new Date('1990-05-15'),
                                gender: client_1.Gender.FEMALE,
                                maritalStatus: client_1.MaritalStatus.MARRIED,
                                bloodType: 'A+',
                                imageURL: null,
                                address: 'Jl. Sudirman No. 10',
                                phoneNumber: '081234567890',
                                email: 'dewi.sartika@example.com',
                                emergencyName: 'Bambang Sudiro',
                                emergencyNumber: '081987654321',
                                emergencyRelation: client_1.EmergencyRelation.SPOUSE,
                                privacyConsent: true,
                                insuranceProviderId: bpjs.id,
                            }
                        })];
                case 16:
                    patient = _a.sent();
                    console.log("\u2705 Patient created: ".concat(patient.firstName));
                    // 3.2. RIWAYAT MEDIS (Alergi & Riwayat Kondisi)
                    // Variabel tidak perlu ditampung karena tidak digunakan lagi
                    return [4 /*yield*/, prisma.allergy.create({
                            data: {
                                patientId: patient.id,
                                name: 'Alergi Obat: Amoxicillin',
                                severity: 'High',
                            }
                        })];
                case 17:
                    // 3.2. RIWAYAT MEDIS (Alergi & Riwayat Kondisi)
                    // Variabel tidak perlu ditampung karena tidak digunakan lagi
                    _a.sent();
                    return [4 /*yield*/, prisma.medicalHistory.create({
                            data: {
                                patientId: patient.id,
                                condition: 'Asthma (Controlled)',
                                diagnosisDate: new Date('2015-10-01'),
                                notes: 'Rutin menggunakan inhaler.',
                            }
                        })];
                case 18:
                    _a.sent();
                    console.log('✅ Patient medical history and allergy created.');
                    // ===========================================
                    // 4. APPOINTMENT & MEDICAL RECORD (ENCOUNTER)
                    // ===========================================
                    // 4.1. APPOINTMENT
                    // ✅ PERBAIKAN: Gunakan await tanpa menampung variabel jika tidak digunakan lagi
                    return [4 /*yield*/, prisma.appointment.create({
                            data: {
                                dateTime: new Date('2025-11-25T10:00:00Z'),
                                status: client_1.AppointmentStatus.COMPLETED,
                                type: client_1.AppointmentType.ONSITE,
                                patientId: patient.id,
                                doctorId: doctorUser.id,
                            }
                        })
                        // 4.2. MEDICAL RECORD (Encounter)
                    ];
                case 19:
                    // ===========================================
                    // 4. APPOINTMENT & MEDICAL RECORD (ENCOUNTER)
                    // ===========================================
                    // 4.1. APPOINTMENT
                    // ✅ PERBAIKAN: Gunakan await tanpa menampung variabel jika tidak digunakan lagi
                    _a.sent();
                    return [4 /*yield*/, prisma.medicalRecord.create({
                            data: {
                                encounterId: 'ENC1234567890',
                                date: new Date('2025-11-25T10:30:00Z'),
                                status: client_1.MedicalRecordStatus.FINAL,
                                diagnosis: 'J02.9 - Faringitis Akut',
                                notes: 'Pasien diberikan edukasi dan resep antibiotik.',
                                patientId: patient.id,
                                doctorId: doctorUser.id,
                                fasyankesId: fasyankes.id,
                            }
                        })];
                case 20:
                    medicalRecord = _a.sent();
                    console.log("\u2705 Medical Record created (Encounter ID: ".concat(medicalRecord.encounterId, ")"));
                    return [4 /*yield*/, prisma.service.create({
                            data: {
                                name: 'Konsultasi Dokter Umum',
                                code: 'KDU001',
                                price: 50000.00,
                                description: 'Layanan konsultasi dan diagnosis oleh dokter umum.',
                                fasyankesId: fasyankes.id,
                            }
                        })
                        // 5.2. SERVICE RECORD (Terhubung ke Medical Record dan Service)
                        // Variabel tidak perlu ditampung karena tidak digunakan lagi
                    ];
                case 21:
                    serviceKonsultasi = _a.sent();
                    // 5.2. SERVICE RECORD (Terhubung ke Medical Record dan Service)
                    // Variabel tidak perlu ditampung karena tidak digunakan lagi
                    return [4 /*yield*/, prisma.serviceRecord.create({
                            data: {
                                quantity: 1,
                                subTotal: serviceKonsultasi.price,
                                serviceId: serviceKonsultasi.id,
                                medicalRecordId: medicalRecord.id, // Unik/1-to-1
                            }
                        })
                        // 5.3. BILLING (Terhubung ke Medical Record)
                        // Variabel tidak perlu ditampung karena tidak digunakan lagi
                    ];
                case 22:
                    // 5.2. SERVICE RECORD (Terhubung ke Medical Record dan Service)
                    // Variabel tidak perlu ditampung karena tidak digunakan lagi
                    _a.sent();
                    // 5.3. BILLING (Terhubung ke Medical Record)
                    // Variabel tidak perlu ditampung karena tidak digunakan lagi
                    return [4 /*yield*/, prisma.billing.create({
                            data: {
                                totalAmount: serviceKonsultasi.price,
                                status: client_1.PaymentStatus.PAID,
                                paymentMethod: client_1.PaymentMethod.TRANSFER,
                                medicalRecordId: medicalRecord.id, // Unik/1-to-1
                            }
                        })];
                case 23:
                    // 5.3. BILLING (Terhubung ke Medical Record)
                    // Variabel tidak perlu ditampung karena tidak digunakan lagi
                    _a.sent();
                    console.log('✅ Services and Billing successfully created.');
                    console.log("\n--- SEEDING COMPLETE ---");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error("FATAL: Seeding failed with error:", e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
