import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    MdOutlineAutoAwesome, 
    MdLogout, 
    MdCardGiftcard, 
    MdShoppingBag, 
    MdHistory,
    MdStar,
    MdChevronLeft,
    MdChevronRight,
    MdVerified,
    MdLocalOffer,
    MdClose
} from "react-icons/md";
import { FaWhatsapp } from 'react-icons/fa';

export default function MemberDashboard() {
    const navigate = useNavigate();
    
    // State points & vouchers (milik user)
    const [points, setPoints] = useState(12450);
    const [myVouchers, setMyVouchers] = useState([
        { id: 1, name: "Diskon 10%", code: "BYUTIE10", validUntil: "31 Des 2026", pointsCost: 0 },
        { id: 2, name: "Gratis Ongkir", code: "FREESHIP", validUntil: "30 Nov 2026", pointsCost: 0 },
        { id: 3, name: "Cashback 20rb", code: "CASH20", validUntil: "15 Jan 2027", pointsCost: 0 }
    ]);
    
    // Daftar voucher yang tersedia untuk dibeli (dengan harga poin)
    const availableVouchers = [
        { id: 101, name: "Diskon 15%", code: "POIN15", validUntil: "31 Des 2026", pointsCost: 500, description: "Potongan 15% untuk seluruh produk" },
        { id: 102, name: "Diskon 25%", code: "POIN25", validUntil: "31 Des 2026", pointsCost: 1000, description: "Potongan 25% min belanja 200rb" },
        { id: 103, name: "Free Ongkir + Cashback 10rb", code: "FREECASH", validUntil: "31 Jan 2027", pointsCost: 1500, description: "Gratis ongkir + cashback 10rb" },
        { id: 104, name: "Voucher Special Birthday", code: "BDAY2026", validUntil: "31 Des 2026", pointsCost: 2000, description: "Diskon 50% max 100rb" }
    ];

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    // --- DATA PRODUK REAL (Diambil 18 Data Pertama Saja) ---
    const allMakeupData = [
        { "productId": 1, "title": "Lipstick Matte Red", "code": "MK001", "category": "Lipstick", "brand": "Maybelline", "price": 120000, "stock": 50, "image": "lipstick-matte-red.jpg" },
        { "productId": 2, "title": "Lip Gloss Nude", "code": "MK002", "category": "Lip Gloss", "brand": "NYX", "price": 95000, "stock": 70, "image": "lip-gloss-nude.jpg" },
        { "productId": 3, "title": "Foundation Liquid Beige", "code": "MK003", "category": "Foundation", "brand": "L'Oreal", "price": 180000, "stock": 0, "image": "foundation-liquid-beige.jpg" },
        { "productId": 4, "title": "Compact Powder Light", "code": "MK004", "category": "Powder", "brand": "Wardah", "price": 85000, "stock": 60, "image": "compact-powder-light.jpg" },
        { "productId": 5, "title": "Blush On Pink", "code": "MK005", "category": "Blush", "brand": "Emina", "price": 75000, "stock": 80, "image": "blush-on-pink.jpg" },
        { "productId": 6, "title": "Highlighter Glow", "code": "MK006", "category": "Highlighter", "brand": "Focallure", "price": 95000, "stock": 15, "image": "highlighter-glow.jpg" },
        { "productId": 7, "title": "Bronzer Natural", "code": "MK007", "category": "Bronzer", "brand": "Revlon", "price": 110000, "stock": 45, "image": "bronzer-natural.jpg" },
        { "productId": 8, "title": "Mascara Volume", "code": "MK008", "category": "Mascara", "brand": "Maybelline", "price": 125000, "stock": 65, "image": "mascara-volume.jpg" },
        { "productId": 9, "title": "Eyeliner Pencil Black", "code": "MK009", "category": "Eyeliner", "brand": "NYX", "price": 65000, "stock": 90, "image": "eyeliner-pencil-black.jpg" },
        { "productId": 10, "title": "Liquid Eyeliner Waterproof", "code": "MK010", "category": "Eyeliner", "brand": "Wardah", "price": 85000, "stock": 0, "image": "liquid-eyeliner-waterproof.jpg" },
        { "productId": 11, "title": "Eyeshadow Palette Nude", "code": "MK011", "category": "Eyeshadow", "brand": "Urban Decay", "price": 350000, "stock": 30, "image": "eyeshadow-palette-nude.jpg" },
        { "productId": 12, "title": "Eyeshadow Palette Colorful", "code": "MK012", "category": "Eyeshadow", "brand": "Focallure", "price": 220000, "stock": 8, "image": "eyeshadow-palette-colorful.jpg" },
        { "productId": 13, "title": "Lip Balm Strawberry", "code": "MK013", "category": "Lip Balm", "brand": "EOS", "price": 55000, "stock": 100, "image": "lip-balm-strawberry.jpg" },
        { "productId": 14, "title": "Setting Spray Long Lasting", "code": "MK014", "category": "Setting Spray", "brand": "NYX", "price": 150000, "stock": 35, "image": "setting-spray-long-lasting.jpg" },
        { "productId": 15, "title": "Primer Poreless", "code": "MK015", "category": "Primer", "brand": "Benefit", "price": 320000, "stock": 25, "image": "primer-poreless.jpg" },
        { "productId": 16, "title": "BB Cream Natural", "code": "MK016", "category": "BB Cream", "brand": "Garnier", "price": 95000, "stock": 60, "image": "bb-cream-natural.jpg" },
        { "productId": 17, "title": "CC Cream Brightening", "code": "MK017", "category": "CC Cream", "brand": "Olay", "price": 120000, "stock": 50, "image": "cc-cream-brightening.jpg" },
        { "productId": 18, "title": "Lip Tint Cherry", "code": "MK018", "category": "Lip Tint", "brand": "Etude House", "price": 85000, "stock": 75, "image": "lip-tint-cherry.jpg" }
    ];

    // Format data agar sesuai dengan komponen ProductCard
    const products = allMakeupData.map((item, index) => ({
        id: item.productId,
        name: item.title,
        category: item.category,
        price: `Rp ${item.price.toLocaleString('id-ID')}`,
        // Mengarahkan ke path folder local sesuai struktur gambarmu sebelumnya
        image: `/img/imgjenismakeup/${item.image}`, 
        badge: index < 4 ? "Best Seller" : index < 10 ? "Trending" : "New",
        stock: item.stock
    }));
    
    // Carousel untuk produk: 2 baris x 3 kolom = 6 item per slide
    const [currentProductPage, setCurrentProductPage] = useState(0);
    const itemsPerPage = 6; 
    const totalProductPages = Math.ceil(products.length / itemsPerPage);
    
    const nextProductPage = () => {
        setCurrentProductPage((prev) => (prev + 1) % totalProductPages);
    };
    
    const prevProductPage = () => {
        setCurrentProductPage((prev) => (prev - 1 + totalProductPages) % totalProductPages);
    };
    
    const visibleProducts = products.slice(
        currentProductPage * itemsPerPage,
        (currentProductPage + 1) * itemsPerPage
    );
    
    // Bagi menjadi 2 baris untuk tampilan grid 3 kolom
    const firstRowProducts = visibleProducts.slice(0, 3);
    const secondRowProducts = visibleProducts.slice(3, 6);
    
    // Function to claim voucher using points
    const openPurchaseModal = (voucher) => {
        setSelectedVoucher(voucher);
        setModalOpen(true);
    };
    
    const confirmPurchase = () => {
        if (!selectedVoucher) return;
        const pointsNeeded = selectedVoucher.pointsCost;
        if (points >= pointsNeeded) {
            setPoints(points - pointsNeeded);
            const newVoucher = {
                id: Date.now(),
                name: selectedVoucher.name,
                code: selectedVoucher.code,
                validUntil: selectedVoucher.validUntil,
                pointsCost: pointsNeeded
            };
            setMyVouchers([...myVouchers, newVoucher]);
            showNotification(`Berhasil membeli ${selectedVoucher.name}! Poin berkurang ${pointsNeeded}.`, 'success');
            setModalOpen(false);
            setSelectedVoucher(null);
        } else {
            showNotification(`Poin tidak mencukupi. Butuh ${pointsNeeded} poin.`, 'error');
            setModalOpen(false);
        }
    };
    
    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };
    
    const claimWelcomeVoucher = () => {
        const welcomeVoucher = {
            id: Date.now() + 1000,
            name: "Welcome Voucher 5%",
            code: "WELCOME5",
            validUntil: "31 Jan 2027",
            pointsCost: 0
        };
        setMyVouchers([...myVouchers, welcomeVoucher]);
        showNotification("Selamat! Voucher selamat datang telah ditambahkan.", 'success');
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F4F7FE] to-[#FAFAFA] font-nunito pb-20">
            {/* Floating Navbar */}
            <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-[1400px] bg-white/70 backdrop-blur-xl z-50 rounded-full border border-white/20 shadow-lg">
                <div className="px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/landing')}>
                        <MdOutlineAutoAwesome className="text-[#B01030] text-2xl" />
                        <span className="text-xl font-extrabold tracking-tight text-[#202224]">byutie<span className="text-[#B01030]">.</span></span>
                    </div>
                    <button onClick={() => navigate('/landing')} className="flex items-center gap-2 text-gray-600 font-bold hover:text-red-600 transition-colors bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                        <MdLogout /> Keluar
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 mt-24">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Halo, Alfiq Debriliant! 👋</h1>
                <p className="text-gray-500 font-bold mb-8">Selamat datang kembali di Dashboard Byutie Loves kamu.</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Member Card */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#202224] via-gray-900 to-[#1a1a1a] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden text-white border border-white/10">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#B01030] rounded-full blur-3xl opacity-30"></div>
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-500 rounded-full blur-3xl opacity-20"></div>
                        
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Tier Saat Ini</p>
                                <div className="flex items-center gap-2">
                                    <MdStar className="text-yellow-400 text-2xl" />
                                    <h2 className="text-2xl font-black text-yellow-400">Gold Member</h2>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Member ID</p>
                                <p className="font-mono font-bold tracking-widest bg-white/10 px-3 py-1 rounded-lg">001-BYUTIE-2026</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 border-t border-gray-700 pt-6 relative z-10">
                            <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm">
                                <p className="text-gray-300 font-bold text-xs uppercase mb-1">Byutie Poin</p>
                                <div className="flex items-baseline justify-between">
                                    <p className="text-3xl font-black">{points.toLocaleString('id-ID')} <span className="text-sm font-bold text-[#B01030]">pts</span></p>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">*Tukar poin di bawah</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm">
                                <p className="text-gray-300 font-bold text-xs uppercase mb-1">Voucher Aktif</p>
                                <div className="flex items-baseline justify-between">
                                    <p className="text-3xl font-black">{myVouchers.length} <span className="text-sm font-bold text-gray-400">Kupon</span></p>
                                    <button onClick={claimWelcomeVoucher} className="text-xs bg-green-500/20 hover:bg-green-500/40 text-green-300 px-3 py-1 rounded-full transition">+ Klaim Baru</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-[#B01030] transition-all group hover:shadow-lg">
                            <div className="w-14 h-14 bg-red-50 text-[#B01030] rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#B01030] group-hover:text-white transition-colors"><MdShoppingBag /></div>
                            <div><h3 className="font-black text-gray-900">Mulai Belanja</h3><p className="text-xs text-gray-500 font-bold">Katalog produk Byutie</p></div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-yellow-400 transition-all group hover:shadow-lg">
                            <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-yellow-400 group-hover:text-white transition-colors"><MdCardGiftcard /></div>
                            <div><h3 className="font-black text-gray-900">Tukar Poin</h3><p className="text-xs text-gray-500 font-bold">Lihat voucher di bawah</p></div>
                        </div>
                    </div>
                </div>

                {/* Daftar Voucher Aktif */}
                <div className="mt-10">
                    <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2"><MdLocalOffer className="text-green-500"/> Voucher Saya</h3>
                    <div className="flex flex-wrap gap-3">
                        {myVouchers.map(v => (
                            <div key={v.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm">
                                <MdVerified className="text-green-500" />
                                <div>
                                    <p className="font-black text-sm text-gray-800">{v.name}</p>
                                    <p className="text-xs text-gray-500">Kode: {v.code} | Berlaku: {v.validUntil}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section Tukar Poin */}
                <div className="mt-10">
                    <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2"><MdCardGiftcard className="text-[#B01030]"/> Tukar Poin dengan Voucher</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {availableVouchers.map(voucher => (
                            <div key={voucher.id} className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-xl transition-all cursor-pointer group" onClick={() => openPurchaseModal(voucher)}>
                                <div className="flex justify-between items-start">
                                    <div className="bg-[#B01030]/10 p-2 rounded-xl">
                                        <MdLocalOffer className="text-[#B01030] text-xl" />
                                    </div>
                                    <span className="text-xs font-black bg-amber-100 text-amber-700 px-2 py-1 rounded-full">{voucher.pointsCost} pts</span>
                                </div>
                                <h4 className="font-black text-gray-800 mt-3">{voucher.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">{voucher.description}</p>
                                <p className="text-[10px] text-gray-400 mt-2">Kode: {voucher.code}</p>
                                <button className="mt-3 w-full bg-gray-100 text-gray-700 text-xs font-bold py-2 rounded-xl group-hover:bg-[#B01030] group-hover:text-white transition">Tukar Sekarang</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Carousel (2 baris x 3 kolom) */}
                <div className="mt-14">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2"><MdShoppingBag className="text-[#B01030]"/> Belanja Produk Byutie</h3>
                        <div className="flex gap-2">
                            <button onClick={prevProductPage} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"><MdChevronLeft className="text-xl" /></button>
                            <button onClick={nextProductPage} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"><MdChevronRight className="text-xl" /></button>
                        </div>
                    </div>
                    
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {firstRowProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {secondRowProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Pagination dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: totalProductPages }).map((_, i) => (
                            <button 
                                key={i} 
                                onClick={() => setCurrentProductPage(i)} 
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentProductPage ? 'w-6 bg-[#B01030]' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Riwayat Pesanan Table */}
                <h3 className="text-xl font-black text-gray-900 mt-12 mb-6 flex items-center gap-2"><MdHistory className="text-gray-400"/> Riwayat Pesanan</h3>
                <div className="bg-white rounded-3xl p-2 shadow-md border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest font-black">
                            <tr>
                                <th className="p-5 rounded-tl-2xl">ID Pesanan</th>
                                <th className="p-5">Tanggal</th>
                                <th className="p-5">Status</th>
                                <th className="p-5 rounded-tr-2xl">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 font-bold text-sm">
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="p-5 text-[#B01030]">#INV-00912</td>
                                <td className="p-5 text-gray-600">12 Juni 2026</td>
                                <td className="p-5"><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">Selesai</span></td>
                                <td className="p-5 text-gray-900">Rp 245.000</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="p-5 text-[#B01030]">#INV-00884</td>
                                <td className="p-5 text-gray-600">28 Mei 2026</td>
                                <td className="p-5"><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">Selesai</span></td>
                                <td className="p-5 text-gray-900">Rp 115.000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Modal Konfirmasi Pembelian Voucher */}
            {modalOpen && selectedVoucher && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><MdClose size={24} /></button>
                        <div className="text-center mb-4">
                            <div className="bg-[#B01030]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <MdCardGiftcard className="text-[#B01030] text-3xl" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900">Tukar Poin</h3>
                            <p className="text-gray-500 mt-1">Anda akan menukarkan <span className="font-bold">{selectedVoucher.pointsCost} poin</span> untuk voucher:</p>
                            <div className="bg-gray-50 p-3 rounded-xl mt-3">
                                <p className="font-black text-gray-800">{selectedVoucher.name}</p>
                                <p className="text-sm text-gray-600">{selectedVoucher.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Kode: {selectedVoucher.code}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button onClick={() => setModalOpen(false)} className="flex-1 py-2 rounded-xl border border-gray-300 text-gray-700 font-bold">Batal</button>
                            <button onClick={confirmPurchase} className="flex-1 py-2 rounded-xl bg-[#B01030] text-white font-bold">Konfirmasi</button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Notifikasi */}
            {notification.show && (
                <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg text-white font-bold text-sm animate-slideDown ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {notification.message}
                </div>
            )}
            
            {/* Floating WhatsApp Button */}
            <a href="https://wa.me/6281234567890?text=Halo%20Byutie%2C%20saya%20mau%20konsultasi%20produk" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 group">
                <FaWhatsapp className="text-2xl" />
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">Chat Kami</span>
            </a>
        </div>
    );
}

// Komponen ProductCard
const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 group">
            <div className="h-48 bg-gray-50 relative overflow-hidden flex items-center justify-center p-4">
                {/* Fallback styling jika gambar local belum di-download */}
                <div className="w-full h-full flex items-center justify-center relative">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition duration-500 z-10" 
                        onError={(e) => {
                            e.target.style.display = 'none'; 
                            e.target.parentElement.innerHTML = `<span class="text-gray-400 font-black text-xs uppercase tracking-widest">${product.category}</span>`;
                        }}
                    />
                </div>
                <span className="absolute top-3 left-3 bg-[#B01030] text-white text-[10px] font-black px-2.5 py-1 rounded-full z-20 shadow-md uppercase tracking-wider">{product.badge}</span>
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-30 flex items-center justify-center">
                        <span className="bg-gray-800 text-white font-black text-xs px-3 py-1.5 rounded-full uppercase tracking-widest">Habis</span>
                    </div>
                )}
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{product.category}</p>
                    <p className="text-[10px] text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded">{product.brand}</p>
                </div>
                <h4 className="font-black text-base text-gray-800 line-clamp-1 mb-3" title={product.name}>{product.name}</h4>
                <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                    <p className="text-[#B01030] font-black text-lg">{product.price}</p>
                    <button 
                        disabled={product.stock === 0} 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${product.stock === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-100 text-gray-600 hover:bg-[#B01030] hover:text-white active:scale-95'}`}
                    >
                        <MdShoppingBag className="text-sm" />
                    </button>
                </div>
            </div>
        </div>
    );
};