// File: MakeupDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import makeupData from "../data/jenismakeup.json";
import PageHeader from "../components/PageHeader";

export default function MakeupDetail() {
  const { id } = useParams();
  const product = makeupData.find((m) => m.id === parseInt(id));

  if (!product) {
    return (
      <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
        <PageHeader title="Makeup Detail" breadcrumb={["Dashboard", "Jenis Makeup", "Detail"]} />
        <div className="mx-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <p className="text-[14px] font-semibold text-[#202224]">Produk tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
      <PageHeader title={`Detail Makeup: ${product.tittle}`} breadcrumb={["Dashboard", "Jenis Makeup", "Detail"]} />
      <div className="mx-8 bg-white rounded-3xl shadow-lg max-w-lg mx-auto mt-6 p-6">
        <img
          src="https://via.placeholder.com/400x300?text=Makeup+Image"
          alt={product.tittle}
          className="rounded-xl mb-4 w-full h-48 object-cover"
        />
        <h2 className="text-2xl font-bold mb-2 text-[#202224]">{product.tittle}</h2>
        <p className="text-gray-600 mb-1">Kode: {product.code}</p>
        <p className="text-gray-600 mb-1">Kategori: {product.category}</p>
        <p className="text-gray-600 mb-1">Brand: {product.brand}</p>
        <p className="text-gray-800 font-semibold text-lg">
          Harga: Rp {product.price.toLocaleString()}
        </p>
        <p className="text-gray-600 mb-1">Stock: {product.stock}</p>
      </div>
    </div>
  );
}
