import React, { useState } from 'react';
import servicesData from './services.json';

export default function AdminView() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All'); // Filter 1: Kategori
  const [filterStat, setFilterStat] = useState('All'); // Filter 2: Status

  // Logika Filter & Search Gabungan
  const filtered = (servicesData || []).filter(i => {
    const matchesSearch = i.service_name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === 'All' || i.category === filterCat;
    const matchesStat = filterStat === 'All' || i.status === filterStat;
    return matchesSearch && matchesCat && matchesStat;
  });

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-10">
      {/* Header Tabel */}
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          Manajemen Layanan (Admin Mode)
        </h2>
      </div>

      {/* Control Panel: Search & 2 Filters */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <input 
            type="text" 
            placeholder="Cari nama layanan..." 
            className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter 1: Kategori */}
        <select 
          className="p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-600 cursor-pointer shadow-sm"
          onChange={(e) => setFilterCat(e.target.value)}
        >
          <option value="All">Semua Kategori</option>
          <option value="Telemedicine">Telemedicine</option>
          <option value="Diagnostic">Diagnostic</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Therapy">Therapy</option>
          <option value="HomeCare">HomeCare</option>
        </select>

        {/* Filter 2: Status */}
        <select 
          className="p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-600 cursor-pointer shadow-sm"
          onChange={(e) => setFilterStat(e.target.value)}
        >
          <option value="All">Semua Status</option>
          <option value="Available">Available</option>
          <option value="Limited">Limited</option>
          <option value="Non-Available">Non-Available</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto px-6 pb-6">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold">
              <th className="px-4 py-3">Layanan</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Provider (Nested)</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <tr key={item.id} className="bg-white hover:bg-blue-50 transition-all group shadow-sm ring-1 ring-slate-100 rounded-lg">
                  <td className="px-4 py-4 rounded-l-xl font-bold text-slate-700">
                    {item.service_name}
                  </td>
                  <td className="px-4 py-4 text-slate-500">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[11px] font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-bold text-slate-700">{item.provider.name}</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase">{item.provider.hosp}</div>
                  </td>
                  <td className="px-4 py-4 font-mono font-bold text-blue-600">
                    Rp {item.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-4 text-center rounded-r-xl">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter ${
                      item.status === 'Available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-slate-400 italic bg-slate-50 rounded-2xl">
                  Data layanan tidak ditemukan...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}