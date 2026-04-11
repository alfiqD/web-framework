import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminView from './AdminView';
import GuestView from './GuestView';
import "./tailwind.css"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="bg-[#f8fafc] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-200">
      <div className="max-w-[90rem] mx-auto">
        
        {/* Main Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 mb-4 tracking-tight">
            Dashboard SehatInfo
          </h1>
          <p className="text-slate-500 font-medium text-lg">Sistem Informasi Layanan Kesehatan Digital - Pertemuan 4</p>
        </div>

        {/* Admin Section */}
        <AdminView />

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-16 opacity-50">
          <div className="h-px bg-slate-300 w-full max-w-xs"></div>
          <span className="text-slate-400 font-black tracking-widest text-xs uppercase">Preview</span>
          <div className="h-px bg-slate-300 w-full max-w-xs"></div>
        </div>

        {/* Guest Section */}
        <GuestView />

        {/* Footer */}
        <footer className="mt-20 text-center text-sm font-medium text-slate-400 pb-10">
          &copy; {new Date().getFullYear()} Alfiq Debriliant. Dikerjakan dengan ❤️
        </footer>

      </div>
    </div>
  </React.StrictMode>,
)