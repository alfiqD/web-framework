import React, { useState } from 'react';
import servicesData from './services.json';

export default function AdminView() {
  const [dataForm, setDataForm] = useState({ searchTerm: "", selectedCat: "All", selectedStat: "All" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const filtered = (servicesData || []).filter(item => {
    const matchesSearch = item.service_name.toLowerCase().includes(dataForm.searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(dataForm.searchTerm.toLowerCase());
    const matchesCat = dataForm.selectedCat === 'All' || item.category === dataForm.selectedCat;
    const matchesStat = dataForm.selectedStat === 'All' || item.status === dataForm.selectedStat;
    return matchesSearch && matchesCat && matchesStat;
  });

  return (
    // Padding disamakan dengan GuestView (p-4 sm:p-8 lg:p-12)
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 lg:p-12 transition-all duration-500">
      
      {/* 1. Header Dashboard: Ukuran font disamakan persis dengan GuestView */}
      <div className="mb-10 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="font-black text-slate-800 tracking-tight transition-all 
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              Inventory Admin
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-lg lg:text-xl">
              Manajemen inventaris layanan kesehatan PCR Medika.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95">
            + Tambah Layanan
          </button>
        </div>
      </div>

      {/* 2. Control Panel: Layout disamakan agar transisinya mulus */}
      <div className="flex flex-col lg:flex-row gap-4 mb-12">
        <div className="w-full lg:flex-1">
          <input 
            name="searchTerm"
            value={dataForm.searchTerm}
            type="text" 
            placeholder="Cari nama atau ID..." 
            className="w-full px-6 py-4 rounded-2xl bg-white border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-lg"
            onChange={handleChange}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
          <select 
            name="selectedCat"
            value={dataForm.selectedCat}
            className="px-6 py-4 rounded-2xl bg-white border-none ring-1 ring-slate-200 font-bold text-slate-600 cursor-pointer shadow-sm min-w-[200px]"
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
            className="px-6 py-4 rounded-2xl bg-white border-none ring-1 ring-slate-200 font-bold text-slate-600 cursor-pointer shadow-sm"
            onChange={handleChange}
          >
            <option value="All">Semua Status</option>
            <option value="Available">Available</option>
            <option value="Non-Available">Non-Available</option>
            <option value="Limited">Limited</option>
          </select>
        </div>
      </div>

      {/* 3. Table Section: Tetap tabel tapi pakai container yang konsisten */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-900 text-slate-400 text-[11px] uppercase tracking-widest font-black">
                <th className="px-8 py-6">Informasi Layanan</th>
                <th className="px-8 py-6">Provider</th>
                <th className="px-8 py-6">Tarif</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <p className="font-black text-slate-800 text-lg">{item.service_name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">ID: {item.id}</span>
                      <span className="text-[10px] font-bold text-yellow-500">★ {item.meta.rating}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm">
                    <div className="font-bold text-slate-700">{item.provider.name}</div>
                    <div className="text-[11px] text-slate-400 font-medium">{item.provider.hospital} • RM: {item.detail.room}</div>
                  </td>
                  <td className="px-8 py-6 font-black text-slate-800">
                    {item.price === 0 ? <span className="text-green-600">FREE</span> : `Rp ${item.price.toLocaleString('id-ID')}`}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border ${
                      item.status === 'Available' ? 'bg-green-50 text-green-700 border-green-200' 
                      : item.status === 'Limited' ? 'bg-amber-50 text-amber-600 border-amber-200'
                      : 'bg-red-50 text-red-600 border-red-200'
                    }`}>{item.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 hover:bg-white rounded-xl shadow-sm border border-slate-200 text-blue-600">Edit</button>
                      <button className="p-2 hover:bg-white rounded-xl shadow-sm border border-slate-200 text-red-500">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}