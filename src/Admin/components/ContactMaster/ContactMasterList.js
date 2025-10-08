import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import httpClient from "../../../Api/axios";
const ContactMaster = () => {
  const [contacts, setContacts] = useState([]);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [error, setError] = useState("");
  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      const res = await httpClient.get("/api/ContactFormMaster");
      console.log(res. data); // Debugging
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  // Fetch a single contact by ID
  const fetchContactById = async (id) => {
    try {
      const { data } = await httpClient.get(`/api/ContactFormMaster/${id}`);
      setCurrentContact(data);
      setOpenReplyModal(true);
    } catch (error) {
      console.error("Error fetching contact by ID:", error);
    }
  };
  // Create a new contact
  const createContact = async (newContact) => {
    try {
      await httpClient.post("/api/ContactFormMaster", newContact);
      fetchContacts(); // Refresh the list
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };
  // Update an existing contact
  const updateContact = async (id, updatedContact) => {
    try {
      await httpClient.put(`/api/ContactFormMaster/${id}`, updatedContact);
      fetchContacts(); // Refresh the list
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };
  // Delete a contact
  const deleteContact = async (id) => {
    try {
      await httpClient.delete(`/api/ContactFormMaster/${id}`);
      fetchContacts(); // Refresh the list
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);
  useEffect(() => {
    console.log("Contacts State Updated:", contacts);
  }, [contacts]);
  const handleReplyClick = (contact) => {
    if (contact && contact.email) {
      const mailtoLink = `mailto:${encodeURIComponent(contact.email)}?subject=Reply to your inquiry`;
      window.location.href = mailtoLink;
    } else {
      console.error("Invalid contact email");
    }
  };
  const handleReplyChange = (e) => {
    setReplyMessage(e.target.value);
    if (e.target.value.trim() !== "") {
      setError("");
    }
  };
  const handleReplyFocus = () => {
    if (replyMessage.trim() === "") {
      setError("Reply message is required");
    }
  };
  return (
    <div className="flex justify-center min-h-screen bg-gray-50 p-4 mx-auto">
      <Paper className="w-full max-w-4xl p-6 shadow-lg">
        <Typography variant="h5" className="text-center font-bold mb-4">
          Contact Master
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Message</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts && contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <TableRow key={contact._id || index}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.message}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleReplyClick(contact)}
                      >
                        Reply
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteContact(contact._id)}
                        style={{ marginLeft: "8px" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No contacts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Reply Modal */}
      <Dialog open={openReplyModal} onClose={() => setOpenReplyModal(false)}>
        <DialogTitle>Reply to {currentContact?.name}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Reply Message"
            value={replyMessage}
            onChange={handleReplyChange}
            onFocus={handleReplyFocus}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReplyModal(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleReplyClick(currentContact)}
          >
            Reply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ContactMaster;