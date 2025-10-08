import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

// API Endpoint
const API_URL = "http://192.168.0.126:7878/api/SocialMediaMaster";

const SocialMediaTable = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [currentSocial, setCurrentSocial] = useState({
    instaLink: "",
    fbLink: "",
  });

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  // Fetch Social Media Links
  const fetchSocialLinks = async () => {
    try {
      const response = await axios.get(API_URL);
      setSocialLinks(response.data);
    } catch (error) {
      console.error("Error fetching social media links:", error);
    }
  };

  // Open Form (For Add/Edit)
  const handleOpen = async (social = null) => {
  if (social) {
    try {
      const response = await axios.get(`${API_URL}/${social._id}`); // Fetch record by ID
      setCurrentSocial(response.data); // Set fetched data to form
      setEditMode(true);
    } catch (error) {
      console.error("Error fetching social media by ID:", error);
    }
  } else {
    setCurrentSocial({ instaLink: "", fbLink: "" });
    setEditMode(false);
  }
  setErrors({});
  setOpen(true);
};

  // Open Delete Confirmation Popup
  const handleDelete = (social) => {
    setSelectedSocial(social);
    setDeleteDialog(true);
  };

  // Close Delete Confirmation Popup
  const handleCloseDelete = () => {
    setSelectedSocial(null);
    setDeleteDialog(false);
  };

  // Close Form
  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setCurrentSocial({ instaLink: "", fbLink: "" });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setCurrentSocial({ ...currentSocial, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle Blur Validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let fieldErrors = { ...errors };

    if (!value.trim()) {
      fieldErrors[name] = "This field is required";
    } else if (!/^https?:\/\/.+/.test(value)) {
      fieldErrors[name] = "Enter a valid URL";
    } else {
      delete fieldErrors[name]; // Remove error if valid
    }

    setErrors(fieldErrors);
  };

  // Validate Fields
  const validateFields = () => {
    let fieldErrors = {};
    if (!currentSocial.instaLink?.trim() || !/^https?:\/\/.+/.test(currentSocial.instaLink)) {
      fieldErrors.instaLink = "Enter a valid Instagram URL";
    }
    if (!currentSocial.fbLink?.trim() || !/^https?:\/\/.+/.test(currentSocial.fbLink)) {
      fieldErrors.fbLink = "Enter a valid Facebook URL";
    }
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // Handle Save (Add/Edit)
  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      if (editMode) {
        await axios.put(API_URL, currentSocial);
        setSocialLinks((prev) =>
          prev?.map((item) =>
            item.instaLink === currentSocial.instaLink ? currentSocial : item
          )
        );
      } else {
        const response = await axios.post(API_URL, currentSocial);
        setSocialLinks([...socialLinks, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving social media link:", error);
    }
  };

  // Handle Delete
  // Handle Delete
const handleDeleteConfirm = async () => {
  if (!selectedSocial) return;

  try {
    await axios.delete(`${API_URL}/${selectedSocial._id}`); // Pass ID in URL
    setSocialLinks(socialLinks.filter((item) => item._id !== selectedSocial._id));
    handleCloseDelete();
  } catch (error) {
    console.error("Error deleting social media link:", error);
  }
};


  return (
    <div className="p-4">
      {/* Title */}
      <Typography variant="h4" textAlign="center" fontWeight="bold" color="primary">
        Social Media Management
      </Typography>

      {/* Add New Button */}
      <div className="flex justify-center my-4">
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          ➕ Add Social Media
        </Button>
      </div>

      {/* Table for Displaying Social Media Links */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Instagram</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Facebook</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {socialLinks.length > 0 ? (
              socialLinks?.map((social, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <a href={social.instaLink} target="_blank" rel="noopener noreferrer">
                      {social.instaLink}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={social.fbLink} target="_blank" rel="noopener noreferrer">
                      {social.fbLink}
                    </a>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpen(social)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(social)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Social Media Links Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? "Edit Social Media" : "Add Social Media"}</DialogTitle>
        <DialogContent>
          <TextField label="Instagram Link" name="instaLink" value={currentSocial.instaLink} onChange={handleChange} onBlur={handleBlur} fullWidth margin="normal" error={!!errors.instaLink} helperText={errors.instaLink} />
          <TextField label="Facebook Link" name="fbLink" value={currentSocial.fbLink} onChange={handleChange} onBlur={handleBlur} fullWidth margin="normal" error={!!errors.fbLink} helperText={errors.fbLink} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleSave}>{editMode ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this social media link?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SocialMediaTable;
