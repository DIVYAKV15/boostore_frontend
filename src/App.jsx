import React, { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import AllBooks from './users/pages/AllBooks'
import Careers from './users/pages/Careers'
import Contact from './users/pages/Contact'
import ViewBook from './users/pages/ViewBook'
import Profile from './users/pages/Profile'
import PageNotFound from './pages/PageNotFound'
import Preloader from './components/Preloader'
import AdminHome from './admin/pages/AdminHome'
import AdminBooks from './admin/pages/AdminBooks'
import AdminCareers from './admin/pages/AdminCareers'
import AdminSettings from './admin/pages/AdminSettings'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentFail from './users/pages/PaymentFail'

function App() {
  // const[isLoading,setisloading]=useState(false) ->mam;s state names
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsDataLoaded(true)
    }, 7000);
  })
  return (
    <>

      <Routes>
        {/* <Route path='/' element={<LandingPage />} /> */}
        <Route path='/' element={isDataLoaded ? <LandingPage /> : <Preloader />} />
        <Route path='/login' element={<Auth />} />
        {/* reusing auth component by conditional rendering to register page */}
        {/* register is props as key and values are same name we can just pass that or else register:true */}
        <Route path='/register' element={<Auth register />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/view-book/:id' element={<ViewBook />} />
        <Route path='/profile' element={<Profile />} />
        {/* these interfaces are to display depends upon payment  */}
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-fail' element={<PaymentFail />} />

        {/* path for admin pages */}
        <Route path='/admin-home' element={<AdminHome />} />
        <Route path='/admin-books' element={<AdminBooks />} />
        <Route path='/admin-careers' element={<AdminCareers />} />
        <Route path='/admin-setting' element={<AdminSettings />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </>

  )
}

export default App
