import React from "react";

export default function PageHeader({ title, breadcrumb, children }) {
    // Memastikan breadcrumb diproses sebagai Array
    const breadcrumbItems = Array.isArray(breadcrumb)
        ? breadcrumb
        : breadcrumb ? [breadcrumb] : [];

    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            
            <div id="pageheader-left" className="flex flex-col">
                <span id="pageheader-title" className="text-3xl font-semibold text-gray-800">
                    {title}
                </span>
                
                {/* Breadcrumb Links Dinamis */}
                {breadcrumbItems.length > 0 && (
                    <div id="breadcrumb-links" className="flex items-center space-x-2 mt-2 text-sm">
                        {breadcrumbItems.map((item, index) => (
                            <React.Fragment key={index}>
                                
                                {/* --- BAGIAN INI YANG KITA UBAH --- */}
                                <span 
                                    className={
                                        index === breadcrumbItems.length - 1 
                                        ? "text-black font-semibold" // <-- Jika ini kata terakhir, jadikan HITAM PEKAT
                                        : "text-gray-400 cursor-pointer hover:text-green-500 font-medium" // <-- Jika kata sebelumnya, tetap ABU-ABU
                                    }
                                >
                                    {item}
                                </span>
                                {/* --------------------------------- */}

                                {/* Munculkan garis miring "/" selama bukan item terakhir */}
                                {index < breadcrumbItems.length - 1 && (
                                    <span className="text-gray-400 font-medium">/</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>

            <div id="action-button">
                {children}
            </div>
        </div>
    );
}