import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { MdOutlineAutoAwesome } from "react-icons/md";

export default function ErrorPage({ errorCode, title, breadcrumb }) {
  return (
    <div id="error-container" className="p-2 md:p-4">
      {/* PageHeader otomatis mengikuti tema yang sudah kita buat */}
      <PageHeader 
         title={errorCode === "404" ? "Page Not Found" : `Error ${errorCode}`} 
         breadcrumb={breadcrumb || ["Dashboard", `Error ${errorCode}`]}
      />

      <div className="mt-4 bg-white rounded-[2.5rem] shadow-sm border border-pink-50 p-10 md:p-20 flex flex-col md:flex-row items-center justify-between min-h-[65vh] relative overflow-hidden text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-100/50 cursor-default">
        
        {/* Sisi Kiri: Teks */}
        <div className="flex flex-col items-start z-10 md:w-1/2 space-y-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight font-poppins mb-4">
              {title}
            </h1>
            <p className="text-gray-400 font-medium text-lg">
              Oops! Looks like you've wandered into the wrong treatment room. Let's get you back to the lobby.
            </p>
          </div>
          <Link
            to="/"
            className="bg-[#E17887] hover:bg-[#d06172] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-md shadow-pink-200/50 hover:-translate-y-1 uppercase tracking-wider text-center"
          >
            Back To Home
          </Link>
        </div>

        {/* Sisi Kanan: Angka Error Pastel */}
        <div className="md:w-1/2 flex justify-center mt-16 md:mt-0 relative z-10 select-none">
          <div className="text-[160px] md:text-[220px] font-extrabold text-[#FFE4E6] drop-shadow-md leading-none tracking-tighter hover:scale-105 transition-transform duration-500">
            {errorCode}
          </div>
        </div>
        
        {/* Dekorasi Tema Beauty: Bintang & Titik Pastel */}
        <MdOutlineAutoAwesome className="absolute top-12 right-16 text-[#FCA5A5] opacity-20 text-8xl transform rotate-12" />
        
        <div className="absolute bottom-12 left-12 grid grid-cols-3 gap-3 opacity-60">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              // Selang-seling warna pink dan mint untuk titik-titiknya
              className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-[#FFE4E6]' : 'bg-[#D4F3E6]'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}