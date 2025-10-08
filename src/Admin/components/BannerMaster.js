import React, { useState, useEffect, useRef } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Box, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import httpClient from "../../Api/axios";

const BannerMaster = () => {
  const [banners, setBanners] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [viewImage, setViewImage] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [formTitle, setFormTitle] = useState("Add Banner");
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    status: true
});

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

  // Open View Image Popup
  const handleView = (image) => {
    setViewImage(image);
    setOpenView(true);
  };

  // Open Add/Edit Form Popup
  const handleOpenForm = (banner = null) => {
    if (banner) {
      setFormTitle("update Banner");
      setNewTitle(banner.title);
      setNewImage(banner.image);
      setEditId(banner._id);
    } else {
      setFormTitle("Add Banner");
      setNewTitle("");
      setNewImage(null);
      setEditId(null);
    }
    setOpenForm(true);
  };

  const fileInputRefCover = useRef(null);

  // Function to trigger hidden file input
  const handleButtonClickCover = () => {
    fileInputRefCover.current.click();
  };

  // Handle Image Upload
  const handleFileChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await httpClient.post('/auth/file_upload', formData);
      // console.log("Image uploaded:", res.data);

      
      setFormData(prevFormData => ({
        ...prevFormData,
        image: res.data.path
      }));
      
        setNewImage(res.data.path);

      
    } catch (error) {
      console.log("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Form Submit (Add or Edit)
  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      alert("Title is required.");
      return;
    }

    try {
      

      if (editId) {
        console.log({ editId })
        // ✅ UPDATE (PUT API) with `editId`
        const response = await httpClient.put(`/api/BannerMaster`, formData);

        console.log("Update Response:", response.data);

        if (response.status === 200) {
          // ✅ Update the banner list in the frontend
          setBanners((prevBanners) =>

            prevBanners.map((banner) =>
              banner._id === editId ? { ...banner, title: newTitle, image: newImage || banner.image } : banner

            )
          );
          alert("Banner updated successfully!");
        } else {
          alert("Failed to update banner.");
        }
      } else {
        console.log('post')

        // ✅ CREATE (POST API)
        const response = await httpClient.post("/api/BannerMaster", formData);

        console.log("Post Response:", response.data);
 
        if (response.status === 201) {
          // ✅ Add the new banner to the state
          setBanners((prevBanners) => [...prevBanners, response.data]);
          alert("Banner added successfully!");
        } else {
          alert("Failed to add banner.");
        }
      }

      // ✅ Reset form and close modal
      setOpenForm(false);
      setNewTitle("");
      setNewImage(null);
      setEditId(null);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.log("Server Error:", error.response.data);
        alert(`Error: ${error.response.data.message || "Unknown error"}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };



  // Open Delete Confirmation Popup
  const handleOpenDelete = (id) => {
    console.log("Delete ID in handleOpenDelete:", id);
    setDeleteId(String(id));
    setOpenDelete(true);
  };

  // Confirm Delete

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await httpClient.delete(`/api/BannerMaster/${deleteId}`);
        setOpenDelete(false);
        fetchBanners();
      } catch (error) {
        console.log("Error deleting record:", error);
      }
    }
  };

  useEffect(() => {
    console.log("deleteId updated:", deleteId);
  }, [deleteId]);

  const SetFormData = (e)=>{

    
   const {value, name} = e.target;
setFormData({
  ...formData, title: value
});

  
   
  }

  useEffect(() => {
    
  console.log(formData);
  
    
  }, [formData]);



  return (
    <Box sx={{ width: "90%", margin: "40px auto" }}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}>Sr. No</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}>Image</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}>Title</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.length > 0 ? (
              banners?.map((banner, index) => {
                return (
                  <TableRow key={banner._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img src={banner.image} alt="Banner" width="100" height="60" style={{ borderRadius: 4 }} />
                    </TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>{banner.title}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenForm(banner)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleOpenDelete(banner._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton color="info" onClick={() => handleView(banner.image)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No banners available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ textAlign: "center", marginBottom: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
          sx={{ backgroundColor: "#1976d2", fontSize: "16px", padding: "10px 20px", marginTop: "40px" }}
        >
          Add Banner
        </Button>
      </Box>

      {/* View Image Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} fullWidth maxWidth="sm">
        <DialogTitle>View Banner</DialogTitle>
        <DialogContent sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
          <img src={viewImage} alt="Banner Preview" style={{ maxWidth: "100%", borderRadius: 4 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)} variant="contained" color="secondary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Banner Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={formData.title}
              onChange={SetFormData}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRefCover}
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClickCover}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Image"}
            </Button>
            {newImage && (
              <img src={newImage} alt="Preview" style={{ width: 200, height: 120, borderRadius: 4 }} />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} fullWidth maxWidth="xs">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this banner?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} variant="outlined">No</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BannerMaster;