import React from 'react'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { Routes } from "react-router-dom"
import { Route } from 'react-router-dom'
import { getCurrentUser } from './services/api.js'
import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import History from './pages/History.jsx'
import Notes from './pages/Notes.jsx'
import Pricing from './pages/Pricing.jsx'
export const serverUrl = "http://localhost:8000"
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentFailed from './pages/PaymentFailed.jsx'
function App() {
  const dispatch = useDispatch()
  const {userData} = useSelector((state)=>state.user)
  useEffect(() => {
    getCurrentUser(dispatch)
  }, [dispatch])
  
  return (
    <>
    <Routes>
        <Route path="/" element={userData ? <Home/> : <Auth/>}/>
        <Route path="/auth" element={userData ? <Home/> : <Auth/>}/>
        <Route path="/history" element={userData ? <History/> : <Auth/>}/>
        <Route path="/notes" element={userData ? <Notes/> : <Auth/>}/>
        <Route path="/pricing" element={userData ? <Pricing/> : <Auth/>}/>
        <Route path="/payment-success" element={userData ? <PaymentSuccess/> : <Auth/>}/>
        <Route path="/payment-failed" element={userData ? <PaymentFailed/> : <Auth/>}/>
       
    </Routes>
    </>
  )
}

export default App
