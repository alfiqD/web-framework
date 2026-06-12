import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// Pastikan nama file JSON sesuai dengan yang kamu pakai
import makeupData from "../data/jenismakeup.json"; 
import PageHeader from "../components/PageHeader";
import { 
    MdOutlineArrowBack, 
    MdEdit, 
    MdDeleteOutline, 
    MdOutlineInventory2, 
    MdLocalOffer, 
    MdBrandingWatermark,
    MdAddShoppingCart,
    MdOutlineStar,
    MdInfoOutline,
    MdCheckCircleOutline
} from "react-icons/md";

export default function MakeupDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Pencarian data (Mendukung format JSON lama 'id' maupun baru 'productId')
    const product = makeupData.find((m) => (m.productId || m.id) === parseInt(id));

    // Handler jika produk tidak ditemukan
    if (!product) {
        return (
            <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
                <PageHeader title="Product Not Found" breadcrumb={["Dashboard", "Inventory", "Error"]} />
                <div className="mx-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-16 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <MdOutlineInventory2 className="text-gray-300 text-5xl" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">Produk Tidak Ditemukan</h2>
                    <p className="text-gray-500 font-medium mb-8 max-w-md">ID produk yang kamu cari mungkin sudah dihapus dari database atau link yang Anda gunakan tidak valid.</p>
                    <button onClick={() => navigate(-1)} className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-black transition-all flex items-center gap-2 active:scale-95">
                        <MdOutlineArrowBack /> Kembali ke Inventaris
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
            return <span className="bg-red-50 text-red-600 ring-1 ring-red-500/30 px-4 py-1.5 rounded-xl text-[12px] font-black shadow-sm tracking-wide">Out of Stock (0)</span>;
        } else if (stock <= 20) {
            return <span className="bg-orange-50 text-orange-600 ring-1 ring-orange-500/30 px-4 py-1.5 rounded-xl text-[12px] font-black shadow-sm tracking-wide">Low Stock ({stock} items)</span>;
        } else {
            return <span className="bg-green-50 text-green-600 ring-1 ring-green-500/30 px-4 py-1.5 rounded-xl text-[12px] font-black shadow-sm tracking-wide">In Stock ({stock} items)</span>;
        }
    };

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Product Details" breadcrumb={["Dashboard", "Product", productName]}>
                <button 
                    onClick={() => navigate(-1)}
                    className="bg-white text-gray-600 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold shadow-sm text-sm flex items-center gap-2 active:scale-95"
                >
                    <MdOutlineArrowBack size={18} /> Back to List
                </button>
            </PageHeader>

            <div className="mx-8 max-w-6xl bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden relative">
                
                {/* Aksen Dekorasi Header Card */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#B01030]/5 to-transparent z-0 pointer-events-none"></div>

                {/* GRID LAYOUT: 4 Kolom Kiri (Gambar), 8 Kolom Kanan (Teks) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 p-8 lg:p-10 gap-10 items-start relative z-10">
                    
                    {/* ========================================= */}
                    {/* KOLOM KIRI: GAMBAR PRODUK                 */}
                    {/* ========================================= */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {/* Box Gambar Dibuat Lebih Kecil dan Proporsional (Kotak 1:1) */}
                        <div className="w-full aspect-square bg-gray-50/80 rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative group p-6 flex items-center justify-center">
                            <img
                                src={product.image ? `/img/imgjenismakeup/${product.image}` : "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=800&auto=format&fit=crop"}
                                alt={productName}
                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
                            />
                            {/* Badge Kategori Melayang di atas gambar */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur-md text-gray-800 border border-gray-100 px-3 py-1.5 rounded-xl text-[10px] font-black shadow-sm uppercase tracking-widest">
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        {/* Statistik Mini di bawah gambar */}
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
                                <MdOutlineStar className="text-yellow-400 text-xl mx-auto mb-1" />
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Rating</p>
                                <p className="text-sm font-black text-gray-800">4.8 / 5.0</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
                                <MdAddShoppingCart className="text-blue-400 text-xl mx-auto mb-1" />
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Terjual</p>
                                <p className="text-sm font-black text-gray-800">+1,240</p>
                            </div>
                        </div>
                    </div>

                    {/* ========================================= */}
                    {/* KOLOM KANAN: DETAIL INFORMASI             */}
                    {/* ========================================= */}
                    <div className="lg:col-span-8 flex flex-col h-full pt-2">
                        
                        {/* Brand & Code Header */}
                        <div className="flex flex-wrap items-center gap-3 text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <MdBrandingWatermark className="text-[#B01030]" /> {product.brand}
                            </span>
                            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <MdLocalOffer className="text-blue-500" /> REF: {product.code || `PRD-${product.id}`}
                            </span>
                        </div>

                        {/* Product Title */}
                        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
                            {productName}
                        </h1>

                        {/* Deskripsi Singkat (Opsional, jika ada di JSON) */}
                        <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8 max-w-2xl">
                            {product.description || "Produk kosmetik premium dari koleksi terbaru kami. Diformulasikan khusus untuk memberikan hasil riasan yang sempurna, tahan lama, dan aman untuk berbagai jenis kulit pelanggan Anda."}
                        </p>

                        {/* Price & Stock Section (Card in Card) */}
                        <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-6 lg:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <p className="text-gray-400 text-[11px] font-black mb-1 uppercase tracking-widest">Retail Price</p>
                                <p className="text-4xl font-black text-[#B01030] tracking-tight">
                                    {formatRupiah(product.price)}
                                </p>
                            </div>
                            
                            <div className="hidden md:block w-[1px] h-12 bg-gray-200"></div> {/* Divider */}

                            <div>
                                <p className="text-gray-400 text-[11px] font-black mb-2 uppercase tracking-widest">Inventory Status</p>
                                <div className="flex items-center gap-3">
                                    {getStockBadge(product.stock)}
                                    {product.stock > 0 && (
                                        <span className="text-[12px] font-bold text-gray-500 flex items-center gap-1">
                                            <MdCheckCircleOutline className="text-green-500" /> Ready to ship
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons (CRM Tools) */}
                        <div className="flex flex-wrap gap-3 mt-auto border-t border-gray-50 pt-8">
                            <button className="bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-red-900/10 hover:shadow-[0_10px_20px_-10px_rgba(176,16,48,0.6)] transition-all flex items-center justify-center gap-2 active:scale-95 text-sm">
                                <MdOutlineInventory2 size={20} /> Update Stock
                            </button>
                            <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3.5 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm shadow-sm">
                                <MdEdit size={18} /> Edit Product
                            </button>
                            <button className="bg-white border border-gray-200 text-red-500 px-4 py-3.5 rounded-2xl font-black hover:bg-red-50 hover:border-red-100 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm shadow-sm ml-auto">
                                <MdDeleteOutline size={20} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}