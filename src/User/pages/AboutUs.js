import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import httpClient from "../../Api/axios"; 
import Footer from '../components/Footer';
import { KeyboardArrowUp } from "@mui/icons-material";
import { useTranslation } from "react-i18next"; 



const AboutUs = () => {

  const [showButton, setShowButton] = useState(false);

  const { t } = useTranslation(); 

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


  const [aboutData, setAboutData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch API Data
  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchAboutUs = async () => {
     try {
       const response = await httpClient.get('/api/AboutUs');
       setAboutData(response.data[0] );
       console.log(response.data)
         } catch (error) {
       console.log("Error fetching About Us records:", error);
     }
   };
  return (
    <>
      {/* Title Section */}
      <Box display="flex" justifyContent="center" alignItems="center" height="10vh" mt={8}>
        <Typography 
          variant="h4" 
          textAlign="center" 
          fontWeight="bold"
          sx={{
            borderBottom: "3px solid #FF5722",
            display: "inline-block",
            pb: 1,
          }}
        >
          {aboutData.title ||  t("aboutUs")}
        </Typography>
      </Box>

      {/* Content Section */}
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Grid container spacing={4} maxWidth="lg">
          {/* Left Column - Image */}
          <Grid item xs={12} md={4}>
            <Paper
              // elevation={5}
              // sx={{
              //   backgroundColor: "#0D47A1",
              //   color: "white",
              //   textAlign: "center",
              //   p: 3,
              //   borderRadius: 2,
              //   height: "50%",
              // }}
            >
              {/* Organization Logo (From API) */}
              <Box 
                  sx={{ 
                display: "flex", 
                 justifyContent: "center", 
                 alignItems: "center", 
                   mt: 4, 
                   width: "100%", 
                   height: "200px" // ✅ Adjust height as needed
                  }}
                   >
  {aboutData.image ? (
    <img 
      src={aboutData.image} // ✅ API Image
      alt="Organization Logo" 
      style={{ 
        width: "90%",  // ✅ Slightly reduced width for better fit
        maxWidth: "400px", // ✅ Prevents it from getting too large
        height: "100%", // ✅ Maintains aspect ratio
        objectFit: "contain", // ✅ Ensures image fits within the box without cropping
        borderRadius: "8px" 
      }} 
      onError={(e) => (e.target.src = "/default-logo.jpg")} // ✅ Fallback logo
    />
  ) : (
    <Typography color="white" fontWeight="bold">{t("noImage")}</Typography>
  )}
</Box>

            </Paper>
          </Grid>

          {/* Right Column - Description */}
          <Grid item xs={12} md={8}>
  {error ? (
    <Typography variant="h6" color="error" textAlign="center">
      {error}
    </Typography>
  ) : (
    aboutData.description ? (
      <Typography 
        variant="body1" 
        mt={2} 
        dangerouslySetInnerHTML={{ __html: aboutData.description }} // ✅ Bind HTML content
      />
    ) : (
      <Typography variant="body1" mt={2}>
      {t("noDescription")}
      </Typography>
    )
  )}

  
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <KeyboardArrowUp fontSize="large" />
      </button>
    
</Grid>


        </Grid>
       
      </Box>
      <Footer />
    </>
  );
};

export default AboutUs;
