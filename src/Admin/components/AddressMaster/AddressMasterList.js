import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import httpClient from '../../../Api/axios'; // Adjust the path as needed
const AddressMasterList = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ address: '', phone: '', email: '', website: '' });
  const [errors, setErrors] = useState({});
  const [viewAddress, setViewAddress] = useState(null);
  const [deleteAddressId, setDeleteAddressId] = useState(null);
  // Fetch all addresses
  const fetchAddresses = async () => {
    try {
      const res = await httpClient.get('/api/AddressMaster');
      console.log('Fetched Addresses:', res.data);
      setAddresses(res.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
    setErrors({ ...errors, [name]: value ? '' : `${name} is required` });
  };
  const validateForm = () => {
    const newErrors = {};
    Object.keys(newAddress).forEach((key) => {
      if (!newAddress[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle Create or Update Address
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (editMode) {
        const res = await httpClient.put(`/api/AddressMaster`, newAddress);
        console.log('Updated Address:', res.data);
      } else {
        const res = await httpClient.post('/api/AddressMaster', newAddress);
        console.log('Created Address:', res.data);
      }
      fetchAddresses();
      setOpen(false);
      setNewAddress({ address: '', phone: '', email: '', website: '' });
      setEditMode(false);
      setErrors({});
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };
  // Handle Edit Address
  const handleEdit = (address) => {
    setNewAddress(address);
    setEditMode(true);
    setOpen(true);
  };
  // Handle Delete Address
  const handleDelete = async () => {
    try {
      const res = await httpClient.delete(`/api/AddressMaster/${deleteAddressId}`);
      console.log('Deleted Address:', res.data);
      fetchAddresses();
      setDeleteAddressId(null);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };
  return (
    <div className="flex justify-center min-h-screen p-4 mx-auto">
      <Paper className="w-full max-w-4xl p-6 shadow-lg">
        <Typography variant="h5" className="text-center font-bold mb-4">
          Address List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Address</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Website</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.map((address) => (
                <TableRow key={address._id} className="border-b">
                  <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                    {address.address}
                  </TableCell>
                  <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {address.phone}
                  </TableCell>
                  <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {address.email}
                  </TableCell>
                  <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {address.website}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <IconButton
                      color="primary"
                      align="center"
                      style={{ whiteSpace: 'nowrap' }}
                      onClick={() => setViewAddress(address)}
                    >
                      <VisibilityIcon className="text-lg" />
                    </IconButton>
                    <IconButton
                      color="primary"
                      align="center"
                      style={{ whiteSpace: 'nowrap' }}
                      onClick={() => handleEdit(address)}
                    >
                      <EditIcon className="text-lg" />
                    </IconButton>
                    <IconButton
                      color="error"
                      align="center"
                      style={{ whiteSpace: 'nowrap' }}
                      onClick={() => setDeleteAddressId(address._id)}
                    >
                      <DeleteIcon className="text-lg" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-center mt-4">
          <Button onClick={() => setOpen(true)} variant="contained" color="primary">
            Add Address
          </Button>
        </div>
      </Paper>
      {/* Add/Edit Address Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        <DialogContent>
          {Object.keys(newAddress).map((key) => (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth
              margin="normal"
              name={key}
              value={newAddress[key]}
              onChange={handleChange}
              onBlur={handleChange}
              error={!!errors[key]}
              helperText={errors[key]}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* View Address Modal */}
      <Dialog open={!!viewAddress} onClose={() => setViewAddress(null)}>
        <DialogTitle>Address Details</DialogTitle>
        <DialogContent>
          {viewAddress && (
            <>
              <Typography>
                <strong>Address:</strong> {viewAddress.address}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {viewAddress.phone}
              </Typography>
              <Typography>
                <strong>Email:</strong> {viewAddress.email}
              </Typography>
              <Typography>
                <strong>Website:</strong> {viewAddress.website}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewAddress(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteAddressId} onClose={() => setDeleteAddressId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteAddressId(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddressMasterList;





