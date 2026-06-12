import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import { 
    MdOutlineAutoAwesome, 
    MdFilterList, 
    MdOutlineInventory2, 
    MdOutlineBrandingWatermark,
    MdSearch,
    MdWarningAmber,
    MdErrorOutline,
    MdCheckCircleOutline,
    MdEdit,
    MdDeleteOutline,
    MdMoreVert
} from "react-icons/md";
// Import data JSON
import makeupData from "../data/jenismakeup.json"; 

export default function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- STATE UNTUK PENCARIAN, FILTER & PAGINATION ---
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');
    const [stockFilter, setStockFilter] = useState('All');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // --- LOGIKA PENCARIAN & FILTER DATA ---
    const filteredProducts = makeupData.filter((item) => {
        // Asumsi struktur JSON memiliki 'title' atau 'tittle'
        const productName = item.title || item.tittle || "";
        const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase()));
                              
        const matchCategory = categoryFilter === 'All' || item.category === categoryFilter;
        const matchBrand = brandFilter === 'All' || item.brand === brandFilter;
        
        let matchStock = true;
        if (stockFilter === 'In Stock') matchStock = item.stock > 20;
        else if (stockFilter === 'Low Stock') matchStock = item.stock > 0 && item.stock <= 20;
        else if (stockFilter === 'Out of Stock') matchStock = item.stock === 0;

        return matchesSearch && matchCategory && matchBrand && matchStock;
    });

    // Reset pagination jika filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, brandFilter, stockFilter]);

    // --- LOGIKA PAGINATION ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // --- KALKULASI STATISTIK INVENTORY ---
    const totalLowStock = makeupData.filter(i => i.stock > 0 && i.stock <= 20).length;
    const totalOutOfStock = makeupData.filter(i => i.stock === 0).length;

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
            return <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-xl text-[12px] font-bold ring-1 ring-red-500/30 inline-block min-w-[100px] text-center">Out of Stock</span>;
        } else if (stock <= 20) {
            return <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-xl text-[12px] font-bold ring-1 ring-orange-500/30 inline-block min-w-[100px] text-center">Low ({stock})</span>;
        } else {
            return <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-xl text-[12px] font-bold ring-1 ring-green-500/30 inline-block min-w-[100px] text-center">In Stock ({stock})</span>;
        }
    };

    const categories = [...new Set(makeupData.map(item => item.category))];
    const brands = [...new Set(makeupData.map(item => item.brand))];

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Products Inventory" breadcrumb={["Dashboard", "Products"]}>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white px-5 py-2.5 rounded-xl hover:shadow-[0_8px_20px_-6px_rgba(176,16,48,0.6)] transition-all font-bold shadow-sm text-sm flex items-center gap-2 active:scale-95"
                >
                    <MdOutlineAutoAwesome className="text-lg" /> Add Product
                </button>
            </PageHeader>

            {/* --- ANALYTICS SUMMARY CARDS --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
                        <MdCheckCircleOutline />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Products</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{makeupData.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl">
                        <MdWarningAmber />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Low Stock Alert</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{totalLowStock}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#B01030] flex items-center justify-center text-2xl">
                        <MdErrorOutline />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Out of Stock</p>
                        <h3 className="text-3xl font-black text-[#B01030] leading-none">{totalOutOfStock}</h3>
                    </div>
                </div>
            </div>

            <div className="mx-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                
                {/* --- TOOLBAR: SEARCH & FILTER --- */}
                <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md">
                    
                    {/* Search Bar */}
                    <div className="relative w-full lg:w-80 group">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search product name or code..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
                        <div className="flex items-center gap-2 text-gray-400 font-bold mr-2 hidden md:flex">
                            <MdFilterList size={20} /> <span className="text-sm">Filters:</span>
                        </div>
                        
                        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all max-w-[150px] truncate">
                            <option value="All">All Categories</option>
                            {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
                        </select>

                        <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all max-w-[150px] truncate">
                            <option value="All">All Brands</option>
                            {brands.map((brand, idx) => <option key={idx} value={brand}>{brand}</option>)}
                        </select>

                        <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all">
                            <option value="All">Stock: All</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>
                </div>

                {/* --- TABEL DATA --- */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="p-5 pl-8 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Product Item</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Category & Brand</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Retail Price</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-100">Stock Level</th>
                                <th className="p-5 pr-8 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((item) => (
                                    <tr key={item.productId || item.id} className="hover:bg-red-50/20 transition-colors group">
                                        
                                        {/* Kolom 1: Title & Code */}
                                        <td className="p-5 pl-8">
                                            <div className="text-[15px] font-black">
                                                <Link 
                                                    to={`/jenismakeup/${item.productId || item.id}`}
                                                    className="text-[#202224] hover:text-[#B01030] hover:underline transition-colors cursor-pointer"
                                                >
                                                    {item.title || item.tittle}
                                                </Link>
                                            </div>
                                            <div className="text-[12px] font-bold text-gray-400 mt-1 flex items-center gap-1.5 tracking-wide">
                                                <MdOutlineInventory2 className="text-[#B01030] text-sm" /> {item.code || `PRD-${item.id}`}
                                            </div>
                                        </td>
                                        
                                        {/* Kolom 2: Category & Brand */}
                                        <td className="p-5">
                                            <div className="text-[14px] font-bold text-[#202224]">{item.category}</div>
                                            <div className="text-[12px] font-bold text-gray-500 mt-1 flex items-center gap-1.5">
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
                                        <td className="p-5 text-center">
                                            {getStockBadge(item.stock)}
                                        </td>

                                        {/* Kolom 5: Action Buttons */}
                                        <td className="p-5 pr-8 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit">
                                                    <MdEdit size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Delete">
                                                    <MdDeleteOutline size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all" title="Options">
                                                    <MdMoreVert size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <MdSearch className="text-6xl mb-4 text-gray-200" />
                                            <p className="font-black text-lg text-gray-500">Produk Tidak Ditemukan</p>
                                            <p className="font-semibold text-sm mt-1">Coba sesuaikan kata kunci atau filter kategori.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- FOOTER TABEL: PAGINATION --- */}
                <div className="p-5 border-t border-gray-50 bg-gray-50/30 flex flex-col md:flex-row gap-4 justify-between items-center px-8">
                    <p className="text-sm font-bold text-gray-400">
                        Menampilkan <span className="text-gray-700">{filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredProducts.length)}</span> dari <span className="text-gray-700">{filteredProducts.length}</span> produk
                    </p>
                    
                    <div className="flex gap-1.5">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 border rounded-xl text-sm font-bold transition-all ${currentPage === 1 ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50' : 'border-gray-200 text-gray-600 hover:bg-white shadow-sm'}`}
                        >
                            Prev
                        </button>
                        
                        {pageNumbers.map(number => (
                            <button 
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all ${currentPage === number ? 'bg-[#B01030] text-white shadow-md' : 'border border-gray-200 text-gray-600 hover:bg-white bg-transparent'}`}
                            >
                                {number}
                            </button>
                        ))}

                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`px-4 py-2 border rounded-xl text-sm font-bold transition-all ${currentPage === totalPages || totalPages === 0 ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50' : 'border-gray-200 text-gray-600 hover:bg-white shadow-sm'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL FORM ADD PRODUCT */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[24px] font-black text-gray-900 tracking-tight">Add New Product</h2>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-[#B01030] hover:bg-red-50 font-bold text-xl transition-colors">×</button>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Product Title</label>
                                <input type="text" placeholder="e.g. Lipstick Matte Red" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Item Code</label>
                                    <input type="text" placeholder="e.g. MK016" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Brand</label>
                                    <input type="text" placeholder="e.g. Maybelline" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Price (Rp)</label>
                                    <input type="number" placeholder="Rp..." className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Initial Stock</label>
                                    <input type="number" placeholder="Quantity" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-3.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl font-black hover:bg-gray-100 transition-all text-sm">Cancel</button>
                                <button type="submit" className="flex-1 p-3.5 bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white rounded-xl font-black hover:shadow-[0_8px_20px_-6px_rgba(176,16,48,0.6)] transition-all active:scale-95 text-sm">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}