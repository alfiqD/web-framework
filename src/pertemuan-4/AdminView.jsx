import React, { useState } from 'react';
import servicesData from './services.json';

export default function AdminView() {
  /* --- 1. Inisialisasi State Best Practice --- */
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCat: "All",
    selectedStat: "All"
  });

  /* --- 2. Handle Change General --- */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  /* --- 3. Filtering Logic --- */
  const filtered = (servicesData || []).filter(item => {
    const matchesSearch = item.service_name.toLowerCase().includes(dataForm.searchTerm.toLowerCase());
    const matchesCat = dataForm.selectedCat === 'All' || item.category === dataForm.selectedCat;
    const matchesStat = dataForm.selectedStat === 'All' || item.status === dataForm.selectedStat;
    return matchesSearch && matchesCat && matchesStat;
  });

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden mb-12">
      {/* Header Panel */}
      <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-white">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
          <span className="w-2 h-8 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50"></span>
          Data Layanan SehatInfo
        </h2>
        <p className="text-slate-500 text-sm mt-2 ml-5">Manajemen inventaris layanan kesehatan (Admin Access).</p>
      </div>

      {/* Control Panel (Search & Filters) */}
      <div className="p-6 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white">
        <div className="md:col-span-2">
          <input 
            name="searchTerm"
            value={dataForm.searchTerm}
            type="text" 
            placeholder="Cari nama layanan..." 
            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all shadow-sm font-medium text-slate-700"
            onChange={handleChange}
          />
        </div>
        <select 
          name="selectedCat"
          value={dataForm.selectedCat}
          className="px-5 py-3.5 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all shadow-sm font-bold text-slate-600 cursor-pointer"
          onChange={handleChange}
        >
          <option value="All">Semua Kategori</option>
          <option value="Telemedicine">Telemedicine</option>
          <option value="Diagnostic">Diagnostic</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Therapy">Therapy</option>
          <option value="HomeCare">HomeCare</option>
        </select>
        <select 
          name="selectedStat"
          value={dataForm.selectedStat}
          className="px-5 py-3.5 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all shadow-sm font-bold text-slate-600 cursor-pointer"
          onChange={handleChange}
        >
          <option value="All">Semua Status</option>
          <option value="Available">Available</option>
          <option value="Non-Available">Non-Available</option>
          <option value="Limited">Limited</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto px-6 pb-8 md:px-8">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-widest font-black">
              <th className="px-5 py-3">Informasi Layanan</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Provider</th>
              <th className="px-5 py-3">Tarif</th>
              <th className="px-5 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <tr key={item.id} className="bg-white hover:bg-blue-50/50 transition-all duration-300 shadow-sm ring-1 ring-slate-200/60 rounded-2xl group">
                  <td className="px-5 py-4 rounded-l-2xl">
                    <p className="font-bold text-slate-800">{item.service_name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">ID: {item.id}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold shadow-sm border border-slate-200">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-bold text-slate-700">{item.provider.name}</div>
                    <div className="text-[11px] text-blue-500 font-semibold">{item.provider.hosp}</div>
                  </td>
                  <td className="px-5 py-4 font-black text-slate-800">
                    Rp {item.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-5 py-4 text-center rounded-r-2xl">
                    {/* Logika warna status di-update di sini */}
                    <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm border ${
                      item.status === 'Available' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : item.status === 'Limited'
                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : 'bg-red-50 text-red-600 border-red-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-16 text-slate-400 italic bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <span className="text-3xl block mb-2">📄</span>
                  Tidak ada layanan yang sesuai dengan filter Anda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}