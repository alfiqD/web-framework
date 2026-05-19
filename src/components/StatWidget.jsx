export default function StatWidget({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center w-full">
      <div>
        <p className="text-sm font-semibold text-gray-400 mb-1.5">{title}</p>
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
      </div>
      {/* Bentuk diubah menjadi kotak dengan sudut melengkung (rounded-2xl) dan warna merah marun */}
      <div className="w-14 h-14 bg-gray-50 text-[#B01030] rounded-2xl flex items-center justify-center text-2xl font-black">
        {icon}
      </div>
    </div>
  );
}