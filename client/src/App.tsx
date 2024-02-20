import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { Routes, Route } from "react-router-dom"
import Landing from './components/landing'
import Chat  from './pages/Chat'

function App() {

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-between px-6 md:px-24 py-4'>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="about" element={<Sidebar />} /> */}
          <Route path="chat" element={<Chat />} />
        </Routes>
      </div>
    </>
  )
}

export default App
