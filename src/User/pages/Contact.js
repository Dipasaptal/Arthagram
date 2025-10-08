import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from '../components/Footer';
import httpClient from "../../Api/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KeyboardArrowUp } from "@mui/icons-material";
import { useTranslation } from "react-i18next"; 


const Contact = () => {
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

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [address, setAddress] = useState([]);

  const fetchAddress = async () => {
    try {
      const res = await httpClient.get('/api/AddressMaster');
      setAddress(res.data[0]);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const validateField = (name, value) => {
    let errorMsg = "";
    if (!value.trim()) {
      errorMsg = "हे आवश्यक आहे";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMsg = "कृपया योग्य ई-मेल टाका";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name.trim() ? "" : "हे आवश्यक आहे",
      email: formData.email.trim() ? (/(\S+@\S+\.\S+)/.test(formData.email) ? "" : "कृपया योग्य ई-मेल टाका") : "हे आवश्यक आहे",
      message: formData.message.trim() ? "" : "हे आवश्यक आहे",
    };
    setErrors(newErrors);
    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      try {
        await httpClient.post('/api/ContactFormMaster', formData);
        toast.success("तुमचा संदेश पाठवला गेला आहे!");
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        toast.error("संदेश पाठवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
      }
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 border-b-4 border-orange-500 inline-block pb-2">
        {t("contactUs")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg rounded-lg p-6">
            <CardContent>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t("reachUs")}</h3>
              <p className="text-gray-600 mb-4">{t("contactDesc")}</p>
              <div className="flex items-center gap-4 mb-3">
                <Phone size={24} className="text-orange-500" />
                <p className="text-gray-700">{address?.phone}</p>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <Mail size={24} className="text-orange-500" />
                <p className="text-gray-700">{address?.email}</p>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-orange-500" />
                <p className="text-gray-700">{address?.address}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-lg p-6">
            <CardContent>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t("sendMessage")}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <TextField label={t("name")}  name="name" fullWidth variant="outlined" value={formData.name} onChange={handleChange} onBlur={handleBlur} error={!!errors.name} helperText={errors.name} required />
                <TextField label={t("email")}  name="email" fullWidth variant="outlined" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={!!errors.email} helperText={errors.email} required />
                <TextField label={t("message")}name="message" fullWidth multiline rows={4} variant="outlined" value={formData.message} onChange={handleChange} onBlur={handleBlur} error={!!errors.message} helperText={errors.message} required />
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={!!errors.name || !!errors.email || !!errors.message}>
                {t("submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10">
          <iframe className="w-full h-80 shadow-md rounded-lg" src="https://www.google.com/maps/embed?..." allowFullScreen loading="lazy"></iframe>
        </div>
      </div>
      {showButton && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600">
          <KeyboardArrowUp fontSize="large" />
        </button>
      )}
      <Footer />
    </>
  );
};

export default Contact;
