import { useState } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdSearch, 
    MdSend, 
    MdMoreVert, 
    MdDoneAll, 
    MdImage, 
    MdSentimentSatisfied,
    MdOutlineChatBubbleOutline,
    MdMarkEmailUnread,
    MdOutlinePeopleAlt
} from "react-icons/md";
import messagesData from "../data/messages.json";

export default function Messages() {
    const [messages] = useState(messagesData);
    const [activeChat, setActiveChat] = useState(messages[0]);
    const [searchTerm, setSearchTerm] = useState("");

    // --- KALKULASI STATISTIK ---
    const totalUnread = messages.reduce((acc, curr) => acc + (curr.unread || 0), 0);
    const activeOnline = Math.floor(messages.length * 0.7); // Mock data pelanggan aktif

    // Filter daftar pesan berdasarkan pencarian
    const filteredMessages = messages.filter(msg => 
        msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
        msg.lastMsg.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Messages Hub" breadcrumb={["Dashboard", "Messages"]} />

            {/* --- ANALYTICS SUMMARY CARDS --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
                        <MdOutlineChatBubbleOutline />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Conversations</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{messages.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#B01030] flex items-center justify-center text-2xl">
                        <MdMarkEmailUnread />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Unread Messages</p>
                        <h3 className="text-3xl font-black text-[#B01030] leading-none">{totalUnread}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-2xl">
                        <MdOutlinePeopleAlt />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Active Now</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{activeOnline}</h3>
                    </div>
                </div>
            </div>

            {/* --- MAIN CHAT CONTAINER --- */}
            <div className="flex h-[600px] mx-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                
                {/* Sidebar Daftar Pesan */}
                <div className="w-1/3 border-r border-gray-50 flex flex-col bg-white">
                    <div className="p-6 border-b border-gray-50 bg-white/50 backdrop-blur-md">
                        <h2 className="text-xl font-black text-gray-900 mb-4">Chat List</h2>
                        <div className="relative group">
                            <MdSearch className="absolute left-4 top-3.5 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                            <input 
                                className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all placeholder-gray-400" 
                                placeholder="Search sender or message..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto divide-y divide-gray-50 scrollbar-hide">
                        {filteredMessages.length > 0 ? filteredMessages.map(msg => (
                            <div key={msg.id} onClick={() => setActiveChat(msg)} 
                                 className={`p-6 cursor-pointer transition-all group ${activeChat.id === msg.id ? 'bg-red-50/30 border-l-4 border-l-[#B01030]' : 'hover:bg-gray-50/80 border-l-4 border-l-transparent'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black shadow-inner transition-colors ${activeChat.id === msg.id ? 'bg-gradient-to-br from-[#B01030] to-[#8e0d27] text-white shadow-red-900/20' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                                        {msg.avatar}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`text-[14px] font-black truncate ${activeChat.id === msg.id ? 'text-[#B01030]' : 'text-gray-900'}`}>{msg.sender}</span>
                                            <span className="text-[10px] font-bold text-gray-400 shrink-0 tracking-wide">{msg.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs font-bold text-gray-500 truncate w-4/5">{msg.lastMsg}</p>
                                            {msg.unread > 0 && <span className="bg-[#B01030] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shrink-0 shadow-sm">{msg.unread}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="p-10 text-center text-gray-400 font-bold text-sm">Pesan tidak ditemukan.</div>
                        )}
                    </div>
                </div>

                {/* Area Chat Utama */}
                <div className="w-2/3 flex flex-col bg-[#F4F7FE]/50 relative">
                    {/* Header Chat */}
                    <div className="p-6 bg-white border-b border-gray-50 flex justify-between items-center shadow-sm z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B01030] to-[#8e0d27] text-white flex items-center justify-center font-black text-lg shadow-inner">
                                {activeChat?.avatar}
                            </div>
                            <div>
                                <p className="font-black text-gray-900 text-[15px]">{activeChat?.sender}</p>
                                <p className="text-[11px] font-bold text-green-500 flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-[#B01030] hover:bg-red-50 rounded-xl transition-all"><MdSearch size={22} /></button>
                            <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"><MdMoreVert size={22} /></button>
                        </div>
                    </div>
                    
                    {/* Riwayat Chat */}
                    <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-6">
                        {activeChat?.chatHistory && activeChat.chatHistory.length > 0 ? (
                            activeChat.chatHistory.map((chat, index) => (
                                <div key={index} className={`flex gap-4 ${chat.type === 'outgoing' ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-black text-gray-500 shrink-0 shadow-sm">
                                        {chat.type === 'incoming' ? activeChat.avatar : "Me"}
                                    </div>
                                    <div className={`p-5 rounded-2xl shadow-sm max-w-md ${chat.type === 'outgoing' ? 'bg-gradient-to-br from-[#B01030] to-[#8e0d27] rounded-tr-none text-white' : 'bg-white rounded-tl-none border border-gray-100 text-gray-700'}`}>
                                        <p className="text-[13px] font-bold leading-relaxed">{chat.text}</p>
                                        <span className={`text-[10px] font-black block mt-2 ${chat.type === 'outgoing' ? 'text-red-200 text-right' : 'text-gray-400'}`}>
                                            {chat.time} {chat.type === 'outgoing' && <MdDoneAll className="inline ml-1 text-sm" />}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <MdOutlineChatBubbleOutline className="text-5xl mb-3 text-gray-300" />
                                <p className="font-bold text-sm">Belum ada riwayat percakapan.</p>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-5 bg-white border-t border-gray-50 flex gap-3 items-center z-10">
                        <button className="p-2 text-gray-400 hover:text-[#B01030] hover:bg-red-50 rounded-xl transition-all"><MdImage size={22} /></button>
                        <button className="p-2 text-gray-400 hover:text-[#B01030] hover:bg-red-50 rounded-xl transition-all"><MdSentimentSatisfied size={22} /></button>
                        <input 
                            className="flex-1 py-3 px-5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all placeholder-gray-400" 
                            placeholder="Ketik pesan balasan..." 
                        />
                        <button className="bg-[#B01030] text-white p-3.5 rounded-xl hover:bg-[#8e0d27] hover:shadow-lg hover:shadow-red-900/20 transition-all active:scale-95 flex items-center justify-center">
                            <MdSend size={20} className="ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}