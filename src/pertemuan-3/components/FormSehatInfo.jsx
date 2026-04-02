import React, { useState } from "react";

// ==========================================
// 1. REUSABLE COMPONENTS
// ==========================================

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
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#1F65B8]"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1 bg-red-50 p-1.5 rounded-md">⚠️ {error}</p>}
    </div>
  );
};

const SelectField = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#1F65B8]"
        }`}
      >
        <option value="">-- Pilih {label} --</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1 bg-red-50 p-1.5 rounded-md">⚠️ {error}</p>}
    </div>
  );
};

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

export default function FormSehatInfo() {
  const [formData, setFormData] = useState({
    nama: "",
    umur: "",
    beratBadan: "",
    golDarah: "",
    aktivitas: "",
  });

  const [errors, setErrors] = useState({
    nama: "Nama wajib diisi", 
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
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
    
    setIsSubmitted(false); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const isFormValid = Object.values(errors).every((err) => err === "");

  // --- LOGIKA PERHITUNGAN (CALCULATION) ---
  const hitungKebutuhanAir = () => {
    const bb = Number(formData.beratBadan);
    let kebutuhanDasar = bb * 30; // 30ml per kilogram berat badan

    // Tambahan berdasarkan tingkat aktivitas
    if (formData.aktivitas === "Sedang") {
      kebutuhanDasar += 400; // Tambah 400ml
    } else if (formData.aktivitas === "Sering") {
      kebutuhanDasar += 800; // Tambah 800ml
    }

    // Ubah ke format Liter dengan 1 angka di belakang koma
    return (kebutuhanDasar / 1000).toFixed(1); 
  };

  // --- DATA OPTIONS ---
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-[#1E3C72] mb-6 text-center border-b pb-4">
        Profil Pengguna SehatInfo
      </h2>

      <form onSubmit={handleSubmit}>
        <InputField label="Nama Lengkap" name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama anda" error={errors.nama && formData.nama !== undefined ? errors.nama : ""} />
        <InputField label="Umur (Tahun)" name="umur" type="number" value={formData.umur} onChange={handleChange} placeholder="Contoh: 25" error={errors.umur} />
        <InputField label="Berat Badan (Kg)" name="beratBadan" type="number" value={formData.beratBadan} onChange={handleChange} placeholder="Contoh: 65" error={errors.beratBadan} />
        <SelectField label="Golongan Darah" name="golDarah" value={formData.golDarah} onChange={handleChange} options={golDarahOptions} error={errors.golDarah} />
        <SelectField label="Tingkat Aktivitas Fisik" name="aktivitas" value={formData.aktivitas} onChange={handleChange} options={aktivitasOptions} error={errors.aktivitas} />

        {isFormValid ? (
          <button
            type="submit"
            className="w-full bg-[#1E3C72] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#1F65B8] transition duration-300 shadow-md"
          >
            Simpan & Hitung Kebutuhan Air
          </button>
        ) : (
          <div className="text-center text-sm text-gray-500 bg-gray-50 border border-gray-200 p-3 rounded-lg">
            *Lengkapi semua data dengan benar untuk memunculkan tombol simpan.
          </div>
        )}
      </form>

      {/* HASIL SETELAH SUBMIT + PERHITUNGAN */}
      {isSubmitted && (
        <div className="mt-8 p-5 bg-blue-50 border-l-4 border-[#1F65B8] rounded-r-lg shadow-sm">
          <h3 className="text-lg font-bold text-[#1E3C72] mb-3">✅ Profil Berhasil Disimpan!</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4 bg-white p-3 rounded border border-blue-100">
            <span className="text-gray-500">Nama:</span> <span className="font-medium">{formData.nama}</span>
            <span className="text-gray-500">Umur:</span> <span className="font-medium">{formData.umur} Tahun</span>
            <span className="text-gray-500">Berat Badan:</span> <span className="font-medium">{formData.beratBadan} Kg</span>
            <span className="text-gray-500">Gol. Darah:</span> <span className="font-medium">{formData.golDarah}</span>
            <span className="text-gray-500">Aktivitas:</span> <span className="font-medium">{formData.aktivitas}</span>
          </div>
          
          {/* Box Hasil Perhitungan */}
          <div className="bg-[#1E3C72] text-white p-4 rounded-lg text-center shadow-inner">
            <p className="text-sm text-blue-100 mb-1">Target Air Putih Harianmu:</p>
            <p className="text-3xl font-extrabold">{hitungKebutuhanAir()} Liter</p>
            <p className="text-xs text-blue-200 mt-2">Dihitung berdasarkan {formData.beratBadan}kg berat badan dan rutinitas aktivitas.</p>
          </div>
        </div>
      )}
    </div>
  );
}