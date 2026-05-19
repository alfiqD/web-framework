export default function StatusBadge({ status }) {
  // Kamus warna yang disesuaikan persis dengan gambar dashboard-mu
  const styles = {
    // --- Model Warna Solid (Dari tabel utama) ---
    "Delivered": "bg-[#00B69B] text-white",
    "Progressed": "bg-purple-600 text-white",
    "In Progress": "bg-pink-100 text-pink-600",

    // --- Model Warna Soft (Dari gambar Completed/Pending/Cancelled) ---
    "Completed": "bg-teal-100 text-teal-600",
    "Pending": "bg-purple-100 text-purple-600",
    "Cancelled": "bg-red-100 text-red-500",

    // --- Model Warna Soft (Dari gambar Gold/Silver/Bronze) ---
    "Gold": "bg-teal-100 text-teal-600",
    "Silver": "bg-purple-100 text-purple-600",
    "Bronze": "bg-orange-100 text-orange-500",
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}