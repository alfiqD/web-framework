// File: JenisMakeup.jsx
import React from "react";
import makeupData from "../data/jenismakeup.json"; // pastikan file JSON makeup sudah ada
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function JenisMakeup() {
  return (
    <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
      <PageHeader title="Jenis Makeup" breadcrumb={["Dashboard", "Jenis Makeup"]} />

      <div className="mx-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Judul Tabel/Data dengan warna #B01030 */}
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-[18px] font-extrabold text-[#B01030]">Data Jenis Makeup</h2>
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50">
            <tr>
              {/* Judul Kolom: 14px Extra Bold, Warna #202224 */}
              <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">ID</th>
              <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">Title</th>
              <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">Code</th>
              <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">Category</th>
              <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">Brand</th>
              <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">Price</th>
              <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {makeupData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                {/* Isi Data: 14px Semi Bold, Warna #202224 */}
                <td className="p-5 text-[14px] font-semibold text-[#202224]">{item.id}</td>
                <td className="p-5 text-[14px] font-semibold text-[#202224]">
                  <Link
                    to={`/jenismakeup/${item.id}`}
                    className="text-[#B01030] hover:text-[#8e0d27] transition-colors"
                  >
                    {item.tittle}
                  </Link>
                </td>
                <td className="p-5 text-[14px] font-semibold text-[#202224]">{item.code}</td>
                <td className="p-5 text-[14px] font-semibold text-[#202224]">{item.category}</td>
                <td className="p-5 text-[14px] font-semibold text-[#202224]">{item.brand}</td>
                <td className="p-5 text-[14px] font-semibold text-[#202224]">Rp {item.price.toLocaleString()}</td>
                <td className="p-5 text-[14px] font-semibold text-[#202224]">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
