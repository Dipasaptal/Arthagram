import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Email, Phone, Menu, Close } from "@mui/icons-material";
import { Facebook, Instagram } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translation hook

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); 
  const menuRef = useRef(null); // Reference for detecting outside clicks
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
  }, []);
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
    window.location.reload(); // Force re-render to reflect changes
  };
  
  return (
    <div className="flex flex-col">
      <header className="w-full">
        {/* Top Bar */}
        <div className="bg-gray-900 text-white text-sm md:text-base py-3 px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Left - Contact Info */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-center">
            <span className="flex items-center space-x-2">
              <Phone fontSize="medium" />
              <span className="font-semibold">8779714870</span>
            </span>
            <span className="flex items-center space-x-2">
              <Email fontSize="medium" />
              <span className="font-semibold">ashwini@arthgam.com</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="font-semibold">{t("cin")}: U65990MH2022PLN394182</span>
            </span>
          </div>

          {/* ✅ Blinking Download APK Button */}
          <div className="w-full md:w-auto flex justify-center md:justify-end mt-3 md:mt-0">
            <a
              href="/path-to-apk/ArthgamNidhi.apk"
              download
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all animate-blink"
            >
              📥 Download Android Application
            </a>
          </div>


{/* Language Dropdown */}
<select onChange={(e) => i18n.changeLanguage(e.target.value)} value={i18n.language}
            className="border border-gray-300 rounded-md px-3 py-1 text-black bg-white focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="en">English</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>
          {/* Right - Social Media */}
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-yellow-500">
              <Facebook fontSize="medium" />
            </a>
            <a href="#" className="hover:text-yellow-500">
              <Instagram fontSize="medium" />
            </a>
          </div>

          {/* ✅ Keyframes for Blinking Effect */}
          <style>
            {`
              @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
              }
              .animate-blink {
                animation: blink 1s infinite;
              }
            `}
          </style>
        </div>

        {/* Navbar */}
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
          {/* Logo */}
          <div className="flex items-center space-x-3">
  <img src="./img/logo.png" alt="Logo" className="h-20" />
  <div className="text-center px-4">
  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-wide leading-snug">
                {t("companyName")}
              </h1>
              <h6 className="text-base sm:text-xl font-medium text-gray-700 italic mt-2">
                {t("slogan")}
              </h6>
  </div>
</div>


          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-8 text-lg font-semibold text-gray-700">
            <button onClick={() => navigate("/")} className="hover:text-orange-600">{t("HOME")}</button>
            <button onClick={() => navigate("/aboutus")} className="hover:text-orange-600">{t("ABOUT US")}</button>
            <button onClick={() => navigate("/services")} className="hover:text-orange-600">{t("SERVICES")}</button>
            <button onClick={() => navigate("/contact")} className="hover:text-orange-600">{t("CONTACT")}</button>
            <button 
              onClick={() => navigate("/calculator")} 
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300"
            >
              📊 {t("calculator")}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <Close fontSize="large" /> : <Menu fontSize="large" />}
          </button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div ref={menuRef} className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-5 py-6 text-lg font-semibold text-gray-700 md:hidden z-50">
              <button onClick={() => { navigate("/"); setIsMenuOpen(false); }} className="hover:text-orange-600">HOME</button>
              <button onClick={() => { navigate("/aboutus"); setIsMenuOpen(false); }} className="hover:text-orange-600">ABOUT US</button>
              <button onClick={() => { navigate("/services"); setIsMenuOpen(false); }} className="hover:text-orange-600">SERVICES</button>
              <button onClick={() => { navigate("/contact"); setIsMenuOpen(false); }} className="hover:text-orange-600">CONTACT</button>
              <button 
              onClick={() => navigate("/calculator")} 
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300"
            >
              📊 {t("calculator")}
            </button>
            </div>
          )}
        </nav>
      </header>

      <Outlet/>
    </div>
  );
};

export default Header;
