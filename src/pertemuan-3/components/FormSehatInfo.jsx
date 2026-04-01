import React, { useState } from "react";

// ==========================================
// 1. REUSABLE COMPONENTS
// ==========================================

// Komponen Reusable untuk Input Text/Number
const InputField = ({ label, name, type = "text", value, onChange, placeholder, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {/* Conditional Rendering untuk Pesan Error */}
      {error && <p className="text-red-500 text-sm mt-1 bg-red-50 p-1 rounded">⚠️ {error}</p>}
    </div>
  );
};

// Komponen Reusable untuk Select Dropdown
const SelectField = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
        }`}
      >
        <option value="">-- Pilih {label} --</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1 bg-red-50 p-1 rounded">⚠️ {error}</p>}
    </div>
  );
};


// ==========================================
// 2. MAIN COMPONENT
// ==========================================

export default function FormSehatInfo() {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    nama: "",
    umur: "",
    beratBadan: "",
    golDarah: "",
    aktivitas: "",
  });

  const [errors, setErrors] = useState({
    nama: "Nama wajib diisi", // Inisialisasi awal agar tombol submit disembunyikan
    umur: "Umur wajib diisi",
    beratBadan: "Berat badan wajib diisi",
    golDarah: "Golongan darah wajib dipilih",
    aktivitas: "Tingkat aktivitas wajib dipilih",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- VALIDATION LOGIC ---
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "nama":
        if (!value.trim()) errorMsg = "Nama wajib diisi.";
        else if (value.length < 3) errorMsg = "Nama minimal 3 karakter.";
        else if (/\d/.test(value)) errorMsg = "Nama tidak boleh mengandung angka.";
        break;

      case "umur":
        if (!value) errorMsg = "Umur wajib diisi.";
        else if (isNaN(value)) errorMsg = "Umur harus berupa angka.";
        else if (Number(value) < 17 || Number(value) > 100) errorMsg = "Umur harus antara 17 - 100 tahun.";
        break;

      case "beratBadan":
        if (!value) errorMsg = "Berat badan wajib diisi.";
        else if (isNaN(value)) errorMsg = "Berat badan harus berupa angka.";
        else if (Number(value) <= 20) errorMsg = "Berat badan tidak valid (terlalu ringan).";
        break;

      case "golDarah":
        if (!value) errorMsg = "Golongan darah wajib dipilih.";
        break;

      case "aktivitas":
        if (!value) errorMsg = "Tingkat aktivitas wajib dipilih.";
        break;

      default:
        break;
    }

    return errorMsg;
  };

  // --- EVENT HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update state form data
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validasi field yang sedang diubah dan update state error
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
    
    // Reset status submit jika user mengubah data lagi
    setIsSubmitted(false); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // --- CHECK FORM VALIDITY ---
  // Form dianggap valid jika semua value error adalah string kosong ("")
  const isFormValid = Object.values(errors).every((err) => err === "");

  // --- DATA OPTIONS UNTUK SELECT ---
  const golDarahOptions = [
    { value: "A", label: "Golongan Darah A" },
    { value: "B", label: "Golongan Darah B" },
    { value: "AB", label: "Golongan Darah AB" },
    { value: "O", label: "Golongan Darah O" },
  ];

  const aktivitasOptions = [
    { value: "Jarang", label: "Jarang (Tidak/sedikit olahraga)" },
    { value: "Sedang", label: "Sedang (Olahraga 1-3 hari/minggu)" },
    { value: "Sering", label: "Sering (Olahraga keras 6-7 hari/minggu)" },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Profil Pengguna SehatInfo
      </h2>

      <form onSubmit={handleSubmit}>
        {/* 3 INPUTAN TEXT/NUMBER */}
        <InputField
          label="Nama Lengkap"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Masukkan nama anda"
          error={errors.nama && formData.nama !== undefined ? errors.nama : ""}
        />

        <InputField
          label="Umur (Tahun)"
          name="umur"
          type="number"
          value={formData.umur}
          onChange={handleChange}
          placeholder="Contoh: 25"
          error={errors.umur}
        />

        <InputField
          label="Berat Badan (Kg)"
          name="beratBadan"
          type="number"
          value={formData.beratBadan}
          onChange={handleChange}
          placeholder="Contoh: 65"
          error={errors.beratBadan}
        />

        {/* 2 SELECT DROPDOWN */}
        <SelectField
          label="Golongan Darah"
          name="golDarah"
          value={formData.golDarah}
          onChange={handleChange}
          options={golDarahOptions}
          error={errors.golDarah}
        />

        <SelectField
          label="Tingkat Aktivitas Fisik"
          name="aktivitas"
          value={formData.aktivitas}
          onChange={handleChange}
          options={aktivitasOptions}
          error={errors.aktivitas}
        />

        {/* CONDITIONAL RENDERING: TOMBOL SUBMIT */}
        {/* Tombol hanya muncul jika variabel isFormValid bernilai true */}
        {isFormValid ? (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Simpan Profil
          </button>
        ) : (
          <div className="text-center text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
            *Lengkapi semua data dengan benar untuk memunculkan tombol simpan.
          </div>
        )}
      </form>

      {/* CONDITIONAL RENDERING: HASIL SETELAH SUBMIT */}
      {isSubmitted && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-bold text-green-700 mb-2">🎉 Profil Berhasil Disimpan!</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Nama:</strong> {formData.nama}</li>
            <li><strong>Umur:</strong> {formData.umur} Tahun</li>
            <li><strong>Berat Badan:</strong> {formData.beratBadan} Kg</li>
            <li><strong>Gol. Darah:</strong> {formData.golDarah}</li>
            <li><strong>Aktivitas:</strong> {formData.aktivitas}</li>
          </ul>
        </div>
      )}
    </div>
  );
}