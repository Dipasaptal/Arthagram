import React, { useState, useEffect,useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import httpClient from "../../../Api/axios";


const AboutUsMaster = () => {
  const [aboutData, setAboutData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [loading, setLoading] = useState(false); 


  const modules = {
    toolbar: [
      [{ bold: true }, { italic: true }, { underline: true }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["clean"],
    ],
  };

  // ✅ Fetch all records on component mount
  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchAboutUs = async () => {
    try {
      const response = await httpClient.get('/api/AboutUs');
      console.log(response.data)
      setAboutData(response.data || []);
        } catch (error) {
      console.log("Error fetching About Us records:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


    const fileInputRefCover = useRef(null);
  
    // Function to trigger hidden file input
    const handleButtonClickCover = () => {
      fileInputRefCover.current.click();
    };
  
    // Handle Image Upload
   // Handle Image Upload
const handleFileChange = async (event) => {
  event.preventDefault();
  const file = event.target.files[0];

  if (!file) return;

  const formDataData = new FormData();
  formDataData.append("image", file);

  try {
    setLoading(true);
    const res = await httpClient.post('/auth/file_upload', formDataData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data?.path) {
      setFormData((prev) => ({ ...prev, image: res.data.path })); 
    }
  } catch (error) {
    console.log("Error uploading image:", error);
  } finally {
    setLoading(false);
  }
};

    
  
  // Open dialog for Add/Edit
  const handleOpenDialog = (item = null) => {
    if (item) {
      setFormData({
        id: item._id,
        title: item.title,
        description: item.description,
        image: item.image,
      });
      setIsEditing(true);
    } else {
      setFormData({
        id: "",
        title: "",
        description: "",
        image: "",
      });
      setIsEditing(false);
    }

    setErrors({});
    setOpenDialog(true);
  };
  
  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "title" && !value.trim()) newErrors.title = "Title is required";
    else if (name === "description" && !value.trim()) newErrors.description = "Description is required";
    else delete newErrors[name];

    setErrors(newErrors);
  };

  // ✅ Create or Update record
  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.image.trim()) {
      setSnackbar({ open: true, message: "All fields are required!", severity: "error" });
      return;
    }

    try {
      if (isEditing) {
        const response = await httpClient.put(`/api/AboutUs`,formData );

        if (response.status === 200) {
          setAboutData((prevList) =>
            prevList.map((item) =>
              item._id === formData.id ? { ...item, ...response.data } : item
            )
          );
          setSnackbar({ open: true, message: "Record updated successfully!", severity: "success" });
        }
      } else {
        const response = await httpClient.post("/api/AboutUs", formData);

        if (response.status === 201) {
          setAboutData((prevList) => [...prevList, response.data]);
          setSnackbar({ open: true, message: "Record added successfully!", severity: "success" });
        }
      }

      setOpenDialog(false);
      setFormData({ title: "", description: "", image: "" });
      setErrors({});
    } catch (error) {
      console.log("Error:", error);
      setSnackbar({ open: true, message: "Something went wrong!", severity: "error" });
    }
  };
  
  

  // ✅ Delete Record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await httpClient.delete(`/api/AboutUs/${id}`);
        fetchAboutUs(); 
      } catch (error) {
        console.log("Error deleting record:", error);
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", marginTop: 5 }}>
        <Typography variant="h5" align="center" sx={{ margin: 2 }}>
          ℹ️ About Us
        </Typography>

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2", color: "#fff" }}>
              <TableCell sx={{ color: "#fff" }}>Title</TableCell>
              <TableCell sx={{ color: "#fff" }}>Description</TableCell>
              <TableCell sx={{ color: "#fff" }}>Image</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {aboutData.map((item) => (
    <TableRow key={item._id}>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>
        {item.image && <img src={item.image} alt="image" width={70} height={40} />}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleOpenDialog(item)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(item._id)} color="error">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>

        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} sx={{ margin: "20px auto", display: "block" }}>
          Add New
        </Button>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
  <DialogTitle>About Us</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            margin="dense"
          />

          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Description</Typography>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={(content) => setFormData((prev) => ({ ...prev, description: content }))}
            modules={modules}
            style={{ background: "#fff", minHeight: "150px", borderRadius: "5px" }}
          />




        {/* Upload Image Button */}
<div className="mt-4">
  <label className="block text-sm font-medium text-gray-700">Banner Image</label>

  {/* Hidden File Input */}
  <input
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    ref={fileInputRefCover}
    onChange={handleFileChange}
  />

  {/* Button to Trigger File Input */}
  <Button
    variant="contained"
    color="primary"
    onClick={handleButtonClickCover}  
      className="mt-2"
    disabled={loading}
  >
    {loading ? "Uploading..." : "Add Image"}
  </Button>

  {/* Preview of Uploaded Image */}
  {formData.image && (
    <img src={formData.image} alt="Service Preview" className="mt-4 w-32 h-32 object-cover" />
  )}

  {/* Error Message */}
  {errors?.image && (
    <Typography color="error" variant="body2">
      {errors.image}
    </Typography>
  )}
</div>

        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? "Update" : "Save"}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ open: false, message: "", severity: "" })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default AboutUsMaster;
