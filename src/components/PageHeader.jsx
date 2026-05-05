import React from "react";

export default function PageHeader({ title, breadcrumb, children }) {
    // Memastikan breadcrumb diproses sebagai Array
    const breadcrumbItems = Array.isArray(breadcrumb)
        ? breadcrumb
        : breadcrumb ? [breadcrumb] : [];

    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4 px-8 font-nunito">
            
            <div id="pageheader-left" className="flex flex-col">
                {/* Ukuran title diubah ke text-[32px] dengan warna gelap #202224 */}
                <span id="pageheader-title" className="text-[32px] font-bold text-[#202224] tracking-tight">
                    {title}
                </span>
                
                {/* Breadcrumb Links Dinamis */}
                {breadcrumbItems.length > 0 && (
                    <div id="breadcrumb-links" className="flex items-center space-x-2 mt-1 text-[14px]">
                        {breadcrumbItems.map((item, index) => (
                            <React.Fragment key={index}>
                                
                                <span 
                                    className={
                                        index === breadcrumbItems.length - 1 
                                        ? "text-[#B01030] font-bold" // Jika kata terakhir, warna MERAH #B01030
                                        : "text-gray-400 font-medium cursor-pointer hover:text-[#B01030]" // Sebelumnya abu-abu
                                    }
                                >
                                    {item}
                                </span>

                                {/* Separator garis miring "/" */}
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