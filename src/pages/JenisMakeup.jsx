import { useState } from 'react';
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom"; // Import Link dikembalikan
import { MdOutlineAutoAwesome, MdFilterList, MdOutlineInventory2, MdOutlineBrandingWatermark } from "react-icons/md";
// Import data JSON (Pastikan pakai JSON yang baru ya)
import makeupData from "../data/jenismakeup.json"; 

export default function JenisMakeup() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- STATE UNTUK FILTER ---
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');
    const [stockFilter, setStockFilter] = useState('All');

    // --- LOGIKA FILTER DATA ---
    const filteredProducts = makeupData.filter((item) => {
        const matchCategory = categoryFilter === 'All' || item.category === categoryFilter;
        const matchBrand = brandFilter === 'All' || item.brand === brandFilter;
        
        let matchStock = true;
        if (stockFilter === 'In Stock') matchStock = item.stock > 20;
        else if (stockFilter === 'Low Stock') matchStock = item.stock > 0 && item.stock <= 20;
        else if (stockFilter === 'Out of Stock') matchStock = item.stock === 0;

        return matchCategory && matchBrand && matchStock;
    });

    // Fungsi Helper format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // Fungsi Helper Warna Badge Stok
    const getStockBadge = (stock) => {
        if (stock === 0) {
            return <span className="bg-[#fde1e1] text-[#EF3826] px-3 py-1.5 rounded-xl text-[12px] font-bold shadow-sm inline-block min-w-[110px] text-center">Out of Stock</span>;
        } else if (stock <= 20) {
            return <span className="bg-[#ffe9d5] text-[#FFA756] px-3 py-1.5 rounded-xl text-[12px] font-bold shadow-sm inline-block min-w-[110px] text-center">Low Stock ({stock})</span>;
        } else {
            return <span className="bg-[#ccf1eb] text-[#00B69B] px-3 py-1.5 rounded-xl text-[12px] font-bold shadow-sm inline-block min-w-[110px] text-center">In Stock ({stock})</span>;
        }
    };

    const categories = [...new Set(makeupData.map(item => item.category))];
    const brands = [...new Set(makeupData.map(item => item.brand))];

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
            
            <PageHeader title="Jenis Makeup" breadcrumb={["Dashboard", "Jenis Makeup"]}>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#B01030] text-white px-5 py-2.5 rounded-xl hover:bg-[#8e0d27] transition-all font-bold shadow-lg shadow-red-900/10 text-sm flex items-center gap-2 active:scale-95"
                >
                    <MdOutlineAutoAwesome /> + Add Product
                </button>
            </PageHeader>

            <div className="mx-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-[18px] font-extrabold text-[#B01030]">Product Inventory</h2>
                    <span className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                        Showing {filteredProducts.length} Items
                    </span>
                </div>

                {/* --- BAGIAN FILTER BAR --- */}
                <div className="bg-gray-50/50 p-4 border-b border-gray-50 flex flex-wrap gap-4 items-center px-6">
                    <div className="flex items-center gap-2 text-gray-400 font-bold mr-2">
                        <MdFilterList size={20} /> <span className="text-sm">Filters:</span>
                    </div>
                    
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-[13px] font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 ring-[#B01030]/30 cursor-pointer">
                        <option value="All">All Categories</option>
                        {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
                    </select>

                    <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-[13px] font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 ring-[#B01030]/30 cursor-pointer">
                        <option value="All">All Brands</option>
                        {brands.map((brand, idx) => <option key={idx} value={brand}>{brand}</option>)}
                    </select>

                    <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-[13px] font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 ring-[#B01030]/30 cursor-pointer">
                        <option value="All">All Stock Levels</option>
                        <option value="In Stock">In Stock (>20)</option>
                        <option value="Low Stock">Low Stock (1-20)</option>
                        <option value="Out of Stock">Out of Stock (0)</option>
                    </select>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-white">
                            <tr>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-50">Product Name & Code</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-50">Category & Brand</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider text-right border-b border-gray-50">Retail Price</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider text-right border-b border-gray-50">Stock Level</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((item) => (
                                    <tr key={item.productId || item.id} className="hover:bg-gray-50/50 transition-colors group">
                                        
                                        {/* Kolom 1: Title & Code (Dengan LINK) */}
                                        <td className="p-5">
                                            <div className="text-[14px] font-extrabold">
                                                <Link 
                                                    to={`/jenismakeup/${item.productId || item.id}`}
                                                    className="text-[#202224] hover:text-[#B01030] hover:underline transition-colors cursor-pointer"
                                                >
                                                    {item.title || item.tittle}
                                                </Link>
                                            </div>
                                            <div className="text-[12px] font-bold text-gray-400 mt-1 flex items-center gap-1">
                                                <MdOutlineInventory2 className="text-[#B01030] text-sm" /> {item.code}
                                            </div>
                                        </td>
                                        
                                        {/* Kolom 2: Category & Brand */}
                                        <td className="p-5">
                                            <div className="text-[14px] font-bold text-[#202224]">{item.category}</div>
                                            <div className="text-[12px] font-bold text-gray-500 mt-1 flex items-center gap-1">
                                                <MdOutlineBrandingWatermark className="text-gray-400 text-sm" /> {item.brand}
                                            </div>
                                        </td>

                                        {/* Kolom 3: Price */}
                                        <td className="p-5 text-right">
                                            <div className="text-[14px] font-extrabold text-[#202224]">
                                                {formatRupiah(item.price)}
                                            </div>
                                        </td>

                                        {/* Kolom 4: Stock */}
                                        <td className="p-5 text-right">
                                            {getStockBadge(item.stock)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-10 text-center text-gray-400 font-bold text-sm">
                                        No products found matching the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL FORM ADD PRODUCT (Tetap sama) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded-[32px] w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[24px] font-extrabold text-[#202224]">Add New Product</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#B01030] font-bold text-2xl transition-colors">×</button>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Product Title</label>
                                <input type="text" placeholder="e.g. Lipstick Matte Red" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Item Code</label>
                                    <input type="text" placeholder="e.g. MK016" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Brand</label>
                                    <input type="text" placeholder="e.g. Maybelline" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Price (Rp)</label>
                                    <input type="number" placeholder="Rp..." className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Initial Stock</label>
                                    <input type="number" placeholder="Quantity" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                                </div>
                            </div>
                            <div className="flex space-x-3 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all text-sm">Cancel</button>
                                <button type="submit" className="flex-1 p-4 bg-[#B01030] text-white rounded-2xl font-bold hover:bg-[#8e0d27] shadow-lg shadow-red-900/10 transition-all active:scale-95 text-sm">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}