import React, { useState, useRef, useEffect } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Visibility, Edit, Delete, Close } from "@mui/icons-material";
import httpClient from "../../../Api/axios"; // Ensure this path is correct
const TestimonialList = () => {
  const [testimonialList, setTestimonialList] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewTestimonial, setViewTestimonial] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [newTestimonial, setNewTestimonial] = useState({
    id: null,
    name: "",
    position: "",
    feedback: "",
    image: "",
    status: "true",
  });
  const [errors, setErrors] = useState({});
  const [FormStatus, setFormStatus] = useState("Add Testimonial");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    getTestimonial();
  }, []);
  const getTestimonial = async () => {
    try {
      const res = await httpClient.get('/api/TestimonialMaster');
      console.log("Fetched Testimonial:", res.data);
      setTestimonialList(res.data); 
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };
  const handleChange = (e) => {
    setNewTestimonial({ ...newTestimonial, [e.target.name]: e.target.value });
  };
  const validateField = (fieldName) => {
    let errorMessage = "";
    if (!newTestimonial[fieldName]) {
      errorMessage = `${fieldName} is required`;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
  };
  const handleAddTestimonial = () => {
    setFormStatus("Add Testimonial");
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setNewTestimonial({
      id: null,
      name: "",
      position: "",
      feedback: "",
      image: "",
      status: "true",
    });
    setImage(null);
    setErrors({});
  };
  const handleView = (id) => {
    const testimonial = testimonialList.find((t) => t._id === id);
    setViewTestimonial(testimonial);
  };
  const handleEdit = (testimonial) => {
    setFormStatus("Update Testimonial");
    setNewTestimonial(testimonial);
    setImage(testimonial.image);
    setOpen(true);
  };
  const handleDelete = (testimonialId) => {
    setViewTestimonial(testimonialId);
    console.log(testimonialId);
    
    setDeleteConfirmationOpen(true);
  };
  useEffect(()=>{
    console.log(viewTestimonial);
  },[viewTestimonial])
  
  const confirmDelete = async  () => {
    console.log('viewTestimonial',viewTestimonial);
    
    // if (viewTestimonial !== null) {
      try {
        const response = await httpClient.delete(`/api/TestimonialMaster/${viewTestimonial}`);
       
         getTestimonial();
          
       alert("Testimonial deleted successfully");
        
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        alert("Failed to delete testimonial. Please try again.");
    }
    setDeleteConfirmationOpen(false);
    setViewTestimonial(null);
    //  }
  };
  
  const handleUpdate = async () => {
    if (!validateForm()) return;
    try {
      if (FormStatus === "Update Testimonial") {
        const response = await httpClient.put(`/api/TestimonialMaster`, newTestimonial);
        console.log("Testimonial updated successfully:", response.data);
        alert("Testimonial updated successfully");
      } else {
        const res = await httpClient.post('/api/TestimonialMaster', newTestimonial);
        console.log("Testimonial added successfully:", res.data);
        alert("Testimonial added successfully");
      }
      getTestimonial(); // Refresh the testimonial list
      handleCloseModal(); // Close the modal
    } catch (error) {
      console.error("Error updating/adding testimonial:", error);
      alert("Failed to update/add testimonial. Please try again.");
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await httpClient.post('/auth/file_upload', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImage(res.data.path);
        setNewTestimonial({ ...newTestimonial, image: res.data.path });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const validateForm = () => {
    let formErrors = {};
    if (!newTestimonial.name) formErrors.name = "Name is required";
    if (!newTestimonial.position) formErrors.position = "Position is required";
    if (!newTestimonial.feedback) formErrors.feedback = "Feedback is required";
    if (!newTestimonial.image) formErrors.image = "Image is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4 w-full">
      <Paper className="w-full max-w-6xl p-6 shadow-lg">
        <Typography variant="h5" className="text-center font-bold mb-4">
          Testimonial List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Position</strong></TableCell>
                <TableCell><strong>Feedback</strong></TableCell>
                <TableCell><strong>Image</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testimonialList && testimonialList.length > 0 ? (
                testimonialList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((testimonial) => (
                    <TableRow key={testimonial._id}>
                      <TableCell>{testimonial.name}</TableCell>
                      <TableCell>{testimonial.position}</TableCell>
                      <TableCell>{testimonial.feedback}</TableCell>
                      <TableCell>
                        <img src={testimonial.image} alt="Testimonial" className="w-16 h-16 object-cover" />
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-white ${testimonial.status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
                          {testimonial.status}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleView(testimonial._id)} color="primary" size="small">
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(testimonial)} color="primary" size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(testimonial._id)} color="error" size="small">
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Testimonials Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={testimonialList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) =>
              setRowsPerPage(parseInt(event.target.value, 10))
            }
          />
        </TableContainer>
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleAddTestimonial}
            variant="contained"
            color="primary"
            size="small"
          >
            Add Testimonial
          </Button>
        </div>
      </Paper>
      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this testimonial?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmationOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Add/Edit Testimonial Modal */}
      <Dialog open={open} onClose={handleCloseModal} maxWidth="sm">
        <DialogTitle>
          {FormStatus === "Update Testimonial"
            ? "Edit Testimonial"
            : "Add New Testimonial"}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            style={{ position: "absolute", top: 8, right: 8 }}
          >
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflowX: "hidden" }}>
          <form>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              name="name"
              value={newTestimonial.name}
              onChange={handleChange}
              onBlur={() => validateField("name")}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Position"
              fullWidth
              margin="normal"
              name="position"
              value={newTestimonial.position}
              onChange={handleChange}
              onBlur={() => validateField("position")}
              error={!!errors.position}
              helperText={errors.position}
            />
            <TextField
              label="Feedback"
              fullWidth
              margin="normal"
              name="feedback"
              value={newTestimonial.feedback}
              onChange={handleChange}
              onBlur={() => validateField("feedback")}
              error={!!errors.feedback}
              helperText={errors.feedback}
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Testimonial Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <div
                onClick={handleButtonClick}
                className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Upload Image
              </div>
              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="Testimonial Preview"
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                </div>
              )}
              {errors.image && (
                <p className="text-red-500 text-sm mt-2">{errors.image}</p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={newTestimonial.status}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </form>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            style={{ width: "200px" }}
          >
            {FormStatus === "Update Testimonial"
              ? "Update Testimonial"
              : "Add Testimonial"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default TestimonialList;