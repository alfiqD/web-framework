import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// Pastikan nama file JSON sesuai dengan yang kamu pakai (makeup.json atau jenismakeup.json)
import makeupData from "../data/jenismakeup.json"; 
import PageHeader from "../components/PageHeader";
import { 
    MdOutlineArrowBack, 
    MdEdit, 
    MdDeleteOutline, 
    MdOutlineInventory2, 
    MdLocalOffer, 
    MdBrandingWatermark,
    MdAddShoppingCart
} from "react-icons/md";

export default function MakeupDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Pencarian data (Mendukung format JSON lama 'id' maupun baru 'productId')
    const product = makeupData.find((m) => (m.productId || m.id) === parseInt(id));

    // Handler jika produk tidak ditemukan
    if (!product) {
        return (
            <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
                <PageHeader title="Product Not Found" breadcrumb={["Dashboard", "Jenis Makeup", "Detail"]} />
                <div className="mx-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-10 flex flex-col items-center justify-center text-center">
                    <MdOutlineInventory2 className="text-gray-300 text-6xl mb-4" />
                    <h2 className="text-2xl font-extrabold text-[#202224] mb-2">Produk Tidak Ditemukan</h2>
                    <p className="text-gray-500 mb-6">ID produk yang kamu cari mungkin sudah dihapus atau tidak tersedia.</p>
                    <button onClick={() => navigate(-1)} className="bg-[#B01030] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#8e0d27] transition-all">
                        Kembali ke Inventaris
                    </button>
                </div>
            </div>
        );
    }

    // Ambil nama properti dari JSON (mendukung 'title' atau 'tittle')
    const productName = product.title || product.tittle;

    // Fungsi format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0
        }).format(number);
    };

    // Fungsi Helper Warna Badge Stok
    const getStockBadge = (stock) => {
        if (stock === 0) {
            return <span className="bg-[#fde1e1] text-[#EF3826] px-4 py-2 rounded-xl text-[13px] font-extrabold shadow-sm">Out of Stock (0)</span>;
        } else if (stock <= 20) {
            return <span className="bg-[#ffe9d5] text-[#FFA756] px-4 py-2 rounded-xl text-[13px] font-extrabold shadow-sm">Low Stock ({stock} items)</span>;
        } else {
            return <span className="bg-[#ccf1eb] text-[#00B69B] px-4 py-2 rounded-xl text-[13px] font-extrabold shadow-sm">In Stock ({stock} items)</span>;
        }
    };

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
            
            <PageHeader title="Product Details" breadcrumb={["Dashboard", "Jenis Makeup", productName]}>
                <button 
                    onClick={() => navigate(-1)}
                    className="bg-white text-gray-600 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold shadow-sm text-sm flex items-center gap-2 active:scale-95"
                >
                    <MdOutlineArrowBack size={18} /> Back to List
                </button>
            </PageHeader>

            <div className="mx-8 bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 p-8 lg:p-12 gap-12">
                    
                    {/* KOLOM KIRI: GAMBAR PRODUK */}
                    <div className="flex flex-col gap-4">
                        <div className="w-full aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-inner relative group flex items-center justify-center">
                           <img
    // Kita arahkan src-nya ke folder public/img/imgjenismakeup/
    src={product.image ? `/img/imgjenismakeup/${product.image}` : "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=800&auto=format&fit=crop"}
    alt={productName}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
/>
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur-sm text-[#B01030] px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm uppercase tracking-wider">
                                    {product.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: DETAIL INFO */}
                    <div className="flex flex-col justify-center">
                        
                        {/* Brand & Code */}
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                            <span className="flex items-center gap-1.5"><MdBrandingWatermark /> {product.brand}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5"><MdLocalOffer /> CODE: {product.code}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#202224] leading-tight mb-6">
                            {productName}
                        </h1>

                        {/* Price */}
                        <div className="mb-8">
                            <p className="text-gray-500 text-sm font-bold mb-1 uppercase tracking-wide">Retail Price</p>
                            <p className="text-4xl font-extrabold text-[#B01030]">
                                {formatRupiah(product.price)}
                            </p>
                        </div>

                        <hr className="border-gray-100 mb-8" />

                        {/* Inventory Details */}
                        <div className="mb-10">
                            <p className="text-gray-500 text-sm font-bold mb-4 uppercase tracking-wide">Inventory Status</p>
                            <div className="flex items-center gap-4">
                                {getStockBadge(product.stock)}
                                
                                {product.stock > 0 && (
                                    <span className="text-sm font-bold text-gray-400 flex items-center gap-1">
                                        <MdOutlineInventory2 /> Ready to ship
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons (CRM Tools) */}
                        <div className="flex flex-wrap gap-4 mt-auto">
                            <button className="flex-1 bg-[#B01030] text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-red-900/10 hover:bg-[#8e0d27] transition-all flex items-center justify-center gap-2 active:scale-95 text-sm">
                                <MdAddShoppingCart size={20} /> Update Stock
                            </button>
                            <button className="bg-gray-100 text-gray-600 px-6 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm">
                                <MdEdit size={20} /> Edit
                            </button>
                            <button className="bg-[#fde1e1] text-[#EF3826] px-6 py-4 rounded-2xl font-bold hover:bg-[#fbd3d3] transition-all flex items-center justify-center gap-2 active:scale-95 text-sm">
                                <MdDeleteOutline size={20} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}