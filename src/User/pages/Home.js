import React from "react";
import Footer from '../components/Footer';
import {
  SupportAgent,
  Phone,
  People,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import httpClient from "../../Api/axios";
import { FaPiggyBank, FaLandmark, FaMoneyBillWave, FaCoins, FaUsers, FaHandHoldingUsd } from "react-icons/fa";
import { Info, PlayArrow } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  // Loan Types Section
  const loans = [
    { 
      title: "गोल्ड लोन", 
      desc: "सोनेतारण करांसाठी त्वरित मंजुरी", 
      image: "./img/gold.webp", 
      details: "गोल्ड लोनमध्ये आपल्याला कमी व्याजदरात त्वरित रोख मिळू शकतो."
    },
    { 
      title: "बचत खाते", 
      desc: "रु 1,50,000/- पर्यंत व्यक्तीगत वित्तपुरवठा कर्ज", 
      image: "./img/saving.webp", 
      details: "बचत खात्याच्या माध्यमातून आर्थिक सुरक्षितता मिळते."
    },
    { 
      title: "मुदत ठेव", 
      desc: "कॉंटॅक्ट रक्कमेच्या 75% ते 80% पर्यंत उपलब्ध", 
      image: "././img/i.webp", 
      details: "मुदत ठेव योजना आपल्याला उत्तम व्याजदर मिळवून देते."
    },
    { 
      title: "आवर्ती ठेव", 
      desc: "चारचाकी करांसाठी त्वरित मंजुरी", 
      image: "./img/aavrti.webp", 
      details: "आवर्ती ठेव योजनेत तुम्ही मासिक रक्कम भरू शकता."
    },
    { 
      title: "मालमत्तेवर कर्ज", 
      desc: "10 वर्षांसाठी मुदतीचे कर्ज, 12% व्याजदर", 
      image: "./img/home.webp", 
      details: "मालमत्तेवर कर्ज घेतल्यास तुम्ही १० वर्षांसाठी EMI भरू शकता."
    },
    { 
      title: "ठेवी विरुद्ध कर्ज", 
      desc: "LIC POLICY च्या वाराणावर कर्ज उपलब्ध", 
      image: "./img/estate.webp", 
      details: "LIC पॉलिसीच्या वाराणावर कर्ज घेणे सोपे आणि सोयीस्कर आहे."
    },
  ];

  // Services Section
  const services = [
    {
      icon: 'PL',
      title: 'PIGMI Loan',
      desc: 'Short-term loans against your PIGMI deposits',
      rate: ['50 days: 15% interest', '100 days: 20% interest'],
      iconColor: 'bg-blue-500', // Blue
    },
    {
      icon: 'RL',
      title: 'RD Against Loan',
      desc: 'Loans against your Recurring Deposit',
      rate: ['Interest Rate: 12% per year'],
      iconColor: 'bg-green-500', // Green
    },
    {
      icon: 'FL',
      title: 'FD Against Loan',
      desc: 'Loans against your Fixed Deposit',
      rate: ['Interest Rate: 14% to 18% per year'],
      iconColor: 'bg-purple-500', // Purple
    },
    {
      icon: 'GL',
      title: 'GFD Against Loan',
      desc: 'Loans against your Gold Fixed Deposit',
      rate: ['Interest Rate: 12% to 18% per year'],
      iconColor: 'bg-yellow-500', // Yellow
    },
    {
      icon: 'GPL',
      title: 'Gold PIGMI Loan',
      desc: 'Loans against your Gold PIGMI savings',
      rate: ['Interest Rate: 12% to 16% per year'],
      iconColor: 'bg-orange-500', // Orange
    },
    {
      icon: 'BL',
      title: 'Bachat Gat Loan',
      desc: 'Loans for Self Help Groups',
      rate: ['Interest Rate: 4% per month on reducing balance'],
      iconColor: 'bg-red-500', // Red
    },
  ];

  // Contact Section
  const contactOptions = [
    { 
      title: "ग्राहक सेवा केंद्र", 
      desc: "तुमच्या सर्व प्रश्नांसाठी आम्हाला संपर्क करा.", 
      icon: <SupportAgent sx={{ fontSize: 80, color: "#4CAF50", stroke: "black",strokeWidth: 1,  }} /> 
    },
    { 
      title: "फोन हेल्पलाइन", 
      desc: "तत्काळ मदतीसाठी कॉल करा.", 
      icon: <Phone sx={{ fontSize: 80, color: "#FF9800",stroke: "black",strokeWidth: 1,   }} /> 
    },
    { 
      title: "व्यक्तिगत मदत", 
      desc: "प्रत्यक्ष भेटीकरिता आमच्या शाखेत या.", 
      icon: <People sx={{ fontSize: 80, color: "#2196F3",stroke: "black",strokeWidth: 1,  }} /> 
    },
  ];

  const stats = [
    {
      icon: (
        <div style={{ fontSize: '80px', stroke: 'black', strokeWidth: '1px' }}>
          <FaPiggyBank style={{ fill: 'currentColor', stroke: 'black', strokeWidth: '1px' }} />
        </div>
      ),
      title: "PIGMI",
      desc: "Regular savings plan with flexible deposits",
      rate: "5.5% to 8.5% per year",
      iconColor: "bg-blue-500", // Blue
    },
    {
      icon: (
        <div style={{ fontSize: '80px', stroke: 'black', strokeWidth: '1px' }}>
          <FaLandmark style={{ fill: 'currentColor', stroke: 'black', strokeWidth: '1px' }} />
        </div>
      ),
      title: "Recurring Deposit",
      desc: "Fixed monthly deposits with attractive returns",
      rate: "8.5% per year",
      iconColor: "bg-green-500", // Green
    },
    {
      icon: (
        <div style={{ fontSize: '80px', stroke: 'black', strokeWidth: '1px' }}>
          <FaMoneyBillWave style={{ fill: 'currentColor', stroke: 'black', strokeWidth: '1px' }} />
        </div>
      ),
      title: "Fixed Deposit",
      desc: "Lump sum investment with higher returns",
      rate: "9% to 12% per year",
      iconColor: "bg-purple-500", // Purple
    },
    {
      icon: (
        <div style={{ fontSize: '80px', stroke: 'black', strokeWidth: '1px' }}>
          <FaCoins style={{ fill: 'currentColor', stroke: 'black', strokeWidth: '1px' }} />
        </div>
      ),
      title: "Gold FD",
      desc: "Secure investment backed by gold",
      rate: "9% to 12% per year",
      iconColor: "bg-yellow-500", // Yellow
    },
    {
      icon: (
        <div style={{ fontSize: '80px', stroke: 'black', strokeWidth: '1px' }}>
          <FaHandHoldingUsd style={{ fill: 'currentColor', stroke: 'black', strokeWidth: '1px' }} />
        </div>
      ),
      title: "Gold Pigmi",
      desc: "Gold-backed savings with flexible deposits",
      rate: "7.5% per year",
      iconColor: "bg-orange-500", // Orange
    },
    {
      icon: (
        <div style={{ fontSize: '80px', stroke: 'black', strokeWidth: '1px' }}>
          <FaUsers style={{ fill: 'currentColor', stroke: 'black', strokeWidth: '1px' }} />
        </div>
      ),
      title: "Self Help Group (Bachat Gat)",
      desc: "Group savings for community development",
      rate: "4% per year",
      iconColor: "bg-red-500", // Red
    },
  ];

  const [banners, setBanners] = useState([]);

  // Fetch banners from API
  const fetchBanners = async () => {
    try {
      const response = await httpClient.get('/api/BannerMaster');
      setBanners(response.data);
      console.log("Banners fetched:", response.data);
    } catch (error) {
      console.log("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-100 mt-6 w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={false}
          className="w-full mx-auto"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]"> 
                <img 
                  src={banner.image} 
                  alt="Banner" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 bg-black bg-opacity-50">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{banner.title}</h1>
                  <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg shadow-lg text-lg sm:text-xl">
                    अधिक माहिती
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Services Section */}
      <div className="w-full py-16 text-center px-4">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 w-full max-w-[95vw] mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {services?.map((service, index) => (
            <motion.div
              key={index}
              className="relative w-full p-6 border rounded-lg shadow-lg bg-white text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {/* Icon with Dynamic Glow */}
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:from-blue-600 group-hover:to-blue-700">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mt-3 text-gray-800">{service.title}</h3>

              {/* Description */}
              <p className="text-gray-600 mt-2 text-sm">{service.desc}</p>

              {/* Hover Overlay with Button */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                <motion.button
                  className="text-white font-semibold px-6 py-2 border border-white rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate("/services")}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Loan Types Section - FIXED FULL SCREEN */}
      <section className="bg-gray-100 py-16 w-full">
        <div className="w-full px-4 mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">कर्जाचे प्रकार</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8 w-full max-w-[95vw] mx-auto">
            {loans?.map((loan, index) => (
              <div 
                key={index} 
                className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full"
              >
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="mx-auto rounded-xl shadow-lg w-full h-56 object-cover mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{loan.title}</h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{loan.desc}</p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 ease-in-out text-lg w-full max-w-xs mx-auto"
                  onClick={() => navigate(`/loan/${encodeURIComponent(loan.title)}`)}
                >
                  अधिक माहिती मिळवा
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Stats Section */}
      <section className="w-full">
        <div className="relative bg-blue-800 text-white py-20 overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-700 to-blue-900 opacity-50"></div>

          <div className="w-full max-w-[95vw] mx-auto text-center relative z-10 px-4">
            <motion.h2
              className="text-4xl font-bold mb-12 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              आमच्या अतिरिक्त सेवा
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-8 w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {stats?.map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center text-center bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-transparent hover:border-white hover:bg-opacity-20 w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <div
                    className={`p-5 rounded-full ${stat.iconColor} text-white shadow-lg transition-all duration-300 group-hover:shadow-2xl`}
                  >
                    {stat.icon}
                  </div>

                  <h3 className="text-xl font-bold mt-4">{stat.title}</h3>

                  <p className="text-sm text-gray-300 mt-3">{stat.desc}</p>

                  <div className="mt-4 bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium text-white">
                    {stat.rate}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Institution Information Section */}
      <section className="bg-gray-100 py-16 w-full">
        <div className="w-full max-w-[95vw] mx-auto px-4">
          {/* Institution Info */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 flex flex-col lg:flex-row items-center gap-12 w-full mb-16">
            <div className="lg:w-2/3 w-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">संस्थेबद्दल माहिती थोडक्यात</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                आमची संस्था ही स्थापन झाल्यापासून ग्राहकांच्या आर्थिक विकासासाठी कटिबद्ध आहे. 
                स्थापनाकाळी संस्थेने छोट्या प्रमाणात सुरुवात केली, परंतु आता ती एका मोठ्या वित्तसंस्थेमध्ये विकसित झाली आहे.  
                संस्था ग्राहकांसाठी विविध वित्तीय सेवा पुरवते जसे की बचत खाते, कर्ज, आणि ऑनलाईन बँकिंग सुविधा. 
                आमच्या शाखांचे जाळे दिवसेंदिवस विस्तारत आहे.
              </p>
              <div className="flex gap-6 flex-wrap">
                <button className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-xl flex items-center text-lg font-semibold transition duration-300">
                  <Info fontSize="large" className="mr-3" /> अधिक वाचा
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center text-lg font-semibold transition duration-300">
                  <PlayArrow fontSize="large" className="mr-3" /> संस्थेची माहिती व्हिडिओ
                </button>
              </div>
            </div>
            <div className="lg:w-1/3 w-full flex justify-center">
              <img 
                src="./img/institution.webp" 
                alt="Institution" 
                className="rounded-2xl shadow-xl w-full max-w-md h-auto object-cover" 
              />
            </div>
          </div>

          {/* Mobile Banking Section */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 flex flex-col lg:flex-row items-center gap-12 w-full">
            <div className="lg:w-2/3 w-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">आता पतसंस्था तुमच्या मोबाईल वर</h2>
              <ul className="text-gray-600 list-disc pl-8 space-y-4 text-lg mb-8">
                <li className="text-xl">बचत खात्याची माहिती</li>
                <li className="text-xl">ऑनलाईन फंड ट्रान्सफर (IMPS / NEFT)</li>
                <li className="text-xl">कर्ज हप्ता भरणा</li>
                <li className="text-xl">स्टेटमेंट पाहा</li>
                <li className="text-xl">आपल्या खात्याचे संपूर्ण नियंत्रण आपल्या हातात</li>
              </ul>
              <div className="mt-6">
                <a href="#" className="inline-block">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png" 
                    alt="Google Play" 
                    className="w-64 h-auto" 
                  />
                </a>
              </div>
            </div>
            <div className="lg:w-1/3 w-full flex justify-center">
              <img 
                src="./img/mobile.jpg" 
                alt="Mobile App" 
                className="rounded-2xl shadow-xl w-72 h-auto object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="w-full py-16 bg-gray-50">
        <div className="w-full max-w-[95vw] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
            {contactOptions?.map((item, index) => (
              <div 
                key={index} 
                className="p-10 border-2 border-gray-200 rounded-2xl shadow-2xl text-center bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full"
              >
                <div className="text-6xl mx-auto mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{item.desc}</p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 ease-in-out text-lg w-full max-w-xs"
                  onClick={() => navigate(`/contact`)}
                >
                  अधिक माहिती
                </button>
              </div>
            ))}
          </div>

          {/* Terms & Conditions Section */}
          <div className="bg-white shadow-2xl rounded-2xl p-10 mt-20 w-full">
            <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
              📜 Terms & Conditions
            </h1>
            <p className="text-gray-600 text-center mb-10 text-xl">
              Below are the important terms and conditions for ARTHAGAM URBAN NIDHI LIMITED.
            </p>

            <div className="space-y-8">
              {[
                "Arthgam Urban Nidhi Limited are registered under the Companies Act, 2013. Every Nidhi company must comply with the regulations set forth in the Companies Act.",
                "The purpose of a Arthgam Urban Nidhi Limited is to encourage thrift and savings among its members. Arthgam Urban Nidhi Limited promote financial security through member-based savings and lending.",
                "Arthgam Urban Nidhi Limited are public companies and must end their name with 'Arthgam Urban Nidhi Limited'. It is mandatory for all Arthgam Urban Nidhi Limited to include 'Arthgam Urban Nidhi Limited' in their official name.",
                "Arthgam Urban Nidhi Limited can only receive deposits from and lend to their members for their mutual benefit. External transactions with non-members are strictly prohibited.",
                "Arthgam Urban Nidhi Limited cannot issue preference shares. They are restricted from issuing preference shares, debentures, or any other debt instruments."
              ].map((term, index) => (
                <div key={index} className="flex items-start space-x-6 bg-gray-50 p-6 rounded-xl">
                  <span className="text-blue-600 font-bold text-3xl flex-shrink-0">{index + 1}.</span>
                  <p className="text-gray-700 text-lg leading-relaxed">{term}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with larger text */}
      <div className="text-base sm:text-lg md:text-xl">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;