import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [image, setImage] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);

  const [form, setForm] = useState({
    title: "",
    location: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    type: "Apartment",
  });

  // ================= FETCH =================
  const fetchAll = async () => {
    try {
      const usersRes = await axios.get(
        "http://localhost:5000/api/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const propRes = await axios.get(
        "http://localhost:5000/api/properties"
      );

      setUsers(usersRes.data.users || usersRes.data);
      setProperties(propRes.data.properties || propRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = async (e) => {
    const { name, value } = e.target;
    let updated = { ...form, [name]: value };

    if (updated.bedrooms && updated.location) {
      updated.title = `${updated.bedrooms}BHK ${updated.type} in ${updated.location}`;
    }

    setForm(updated);

    if (updated.area && updated.bedrooms && updated.bathrooms) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/predict-price",
          {
            area: Number(updated.area),
            bedrooms: Number(updated.bedrooms),
            bathrooms: Number(updated.bathrooms),
          }
        );

        setForm((prev) => ({
          ...prev,
          price: res.data.price,
        }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // ================= ADD / EDIT =================
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (image) data.append("image", image);

      if (editingProperty) {
        await axios.put(
          `http://localhost:5000/api/properties/edit/${editingProperty._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/properties",
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setForm({
        title: "",
        location: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        price: "",
        type: "Apartment",
      });

      setImage(null);
      setEditingProperty(null);
      setTab(0);

      fetchAll();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const deleteProperty = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/properties/delete/${id}`
    );
    fetchAll();
  };

  const editProperty = (p) => {
    setEditingProperty(p);
    setForm(p);
    setTab(1);
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/users/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchAll();
  };

  return (
    <Box p={4}>

      <Typography variant="h4" mb={3}>
        Admin Dashboard
      </Typography>

      {/* TABS */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Properties" />
        <Tab label="Add Property" />
        <Tab label="Users" />
      </Tabs>

      {/* ================= PROPERTIES ================= */}
      {tab === 0 && (
        <Grid container spacing={3}>
          {properties.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={
                    p.image
                      ? `http://localhost:5000/uploads/${p.image}`
                      : "https://via.placeholder.com/400"
                  }
                />

                <CardContent>
                  <Typography variant="h6">{p.title}</Typography>

                  <Typography color="green" fontWeight="bold">
                    ₹{p.price?.toLocaleString("en-IN")}
                  </Typography>

                  <Box mt={2} display="flex" gap={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => editProperty(p)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => deleteProperty(p._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ================= ADD PROPERTY ================= */}
      {tab === 1 && (
        <Paper sx={{ p: 3, maxWidth: 700 }}>
          <Typography variant="h6" mb={2}>
            {editingProperty ? "Edit Property" : "Add Property"}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth name="location" label="Location" value={form.location} onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth name="area" label="Area" value={form.area} onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth name="bedrooms" label="Bedrooms" value={form.bedrooms} onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth name="bathrooms" label="Bathrooms" value={form.bathrooms} onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth value={form.title} label="Title" disabled />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth value={form.price} label="Price" disabled />
            </Grid>

            <Grid item xs={6}>
              <TextField select fullWidth name="type" value={form.type} onChange={handleChange}>
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Villa">Villa</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <input type="file" onChange={handleImage} />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            {editingProperty ? "Update Property" : "Add Property"}
          </Button>
        </Paper>
      )}

      {/* ================= USERS ================= */}
      {tab === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            Users
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => deleteUser(u._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default AdminDashboard;