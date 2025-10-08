import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Import i18n configuration

import Header from "./User/components/Header";
import Footer from "./User/components/Footer";
import Home from "./User/pages/Home";
import AboutUs from "./User/pages/AboutUs";
import Calculator from "./User/pages/Calculator";
import Services from "./User/pages/Services";
import Contact from "./User/pages/Contact";
import LoanDetails from "./User/pages/LoanDetails";

// Admin imports
import Dashboard from './Admin/components/Dashboard';
import Sidebar from './Admin/components/Sidebar';
import BannerMaster from "./Admin/components/BannerMaster";
import AboutUsMaster from "./Admin/components/AboutUsMaster/AboutUsMaster";
import CategoryMaster from "./Admin/components/CategoryMaster/CategoryMaster";
import Login from "./Admin/pages/Login";
import ContactMasterList from "./Admin/components/ContactMaster/ContactMasterList";
import AddressMasterList from './Admin/components/AddressMaster/AddressMasterList';
import ForgotPassword from './Admin/pages/ForgotPassword';
import ResetPassword from "./Admin/pages/ResetPassword";
import ServicesMaster from "./Admin/components/ServicesMaster";
import SocialMedia from "./Admin/components/SocialMedia";
import TestimonialMasterList from './Admin/components/TestimonialMaster/TestimonialMasterList';

const App = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          {/* User Panel (Default Route) */}
          <Route path='/' element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/loan/:loanId" element={<LoanDetails />} />
          </Route>

          {/* Admin Panel */}
          <Route path='/admin' element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path='bannermaster' element={<BannerMaster />} />
            <Route path="contactmasterlist" element={<ContactMasterList />} />
            <Route path="addressmasterlist" element={<AddressMasterList />} />
            <Route path='testimonialmasterlist' element={<TestimonialMasterList />} />
            <Route path='servicemaster' element={<ServicesMaster />} />
            <Route path='socialmedia' element={<SocialMedia />} />
            <Route path='aboutusmaster' element={<AboutUsMaster />} />
            <Route path='categorymaster' element={<CategoryMaster />} />
          </Route>

          {/* Login Pages */}
          <Route path='/login' Component={Login} />
          <Route path='/forgotpassword' Component={ForgotPassword} />
          <Route path="/reset_password/:email" element={<ResetPassword />} />
        </Routes>

        {/* <Footer /> */}
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
