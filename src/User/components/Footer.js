import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Google, LinkedIn, Phone, LocationOn, Email } from "@mui/icons-material";
import httpClient from "../../Api/axios";
import { useTranslation } from "react-i18next"; // ✅ Import translation hook




const Footer = () => {
  const [address, setAddress] = useState([]);

  const { t } = useTranslation();
   const fetchAddress = async () => {
        try {
          const res = await httpClient.get('/api/AddressMaster');
          console.log('Fetched Address:', res.data);
          setAddress(res.data [0]);
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      };
      useEffect(() => {
        fetchAddress();
      }, []);

  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-16 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
        <div className="flex justify-center items-center mt-6 mr-64 mb-6">
  <img 
    src="./img/logo.png" // Replace with your logo path
    alt="संस्थेचा लोगो" 
    className="w-40 h-auto md:w-52" // Adjust size as needed
  />
</div>

          
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-orange-500 rounded-full hover:bg-orange-600">
              <Facebook />
            </a>
            <a href="#" className="p-2 bg-orange-500 rounded-full hover:bg-orange-600">
              <Google />
            </a>
            <a href="#" className="p-2 bg-orange-500 rounded-full hover:bg-orange-600">
              <LinkedIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-semibold text-orange-500">{t("quickLinks")}</h2>
          <ul className="mt-4 space-y-3">
            <li><a href="/" className="text-gray-300 hover:text-orange-500">{t("home")}</a></li>
            <li><a href="/aboutus" className="text-gray-300 hover:text-orange-500">{t("aboutUs")}</a></li>
            <li><a href="/services" className="text-gray-300 hover:text-orange-500">{t("services")}</a></li>
            <li><a href="/calculator" className="text-gray-300 hover:text-orange-500">{t("calculator")}</a></li>
            <li><a href="/contact" className="text-gray-300 hover:text-orange-500">{t("contact")}</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
        <h2 className="text-2xl font-semibold text-orange-500">{t("contactUs")}</h2>
          <p className="mt-4 text-gray-300">{t("companyName")}</p>
          <p className="mt-2 text-gray-300">{t("slogan")}</p>
      <div className="flex items-center mt-2 gap-3 text-gray-300">
        <Phone /> <span>{address?.phone}</span>
      </div>
      <div className="flex items-center mt-2 gap-3 text-gray-300">
        <LocationOn /> <span>{address?.address }</span>
      </div>
      <div className="flex items-center mt-2 gap-3 text-gray-300">
        <Email /> <span>{address?.email}</span>
      </div>
    </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10 text-center border-t border-gray-700 pt-5 text-gray-400">
        {t("copyright")} 2025. {t("designedBy")} <span className="text-orange-500">Zplus</span>
      </div>
    </footer>
  );
};

export default Footer;
