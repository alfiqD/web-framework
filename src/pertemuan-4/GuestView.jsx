import React, { useState } from 'react';
import servicesData from './services.json';

export default function GuestView() {
  /* --- 1. State Management --- */
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCat: "All",
    selectedStat: "All"
  });

  /* --- 2. Handle Change --- */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  /* --- 3. Filtering Logic --- */
  const filtered = (servicesData || []).filter(item => {
    const matchesSearch = item.service_name.toLowerCase().includes(dataForm.searchTerm.toLowerCase());
    const matchesCat = dataForm.selectedCat === 'All' || item.category === dataForm.selectedCat;
    const matchesStat = dataForm.selectedStat === 'All' || item.status === dataForm.selectedStat;
    return matchesSearch && matchesCat && matchesStat;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 lg:p-12 transition-all duration-500">
      
      {/* 1. Header Responsif */}
      <div className="mb-10 text-center lg:text-left">
        <h2 className="font-black text-slate-800 tracking-tight transition-all 
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
          Katalog Pasien
        </h2>
        <p className="text-slate-500 font-medium text-sm md:text-lg lg:text-xl">
          Layanan kesehatan terbaik untuk komunitas PCR Medika. (Min: 3 Kolom | Max: 5 Kolom)
        </p>
      </div>

      {/* 2. Control Panel */}
      <div className="flex flex-col lg:flex-row gap-4 mb-12">
        <div className="w-full lg:flex-1">
          <input 
            name="searchTerm"
            value={dataForm.searchTerm}
            type="text" 
            placeholder="Cari layanan kesehatan..." 
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
            <option value="All">Status (Semua)</option>
            <option value="Available">Available</option>
            <option value="Non-Available">Non-Available</option>
            <option value="Limited">Limited</option>
          </select>
        </div>
      </div>

      {/* 3. Grid Logic (Min 3, Max 5) */}
      <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-8">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] p-3 md:p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col group">
              
              {/* Image Container */}
              <div className="relative h-32 sm:h-48 overflow-hidden rounded-[1.8rem] mb-4 bg-slate-100">
                <img 
                  src={item.meta.img} 
                  alt={item.service_name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" 
                />
                
                <div className={`absolute top-2 right-2 md:top-4 md:right-4 px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border ${
                  item.status === 'Available' ? 'bg-green-500 text-white' 
                  : item.status === 'Limited' ? 'bg-amber-500 text-white'
                  : 'bg-red-500 text-white'
                }`}>
                  {item.status}
                </div>
              </div>

              {/* Card Body */}
              <div className="px-1 pb-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] md:text-sm font-black text-yellow-500">★ {item.meta.rating}</span>
                    <span className="hidden md:inline-block text-[10px] text-slate-400 font-medium">({item.meta.total_reviews})</span>
                  </div>
                  <span className="text-[9px] md:text-[11px] bg-slate-50 text-blue-600 px-2 py-0.5 rounded-lg font-bold italic">
                    {item.id}
                  </span>
                </div>
                
                <h3 className="font-black text-slate-800 text-xs sm:text-lg md:text-xl mb-2 leading-tight min-h-[2.5rem] line-clamp-2">
                  {item.service_name}
                </h3>
                
                <div className="mb-4 space-y-1">
                  <p className="text-[10px] md:text-sm text-slate-700 font-bold flex flex-wrap items-center gap-1">
                    👨‍⚕️ {item.provider.name} 
                    <span className="hidden sm:inline text-[9px] font-medium text-slate-400 italic">({item.provider.experience})</span>
                  </p>
                  <p className="hidden sm:block text-[10px] md:text-xs text-slate-500 font-medium">
                    🏢 {item.provider.hospital}
                  </p>
                  <div className="bg-slate-50 rounded-xl p-2 mt-2 border border-slate-100 flex justify-between items-center text-[8px] md:text-[10px]">
                    <span className="text-slate-500 font-bold">📅 {item.detail.day}</span>
                    <span className="text-blue-600 font-black">📍 {item.detail.room}</span>
                  </div>
                </div>

                {/* Footer & Tombol Pintar */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex flex-col">
                    <span className="hidden md:block text-[9px] text-slate-400 font-black uppercase">Biaya</span>
                    <span className="text-slate-900 font-black text-xs sm:text-base md:text-xl">
                      {item.price === 0 ? "GRATIS" : `Rp${(item.price/1000)}k`}
                    </span>
                  </div>
                  
                  {/* LOGIKA TOMBOL DISINI */}
                  <button 
                    disabled={item.status !== 'Available'}
                    className={`px-3 py-2 md:px-5 md:py-2.5 rounded-xl transition-all shadow-lg font-bold text-[10px] md:text-sm ${
                      item.status === 'Available' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95 shadow-blue-500/20' 
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {item.status === 'Available' ? 'Pesan' : 'Penuh'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
             <h3 className="text-2xl font-bold text-slate-400">Layanan tidak ditemukan</h3>
          </div>
        )}
      </div>
    </div>
  );
}