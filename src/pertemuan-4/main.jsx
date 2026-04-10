import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminView from './AdminView'
import GuestView from './GuestView'
import "./tailwind.css"

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <div style={{ padding: '40px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <h1 className="text-3xl font-black mb-10 text-center text-blue-900">DASBOR LAYANAN SEHATINFO</h1>
        <AdminView />
        <div className="my-10 border-b border-gray-300"></div>
        <GuestView />
      </div>
    </React.StrictMode>
  )
} else {
  console.error("Elemen root tidak ditemukan!");
}