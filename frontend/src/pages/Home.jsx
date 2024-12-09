import React, { useEffect, useState } from "react";
import {
  getClientData,
  createClient,
  getClientDetails,
  updateClient,
  deleteClient,
} from "../utils/api";
import EditNoteIcon from "@mui/icons-material/EditNote";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Delete } from "@mui/icons-material";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state and mode
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add", "view", "update", or "delete"

  // User data for dialog actions
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    sales: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getClientData();
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users with the full list
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
        user.phone.includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Open the dialog
  const openDialog = (mode, data = null) => {
    setDialogMode(mode);
    setFormData(
      data || {
        firstName: "",
        lastName: "",
        phone: "",
        sales: "",
        email: "",
        address: "",
      }
    );
    setDialogOpen(true);
  };

  // Close the dialog
  const closeDialog = () => {
    setDialogOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      sales: "",
      email: "",
      address: "",
    });
  };

  // Handle input change in the dialog
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (dialogMode === "add") {
      try {
        const data = await createClient(formData);
        const updatedUsers = [...users, data];
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        closeDialog();
      } catch (err) {
        alert("Failed to create user.");
      }
    } else if (dialogMode === "update") {
      try {
        const data = await updateClient(formData.id, formData);
        const updatedUsers = users.map((user) =>
          user.id === data.id ? data : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        closeDialog();
      } catch (err) {
        alert("Failed to update user.");
      }
    } else if (dialogMode === "delete") {
      try {
        await deleteClient(formData.id);
        const updatedUsers = users.filter((user) => user.id !== formData.id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        closeDialog();
      } catch (err) {
        alert("Failed to delete user.");
      }
    }
  };

  // Handle row click for viewing user details
  const handleRowClick = async (id) => {
    try {
      const data = await getClientDetails(id);
      openDialog("view", data);
    } catch (err) {
      alert("Failed to fetch user details.");
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          User Dashboard
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          User Dashboard
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Raj Diamonds
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: "300px", marginLeft: "auto", paddingRight: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => openDialog("add")}
        >
          Add User
        </Button>
      </div>

      <TableContainer component={Paper} maxHeight={'300px'}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell
                  onClick={(e) => e.stopPropagation()} // Prevent click event propagation for actions
                >
                  <IconButton
                    onClick={() => openDialog("update", user)}
                    color="primary"
                  >
                    <EditNoteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => openDialog("delete", user)}
                    color="secondary"
                  >
                    <Delete sx={{ color: "#cf0808" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>
          {dialogMode === "add"
            ? "Add New User"
            : dialogMode === "update"
            ? "Update User"
            : dialogMode === "delete"
            ? "Delete Confirmation"
            : "User Details"}
        </DialogTitle>
        <DialogContent>
          {dialogMode === "delete" ? (
            <Typography>
              Are you sure you want to delete{" "}
              <strong>
                {formData.firstName} {formData.lastName}
              </strong>
              ?
            </Typography>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={dialogMode === "view"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={dialogMode === "view"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  fullWidth
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={dialogMode === "view"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Sales"
                  type="number"
                  name="sales"
                  fullWidth
                  value={formData.sales}
                  onChange={handleChange}
                  disabled={dialogMode === "view"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  disabled={dialogMode === "view"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                  disabled={dialogMode === "view"}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {dialogMode !== "view" && (
            <Button onClick={handleSubmit} color="primary" variant="contained">
              {dialogMode === "add"
                ? "Add"
                : dialogMode === "update"
                ? "Update"
                : "Delete"}
            </Button>
          )}
          <Button onClick={closeDialog} color="error" variant="contained">
            {dialogMode === "view" ? "Close" : "Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
