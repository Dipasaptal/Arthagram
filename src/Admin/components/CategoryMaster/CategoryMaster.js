import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Box,Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CategoryMaster = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', style: '', description: '' });
  const [viewCategory, setViewCategory] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [errors, setErrors] = useState({ name: '', style: '', description: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewCategory({ name: '', style: '', description: '' });
    setErrors({ name: '', style: '', description: '' });
  };

  const handleViewClose = () => setViewOpen(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
    setErrors({ ...errors, [name]: value.trim() ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is required` });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = newCategory.name.trim() ? '' : 'Name is required';
    tempErrors.style = newCategory.style.trim() ? '' : 'Style is required';
    tempErrors.description = newCategory.description.trim() ? '' : 'Description is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(error => error === '');
  };

  // Create category (Local state update)
  const handleSubmit = () => {
    if (!validateForm()) return;
    setCategory([...category, { ...newCategory, id: Date.now().toString() }]); // Adding new category locally
    handleClose();
  };

  // Update category (Local state update)
  const handleUpdate = () => {
    setCategory(category?.map(cat => (cat.id === newCategory.id ? newCategory : cat)));
    handleClose();
  };

  // Delete category (Local state update)
  const handleDelete = () => {
    setCategory(category.filter((cat) => cat.id !== deleteCategoryId));
    setDeleteCategoryId(null);
  };

  // Open View Dialog
  const handleOpenViewDialog = (item) => {
    setViewCategory(item);
    setViewOpen(true);
  };

  return (
    <Box sx={{ width: "90%", padding: 3, marginLeft: 4, marginTop: 4  }}>
      <Paper sx={{ width: "100%", padding: 3, boxShadow: 3 }}>
      <Typography variant="h5" className="text-center font-bold mb-4">
          Category List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead><TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Style</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category?.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>{cat.style}</TableCell>
                  <TableCell>{cat.description}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenViewDialog(cat)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => {
                      setNewCategory({ ...cat });
                      handleOpen();
                    }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => setDeleteCategoryId(cat.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Button onClick={handleOpen} variant="contained" color="primary">
            Add Category
          </Button>
        </div>
      </Paper>

      {/* View Category Modal */}
      <Dialog open={viewOpen} onClose={handleViewClose} fullWidth maxWidth="md">
  <DialogTitle>
    Category Details
    <IconButton
      edge="end"
      color="inherit"
      onClick={handleViewClose}
      sx={{ position: 'absolute', top: 8, right: 8, width: 40, height: 40 }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent sx={{ padding: 3 }}>
    {viewCategory && (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6"><b>Name:</b> {viewCategory.name}</Typography>
        <Typography variant="h6"><b>Style:</b> {viewCategory.style}</Typography>
        <Typography variant="h6"><b>Description:</b> {viewCategory.description}</Typography>
      </Box>
    )}
  </DialogContent>
  <DialogActions sx={{ padding: 2, justifyContent: "center" }}>
    <Button onClick={handleViewClose} variant="contained" color="primary" size="large">
      Close
    </Button>
  </DialogActions>
</Dialog>


      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteCategoryId} onClose={() => setDeleteCategoryId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteCategoryId(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Category Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
  <DialogTitle>
    {newCategory.id ? 'Edit Category' : 'Add New Category'}
    <IconButton
      edge="end"
      color="inherit"
      onClick={handleClose}
      sx={{ position: 'absolute', top: 8, right: 8 }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent>
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={newCategory.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Style"
            fullWidth
            margin="normal"
            name="style"
            value={newCategory.style}
            onChange={handleChange}
            error={!!errors.style}
            helperText={errors.style}
          />
        </Grid>

        {/* Full-width Row */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            name="description"
            value={newCategory.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
      </Grid>
    </Box>
  </DialogContent>

  <DialogActions sx={{ padding: 2, justifyContent: "center" }}>
    {newCategory.id ? (
      <Button onClick={handleUpdate} variant="contained" color="primary">Update Category</Button>
    ) : (
      <Button onClick={handleSubmit} variant="contained" color="primary">Add Category</Button>
    )}
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default CategoryMaster;
