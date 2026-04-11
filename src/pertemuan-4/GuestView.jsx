import React, { useState } from 'react';
import servicesData from './services.json';

export default function GuestView() {
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
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 rounded-[2.5rem] p-6 md:p-10 border border-slate-200/80 shadow-inner">
      
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Katalog Pasien</h2>
        <p className="text-slate-500 font-medium">Temukan layanan kesehatan terbaik dari PCR Medika.</p>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="md:col-span-2">
          <input 
            name="searchTerm"
            value={dataForm.searchTerm}
            type="text" 
            placeholder="Cari keluhan atau layanan..." 
            className="w-full px-6 py-4 rounded-2xl bg-white border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-medium text-slate-700"
            onChange={handleChange}
          />
        </div>
        <select 
          name="selectedCat"
          value={dataForm.selectedCat}
          className="px-6 py-4 rounded-2xl bg-white border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-bold text-slate-600 cursor-pointer"
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
          className="px-6 py-4 rounded-2xl bg-white border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-bold text-slate-600 cursor-pointer"
          onChange={handleChange}
        >
          <option value="All">Status (Semua)</option>
          <option value="Available">Available</option>
          <option value="Non-Available">Non-Available</option>
          <option value="Limited">Limited</option>
        </select>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col group">
              
              {/* Image Container with Badges */}
              <div className="relative h-48 overflow-hidden rounded-[1.5rem] mb-4 bg-slate-100">
                <img 
                  src={item.meta.img} 
                  alt={item.service_name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" 
                />
                
                {/* Status Badge (Diperbarui untuk 3 warna) */}
                <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg backdrop-blur-md border ${
                  item.status === 'Available' 
                    ? 'bg-green-500/90 text-white border-green-400/50' 
                    : item.status === 'Limited'
                    ? 'bg-amber-500/90 text-white border-amber-400/50'
                    : 'bg-red-500/90 text-white border-red-400/50'
                }`}>
                  {item.status}
                </div>
                
                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-700 shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="px-3 pb-3 flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-black text-yellow-500">★ {item.meta.rate}</span>
                  <span className="text-[10px] text-slate-400 font-medium">({item.detail.day}, {item.detail.time})</span>
                </div>
                
                <h3 className="font-black text-slate-800 text-[17px] mb-3 leading-snug line-clamp-2 min-h-[3rem]">
                  {item.service_name}
                </h3>
                
                <p className="text-[12px] text-slate-500 font-medium mb-6 flex-1">
                  Oleh <span className="text-blue-600 font-bold">{item.provider.name}</span>
                </p>

                {/* Footer Card */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Biaya</span>
                    <span className="text-slate-800 font-black text-lg">
                      {item.price === 0 ? "GRATIS" : `Rp${item.price.toLocaleString('id-ID')}`}
                    </span>
                  </div>
                  
                  {/* Tombol Action */}
                  <button 
                    disabled={item.status !== 'Available'}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                      item.status === 'Available' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30 active:scale-95' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {item.status === 'Available' ? 'Pesan' : 'Penuh'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <span className="text-5xl block mb-4">🩺</span>
            <h3 className="text-xl font-bold text-slate-600">Layanan tidak ditemukan</h3>
            <p className="text-slate-400 mt-2">Coba sesuaikan kata kunci pencarian atau filter Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}