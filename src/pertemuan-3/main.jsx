import React from 'react'
import ReactDOM from 'react-dom/client'
// Mengimpor komponen FormSehatInfo yang baru dibuat
import FormSehatInfo from './components/FormSehatInfo' 
import "./tailwind.css";

// Mengimpor file CSS utama kamu (pastikan namanya sesuai, biasanya index.css atau App.css)
// Ini penting agar Tailwind CSS-nya berfungsi!
// import '../index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FormSehatInfo />
  </React.StrictMode>,
)