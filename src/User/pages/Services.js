import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { KeyboardArrowUp } from "@mui/icons-material";
import { Percent } from "@mui/icons-material"; 
import { useTranslation } from "react-i18next"; 




const Services = () => {
  const { t } = useTranslation(); 

  
const services = [
  { icon: '📥', title: t("pigmi"), desc: t("pigmiDesc"), rate: t("pigmiRate") },
  { icon: '📅', title: t("rd"), desc: t("rdDesc"), rate: t("rdRate") },
  { icon: '💰', title: t("fd"), desc: t("fdDesc"), rate: t("fdRate") },
  { icon: '🥇', title: t("goldFd"), desc: t("goldFdDesc"), rate: t("goldFdRate") },
  { icon: '🪙', title: t("goldPigmi"), desc: t("goldPigmiDesc"), rate: t("goldPigmiRate") },
  { icon: '🤝', title: t("bachatGat"), desc: t("bachatGatDesc"), rate: t("bachatGatRate") },
];
// Loan Data
const loans = [
  { icon: '🏦', title: t("pigmiLoan"), desc: t("pigmiLoanDesc"), rate: t("pigmiLoanRate") },
  { icon: '💳', title: t("rdLoan"), desc: t("rdLoanDesc"), rate: t("rdLoanRate") },
  { icon: '🔐', title: t("fdLoan"), desc: t("fdLoanDesc"), rate: t("fdLoanRate") },
  { icon: '🏅', title: t("goldFdLoan"), desc: t("goldFdLoanDesc"), rate: t("goldFdLoanRate") },
  { icon: '⚖️', title: t("goldPigmiLoan"), desc: t("goldPigmiLoanDesc"), rate: t("goldPigmiLoanRate") },
  { icon: '💼', title: t("bachatGatLoan"), desc: t("bachatGatLoanDesc"), rate: t("bachatGatLoanRate") },
];

const goals = [
  { number: "1500+", text: t("shareHolders") },
  { number: "100+", text: t("bachatGat") },
  { number: "50+", text: t("smallBusinesses") },
  { number: "50+", text: t("newProducts") },
  { number: "₹3 Cr", text: t("capitalGrowth") },
];
  const [showButton, setShowButton] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  return (
    <>
      <div maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <div className="bg-white text-black font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-700 to-blue-900 text-white py-6 text-center shadow-md">
        <motion.div 
          className="container mx-auto px-5 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src="./img/logo.png" alt="Logo" className="max-h-14 mb-3" />
          <h1 className="text-2xl font-bold">{t("companyName")}</h1>
          <p className="italic text-lg">{t("slogan")}</p>
        </motion.div>
        
      </header>
      <div
      className="company-details"
      style={{
        backgroundColor: "#FFD700", 
        padding: "10px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "16px",
        marginLeft: "4px"
      }}
    >
                <div className="container flex justify-center items-center">
            <div>{t("CIN NO")}: U62990MH2022PLN394182 | {t("PAN")}: AAXCA9563C | {t("TAN")}: MUMA70810F</div>
          </div>

    </div>


      {/* Services Section */}
      {/* Services Section */}
      <section className="py-10 bg-gray-50">
          <motion.h2 className="text-3xl text-blue-900 font-bold text-center mb-10">
            {t("ourServices")}
          </motion.h2>
          <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:-translate-y-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-black-900">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.desc}</p>
                <div className="mt-3 bg-blue-100 px-3 py-2 rounded-md text-sm font-semibold">
                  {t("interestRate")}: <span className="text-black-600">{service.rate}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      {/* Loan Services Section */}
     <section className="py-10 bg-blue-50">
          <motion.h2 className="text-3xl text-blue-900 font-bold text-center mb-10">
            {t("ourLoanServices")}
          </motion.h2>
          <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loans.map((loan, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:-translate-y-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                  {loan.icon}
                </div>
                <h3 className="text-xl font-bold text-black-900">{loan.title}</h3>
                <p className="text-gray-600 mt-2">{loan.desc}</p>
                <div className="mt-3 bg-blue-100 px-3 py-2 rounded-md text-sm font-semibold">
                  {loan.rate}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

    </div>

    <div className="mt-6">
      {/* Title for the Table */}
      <Typography 
        variant="h6" 
        className="flex items-center justify-center font-bold text-purple-600 mb-4"
      >
        <span>कर्जाचे व्याजदर</span>
      </Typography>
        {/* Service Rates Table */}
        <TableContainer 
  component={Paper} 
  sx={{ 
    mb: 4, 
    mt: 4, 
    maxWidth: "80%",  
    mx: "auto",      
    p: 2,            
    boxShadow: 3,    
  }}
>
  <Table size="medium"> {/* This makes the table compact */}
    <TableHead>
      <TableRow>
        <TableCell>सेवा</TableCell>
        <TableCell align="right">दर</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>PIGMI</TableCell>
        <TableCell align="right">5.5% to 8.5%/yr interest</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>RD</TableCell>
        <TableCell align="right">8.5% / yr interest</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>FD</TableCell>
        <TableCell align="right">9 to 12% /yr interest</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Gold FD</TableCell>
        <TableCell align="right">9 to 12%/ yr interest</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Gold Pigmi</TableCell>
        <TableCell align="right">7.5%/year interest</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Self Help Group (Bachat Gat)</TableCell>
        <TableCell align="right">4% interest</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
</div>

{/* {Goal section} */}
<section className="bg-yellow-600 text-white py-12">
    <motion.h2 className="text-3xl font-bold text-center mb-10">
    {t("OurGoals")}
    </motion.h2>
    <div className="container mx-auto px-5 flex flex-wrap justify-center gap-8">
      {goals.map((goal, index) => (
        <motion.div
          key={index}
          className="bg-blue-600 backdrop-blur-md rounded-lg p-6 text-center w-48 shadow-md hover:shadow-xl"
          whileHover={{ scale: 1.1 }}
        >
          <div className="text-3xl font-bold text-yellow-400">{goal.number}</div>
          <p className="mt-2 text-sm">{goal.text}</p>
        </motion.div>
      ))}
    </div>
  </section>
      </div>
      
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <KeyboardArrowUp fontSize="large" />
      </button>
   
      <Footer />
    </>
  );
};

export default Services;
