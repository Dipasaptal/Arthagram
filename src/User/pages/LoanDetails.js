import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import Footer from '../components/Footer';
import httpClient from "../../Api/axios";
import { KeyboardArrowUp } from "@mui/icons-material";



// Updated loan details with images
// const loanDetailsData = {
//   "गोल्ड लोन": {
//     details: "गोल्ड लोनमध्ये आपल्याला कमी व्याजदरात त्वरित रोख मिळू शकतो. यात त्वरित प्रक्रिया होते.",
//     image: "/img/gold.webp",
//   },
//   "बचत खाते": {
//     details: "बचत खात्याच्या माध्यमातून आर्थिक सुरक्षितता मिळते. हे खाते सुरक्षित ठेवा.",
//     image: "/img/saving.webp",
//   },
//   "मुदत ठेव": {
//     details: "मुदत ठेव योजना आपल्याला उत्तम व्याजदर मिळवून देते.",
//     image: "/img/i.webp",
//   },
//   "आवर्ती ठेव": {
//     details: "आवर्ती ठेव योजनेत तुम्ही मासिक रक्कम भरू शकता आणि जास्त बचत करू शकता.",
//     image: "/img/aavrti.webp",
//   },
//   "मालमत्तेवर कर्ज": {
//     details: "मालमत्तेवर कर्ज घेतल्यास तुम्ही १० वर्षांसाठी EMI भरू शकता.",
//     image: "/img/home.webp",
//   },
//   "ठेवी विरुद्ध कर्ज": {
//     details: "LIC पॉलिसीच्या वाराणावर कर्ज घेणे सोपे आणि सोयीस्कर आहे.",
//     image: "/img/estate.webp",
//   },
// };

const LoanDetails = () => {
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
  const { loanId } = useParams();
  const navigate = useNavigate();


  const[loanData, setLoanData]= useState({});
  
  // const loanData = loanDetailsData[loanTitle] || { details: "माहिती उपलब्ध नाही.", image: "/img/default.webp" };

const getSeviceById = async () =>{
try {
  const res = await httpClient.get(`/api/ServicesMaster/${loanId}`);
  setLoanData(res.data)
  console.log(res.data);
} catch (error) {
  console.log(error);
}
}

  useEffect(()=>{
getSeviceById();
  },[])





  return (
    <>
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        {loanData.serviceName}
      </Typography>

      {/* Display Loan Image */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
       <img src={loanData.image} alt={loanData.serviceName} style={{ width: "350px", height: "250px", borderRadius: "8px" }} />
      </Box>

      {/* Loan Details Box */}
      <Box sx={{ p: 3, backgroundColor: "#f9f9f9", borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="body1" fontSize="18px">
          {loanData.serviceDescription
          }
        </Typography>
      </Box>

      {/* Back Button */}
      <Button variant="contained" color="secondary" sx={{ mt: 3 }} onClick={() => navigate("/")}>
        मागे जा
      </Button>
    </Container>
   
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

export default LoanDetails;
