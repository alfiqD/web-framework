import React from "react";
import PageHeader from "../components/PageHeader";
import { Spinner } from "@/components/ui/spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FiturShadcnui() {
  return (
    <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
      
      {/* --- PAGE HEADER & BREADCRUMB --- */}
      <PageHeader title="Fitur Shadcn UI" breadcrumb={["Dashboard", "Fitur Shadcn UI"]} />

      {/* --- MAIN CONTENT AREA --- */}
      <div className="px-8 mt-2">
        
        {/* CONTAINER UTAMA */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[600px] flex flex-col gap-8">
          
          <div>
            <h2 className="text-xl font-extrabold text-[#202224] mb-1">Koleksi Komponen Shadcn UI</h2>
            <p className="text-sm text-gray-400 font-medium">Daftar komponen interaktif yang diintegrasikan ke dalam sistem dasbor.</p>
          </div>

          {/* GRID LAYOUT UNTUK MEMISAHKAN KOMPONEN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 1. SECTION INPUT OTP */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-[#F5F6FA]/50 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-xs font-extrabold text-[#B01030] uppercase tracking-wider">Komponen 01</span>
                <h3 className="text-lg font-bold text-[#202224] mt-0.5">Input OTP</h3>
                <p className="text-xs text-gray-500 font-medium mt-1 mb-6 leading-relaxed">
                  Digunakan untuk memasukkan kode verifikasi/keamanan (One-Time Password) secara aman, seperti verifikasi login dokter atau akses data pasien kritis.
                </p>
              </div>
              <div className="flex justify-center items-center py-2 bg-white rounded-xl border border-gray-100/50 p-4 shadow-sm">
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* 2. SECTION SPINNER */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-[#F5F6FA]/50 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-xs font-extrabold text-[#B01030] uppercase tracking-wider">Komponen 02</span>
                <h3 className="text-lg font-bold text-[#202224] mt-0.5">Spinner Loading</h3>
                <p className="text-xs text-gray-500 font-medium mt-1 mb-6 leading-relaxed">
                  Indikator visual yang menandakan sistem sedang memproses data, seperti saat memuat rekam medis pasien atau mengunduh laporan keuangan.
                </p>
              </div>
              <div className="flex justify-center items-center py-4 bg-white rounded-xl border border-gray-100/50 p-4 shadow-sm text-[#B01030]">
                {/* Text color Tailwind ditambahkan untuk mewarnai Spinner sesuai tema dasbor */}
                <Spinner className="w-8 h-8" />
              </div>
            </div>

            {/* 3. SECTION CAROUSEL (Full Width di bawah grid) */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-[#F5F6FA]/50 flex flex-col justify-between md:col-span-2 min-h-[260px]">
              <div>
                <span className="text-xs font-extrabold text-[#B01030] uppercase tracking-wider">Komponen 03</span>
                <h3 className="text-lg font-bold text-[#202224] mt-0.5">Carousel / Slider</h3>
                <p className="text-xs text-gray-500 font-medium mt-1 mb-6 leading-relaxed">
                  Menampilkan sekumpulan konten atau informasi secara bergantian (slide). Berguna untuk menampilkan *banner* pengumuman internal rumah sakit atau statistik performa berkala.
                </p>
              </div>
              <div className="flex justify-center items-center px-12 bg-white rounded-xl border border-gray-100/50 py-8 shadow-sm">
                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="p-4 bg-[#F5F6FA] text-center rounded-xl border border-gray-100 font-bold text-sm text-[#202224]">
                        Slide 1: Jadwal Operasi Hari Ini
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-4 bg-[#F5F6FA] text-center rounded-xl border border-gray-100 font-bold text-sm text-[#202224]">
                        Slide 2: Antrean Poli Kosong
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-4 bg-[#F5F6FA] text-center rounded-xl border border-gray-100 font-bold text-sm text-[#202224]">
                        Slide 3: Pemeliharaan Sistem Pukul 23:00
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="text-gray-500 hover:text-[#B01030]" />
                  <CarouselNext className="text-gray-500 hover:text-[#B01030]" />
                </Carousel>
              </div>
            </div>

          </div>

        </div>

      </div>
      
    </div>
  );
}