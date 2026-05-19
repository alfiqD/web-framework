import { useState } from "react";

// --- IMPORT 15 KOMPONEN MURNI CRM BYUTIE ---
// 1. Basic Component (4)
import PrimaryButton from "../components/PrimaryButton";
import StatusBadge from "../components/StatusBadge";
import LogoBrand from "../components/LogoBrand";
import IconButton from "../components/IconButton";

// 2. Layout Component (1)
import CardWrapper from "../components/CardWrapper";

// 3. Data Display Component (3)
import StatWidget from "../components/StatWidget";
import PatientTable from "../components/PatientTable";
import UserProfile from "../components/UserProfile";

// 4. Form Component (2)
import SearchInput from "../components/SearchInput";
import SelectYear from "../components/SelectYear";

// 5. Feedback Component (2)
import AlertMessage from "../components/AlertMessage";
import ModalPopup from "../components/ModalPopup";

// 6. Section Component (3)
import RevenueSection from "../components/RevenueSection";
import PopularSection from "../components/PopularSection";
import ScheduleList from "../components/ScheduleList";

export default function Components() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">
          Showcase 15 Komponen CRM
        </h1>
        <p className="text-[#B01030] font-semibold mt-2">Tema: Byutie Clinic</p>
      </div>

      {/* DI SINI PERUBAHANNYA: 
          Menggunakan grid-cols-1 untuk layar kecil/zoom in 
          Menggunakan lg:grid-cols-2 untuk layar besar/zoom out (menjadi 2x3) 
          max-w-[1400px] agar bisa melebar penuh */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1400px] mx-auto items-start">
        
        {/* 1. BASIC COMPONENT */}
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full">
          <h2 className="text-xl font-bold text-[#B01030] border-b border-gray-200 pb-2 mb-6">
            1. Basic Component
          </h2>
          <div className="flex flex-wrap gap-8 items-center">
            <LogoBrand />
            <PrimaryButton>+ New Patient</PrimaryButton>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="Completed" />
              <StatusBadge status="Pending" />
              <StatusBadge status="Cancelled" />
              <StatusBadge status="Gold" />
              <StatusBadge status="Silver" />
              <StatusBadge status="Bronze" />
            </div>
            <IconButton badgeCount={6} />
          </div>
        </section>

        {/* 2. LAYOUT COMPONENT */}
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full h-full">
          <h2 className="text-xl font-bold text-[#B01030] border-b border-gray-200 pb-2 mb-6">
            2. Layout Component
          </h2>
          <div className="w-full">
            <CardWrapper title="Contoh Card Layout">
              <p className="text-gray-500 text-sm">
                Ini adalah kotak Layout pembungkus standar yang digunakan pada
                seluruh dashboard.
              </p>
            </CardWrapper>
          </div>
        </section>

        {/* 3. DATA DISPLAY COMPONENT */}
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full h-full">
          <h2 className="text-xl font-bold text-[#B01030] border-b border-gray-200 pb-2 mb-6">
            3. Data Display Component
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-6 items-center">
              <StatWidget title="Earnings" value="$125,000" icon="$" />
              <div className="bg-[#F5F6FA] p-4 rounded-3xl border border-gray-100">
                <UserProfile />
              </div>
            </div>
            <PatientTable />
          </div>
        </section>

        {/* 4. FORM COMPONENT */}
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full h-full">
          <h2 className="text-xl font-bold text-[#B01030] border-b border-gray-200 pb-2 mb-6">
            4. Form Component
          </h2>
          <div className="flex gap-6 items-center bg-[#F5F6FA] p-6 rounded-3xl border border-gray-100">
            <SearchInput placeholder="Cari data pasien..." />
            <SelectYear />
          </div>
        </section>

        {/* 5. FEEDBACK COMPONENT */}
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full h-full">
          <h2 className="text-xl font-bold text-[#B01030] border-b border-gray-200 pb-2 mb-6">
            5. Feedback Component
          </h2>
          <div className="flex flex-col gap-4">
            <AlertMessage
              message="Data pasien berhasil disimpan."
              type="success"
            />
            <AlertMessage message="Koneksi server terputus." type="danger" />

            <div className="mt-4">
              <PrimaryButton onClick={() => setIsModalOpen(true)}>
                Test Modal Konfirmasi
              </PrimaryButton>
            </div>

            <ModalPopup
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Konfirmasi"
            >
              <p className="mb-6 text-gray-600">
                Apakah Anda yakin ingin menyimpan perubahan ini?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 font-semibold px-4 hover:text-gray-800"
                >
                  Batal
                </button>
                <PrimaryButton onClick={() => setIsModalOpen(false)}>
                  Ya, Simpan
                </PrimaryButton>
              </div>
            </ModalPopup>
          </div>
        </section>

        {/* 6. SECTION COMPONENT */}
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full h-full">
          <h2 className="text-xl font-bold text-[#B01030] border-b border-gray-200 pb-2 mb-6">
            6. Section Component
          </h2>
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex flex-col gap-6 flex-1">
              <RevenueSection />
              <PopularSection />
            </div>
            <div className="flex-1">
              <ScheduleList />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}