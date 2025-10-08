import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import httpClient from "../../Api/axios";
// const API_URL = "http://192.168.0.126:7878/api/ServicesMaster";
// const UPLOAD_URL = "http://192.168.0.126:7878/api/upload";
const ServicesMaster = () => {
  const [services, setServices] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({});


  const [currentService, setCurrentService] = useState({
    serviceName: "",
    serviceDescription: "",
    image: "",
    status: true,
  });



  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
 
  const fetchServices = async () => {
    try {
      const response = await httpClient.get('/api/ServicesMaster');
      setServices(response.data);
      setApiError("");
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };


  useEffect(() => {
    fetchServices();
  }, []);

  // Open Form
  const handleOpenForm = (service) => {
    if (service) {
      setCurrentService(service);
    } else {
      setCurrentService({  serviceName: "", serviceDescription: "", image: "", status: "true" });
    }
    setErrors({});
    setOpenForm(true);
  };




  const handleOpenDeleteDialog = (service) => {
    setServiceToDelete(service);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setServiceToDelete(null);
    setOpenDeleteDialog(false);
  };
  // Close Form
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  // Handle Input Change
  const handleChange = (e) => {
    e.persist(); // Prevents React from nullifying e
  
    console.log(e.target.value);
  
    setCurrentService((prevService) => ({
      ...prevService,
      [e.target.name]: e.target.value
    }));
  };
  
  useEffect(() => {
   console.log('currentService', currentService);
  }, [currentService]);
  // Handle Validation on Blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
    }
  };
  // Handle Image Selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  // Upload Image
  // const uploadImage = async () => {
  //   if (!selectedFile) return null;
  //   const formData = new FormData();
  //   formData.append("image", selectedFile);
  //   try {
  //     const response = await httpClient.post(UPLOAD_URL, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     const imageUrl = response.data.imageUrl;
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     setApiError("Failed to upload image.");
  //     return null;
  //   }
  // };
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
//validations
    if (!file) return;
    if (file.type !== "image/jpeg" && file.type !== "image/webp") {
      setErrors((prev) => ({
        ...prev,
        [type]: "Only JPEG and PNG images are allowed.",
      }));
      return;
    }
    const formDataUpload = new FormData();
    formDataUpload.append("image", file);
    try {
      const res = await httpClient.post("/auth/file_upload", formDataUpload);
      setCurrentService((prev) => ({
        ...prev,
        image: res.data.path,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrors((prev) => ({
        ...prev,
        [type]: "Error uploading file.",
      }));
    }
  };
  // Save Service
  const handleSaveService = async () => {
    const newErrors = {};
    if (!currentService.serviceName.trim()) newErrors.serviceName = "Service Name is required";
    if (!currentService.serviceDescription.trim()) newErrors.serviceDescription = "Description is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }



    // let imageUrl = currentService.image;
    // if (selectedFile) {
    //   imageUrl = await uploadImage();
    //   if (!imageUrl) return;
    // }
    // const serviceData = { ...currentService, image: imageUrl };


    try {
      if (currentService._id) {
        const response = await httpClient.put(`/api/ServicesMaster`, currentService);
      } else {
        const response = await httpClient.post(`/api/ServicesMaster`, currentService);
        console.log(response.data)
        // setServices((prev) => [...prev, response.data]);
      }
      fetchServices()
      handleCloseForm();
    } catch (error) {
      console.log("Error saving service:", error);
      setApiError("Failed to save service.");
    }
  };
  // Delete Service
  const handleDeleteService = async () => {
    if (!serviceToDelete) return;
    try {
      const response = await httpClient.delete(`/api/ServicesMaster/${serviceToDelete._id}`);
      // setServices((prev) => prev.filter((service) => service._id !== serviceToDelete._id));
      fetchServices()
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting service:", error);
      setApiError("Failed to delete service.");
    }
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" color="primary">
        Service Management
      </Typography>
      {apiError && <Typography color="error">{apiError}</Typography>}
     
      {loading ? (
        <Typography textAlign="center" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Service Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
              {services?.map((service) => (
                 <TableRow key={service?._id || Math.random()}>
                  <TableCell>{service.serviceName}</TableCell>
                  <TableCell>{service.serviceDescription}</TableCell>
                  <TableCell>
  {service?.image ? <img src={service.image} alt="Service" width="50" height="50" /> : "No Image"}
</TableCell>
                  <TableCell>{service.status ? "Active" : "Inactive"}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenForm(service)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(service)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
  <Button variant="contained" color="primary" onClick={handleOpenForm}>
    Add New Service
  </Button>
</Box>

      {/* Service Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>{currentService._id ? "Edit Service" : "Add New Service"}</DialogTitle>
        <DialogContent>
          <TextField label="Service Name" fullWidth margin="normal" name="serviceName" value={currentService.serviceName} onChange={handleChange} onBlur={handleBlur} error={!!errors.serviceName} helperText={errors.serviceName} />
          <TextField label="Description" fullWidth margin="normal" name="serviceDescription" value={currentService.serviceDescription} onChange={handleChange} onBlur={handleBlur} error={!!errors.serviceDescription} helperText={errors.serviceDescription} />
          {/* <TextField label="Image URL" fullWidth margin="normal" name="image" value={currentService.image} onChange={handleChange} onBlur={handleBlur} error={!!errors.image} helperText={errors.image} /> */}
        </DialogContent>
        <div className="w-[500px] ml-[22px]">
            <Typography>Upload Image:</Typography>
            <Button variant="contained" component="label">
              Select Image
              <input type="file" accept="image/png, image/jpeg, image/webp" hidden onChange={(e) => handleFileUpload(e, "image")} />
            </Button>
            {currentService.image && <img src={currentService.image} alt="Image" width={90} height={40} />}
        </div>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveService}>{currentService._id ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this service?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteService}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default ServicesMaster;