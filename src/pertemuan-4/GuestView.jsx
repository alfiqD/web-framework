import React, { useState } from 'react';
import servicesData from './services.json';

export default function GuestView() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All'); // Filter 1: Kategori
  const [filterStat, setFilterStat] = useState('All'); // Filter 2: Status

  // Logika Filter & Search
  const filtered = (servicesData || []).filter(i => {
    const matchesSearch = i.service_name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === 'All' || i.category === filterCat;
    const matchesStat = filterStat === 'All' || i.status === filterStat;
    return matchesSearch && matchesCat && matchesStat;
  });

  return (
    <div className="bg-slate-50 rounded-3xl p-6 md:p-10 border border-dashed border-slate-300">
      {/* Header & Deskripsi */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-2 justify-center md:justify-start">
          <span className="p-2 bg-blue-100 rounded-lg">🏥</span> 
          Tampilan Guest (Katalog Layanan)
        </h2>
        <p className="text-slate-500 text-sm">Temukan layanan kesehatan terbaik untuk kebutuhan Anda.</p>
      </div>

      {/* Search & Filter Bar - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="md:col-span-2 relative group">
          <input 
            type="text" 
            placeholder="Mau cari layanan apa hari ini?" 
            className="w-full pl-5 pr-5 py-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 shadow-lg shadow-blue-900/5 outline-none transition-all bg-white"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select 
          className="p-4 rounded-2xl border-none ring-1 ring-slate-200 bg-white shadow-sm outline-none font-bold text-slate-600 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilterCat(e.target.value)}
        >
          <option value="All">Semua Kategori</option>
          <option value="Telemedicine">Telemedicine</option>
          <option value="Diagnostic">Diagnostic</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Therapy">Therapy</option>
        </select>

        <select 
          className="p-4 rounded-2xl border-none ring-1 ring-slate-200 bg-white shadow-sm outline-none font-bold text-slate-600 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilterStat(e.target.value)}
        >
          <option value="All">Status (Semua)</option>
          <option value="Available">Available</option>
          <option value="Limited">Limited</option>
          <option value="Non-Available">Non-Available</option>
        </select>
      </div>

      {/* Grid Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col group">
              {/* Gambar & Badge Status */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.meta.img} 
                  alt={item.service_name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg backdrop-blur-md ${
                  item.status === 'Available' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                }`}>
                  {item.status}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-blue-600">
                  {item.category}
                </div>
              </div>

              {/* Konten Card */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  <span className="text-xs font-black">⭐ {item.meta.rate}</span>
                  <span className="text-slate-300 text-[10px]">| Rating Pasien</span>
                </div>
                
                <h3 className="font-black text-slate-800 text-lg mb-2 leading-tight min-h-[3rem] line-clamp-2">
                  {item.service_name}
                </h3>
                
                <div className="space-y-1 mb-6">
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    📍 {item.provider.hosp}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    👨‍⚕️ {item.provider.name}
                  </p>
                </div>

                {/* Harga & Tombol */}
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mulai dari</span>
                    <span className="text-blue-700 font-black text-xl">
                      {item.price === 0 ? "FREE" : `Rp${item.price.toLocaleString('id-ID')}`}
                    </span>
                  </div>
                  
                  <button 
                    disabled={item.status !== 'Available'}
                    className={`p-3 rounded-2xl transition-all shadow-md ${
                      item.status === 'Available' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {item.status === 'Available' ? '🚀' : '❌'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="text-6xl mb-4 text-slate-200">🔍</div>
            <h3 className="text-xl font-bold text-slate-400 italic">Duh, layanannya tidak ada...</h3>
            <p className="text-slate-300">Coba kata kunci lain atau reset filter Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}