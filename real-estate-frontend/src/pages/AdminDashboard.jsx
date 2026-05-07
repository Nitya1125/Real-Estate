import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Button, Card, CardContent, CardMedia, Typography, Grid,
  Tabs, Tab, TextField, MenuItem, Table, TableBody, TableCell,
  TableHead, TableRow, Paper, Stack, Chip, IconButton, TableContainer
} from "@mui/material";

// Standard Path Imports
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PeopleIcon from "@mui/icons-material/People";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [image, setImage] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);
  
  const [form, setForm] = useState({
    title: "", location: "", area: "", bedrooms: "", bathrooms: "", price: "", type: "Apartment",
  });

  const fetchAll = async () => {
    try {
      const usersRes = await axios.get("http://localhost:5000/api/users", { headers: { Authorization: `Bearer ${token}` } });
      const propRes = await axios.get("http://localhost:5000/api/properties");
      setUsers(usersRes.data.users || usersRes.data);
      setProperties(propRes.data.properties || propRes.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let updated = { ...form, [name]: value };
    if (updated.bedrooms && updated.location) {
      updated.title = `${updated.bedrooms}BHK ${updated.type} in ${updated.location}`;
    }
    setForm(updated);
    if (updated.area && updated.bedrooms && updated.bathrooms) {
      try {
        const res = await axios.post("http://localhost:5000/api/predict-price", {
          area: Number(updated.area), bedrooms: Number(updated.bedrooms), bathrooms: Number(updated.bathrooms),
        });
        setForm((prev) => ({ ...prev, price: res.data.price }));
      } catch (err) { console.log(err); }
    }
  };

  const handleImage = (e) => setImage(e.target.files[0]);

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      if (image) data.append("image", image);
      
      const config = { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } };

      if (editingProperty) {
        await axios.put(`http://localhost:5000/api/properties/edit/${editingProperty._id}`, data, config);
      } else {
        await axios.post("http://localhost:5000/api/properties", data, config);
      }
      
      setForm({ title: "", location: "", area: "", bedrooms: "", bathrooms: "", price: "", type: "Apartment" });
      setImage(null); setEditingProperty(null); setTab(0); fetchAll();
    } catch (err) { console.log(err); }
  };

  const deleteProperty = async (id) => {
    await axios.delete(`http://localhost:5000/api/properties/delete/${id}`);
    fetchAll();
  };

  const editProperty = (p) => { setEditingProperty(p); setForm(p); setTab(1); };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchAll();
  };

  // Fixed helper to avoid prop bleeding
  const StatBox = ({ label, value, icon, color }) => (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, bgcolor: 'white', display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${color}15`, color: color, display: 'flex' }}>{icon}</Box>
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase' }}>{label}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FA', p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Admin Dashboard</Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <StatBox label="Total Listings" value={properties.length} icon={<HomeWorkIcon />} color="#B89B5E" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatBox label="System Users" value={users.length} icon={<PeopleIcon />} color="#1A1D2D" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatBox label="Status" value="AI Live" icon={<AddBusinessIcon />} color="#2E7D32" />
        </Grid>
      </Grid>

      <Box sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="inherit" indicatorColor="primary">
          <Tab label="All Properties" sx={{ fontWeight: 600 }} />
          <Tab label="Manage Listing" sx={{ fontWeight: 600 }} />
          <Tab label="User Directory" sx={{ fontWeight: 600 }} />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Grid container spacing={3}>
          {properties.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <Card sx={{ borderRadius: 4, border: '1px solid #EEE' }} elevation={0}>
                <CardMedia 
                    component="img" 
                    height="200" 
                    image={p.image ? `http://localhost:5000/uploads/${p.image}` : "https://placehold.co/400x200?text=No+Image"} 
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{p.title}</Typography>
                  <Typography variant="h5" sx={{ color: '#B89B5E', fontWeight: 800, my: 1 }}>₹{p.price?.toLocaleString("en-IN")}</Typography>
                  
                  <Stack direction="row" spacing={2} sx={{ mb: 2, p: 1, bgcolor: '#F8F9FA', borderRadius: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}><KingBedIcon fontSize="small"/><Typography variant="caption">{p.bedrooms}</Typography></Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}><BathtubIcon fontSize="small"/><Typography variant="caption">{p.bathrooms}</Typography></Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}><SquareFootIcon fontSize="small"/><Typography variant="caption">{p.area}</Typography></Stack>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Button fullWidth variant="contained" startIcon={<ModeEditIcon />} onClick={() => editProperty(p)} sx={{ bgcolor: '#1A1D2D' }}>Edit</Button>
                    <IconButton onClick={() => deleteProperty(p._id)} sx={{ bgcolor: '#FEE2E2', color: '#DC2626', borderRadius: 1 }}><DeleteSweepIcon /></IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === 1 && (
        <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', borderRadius: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>{editingProperty ? "Edit Property" : "Add Property"}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Location" name="location" value={form.location} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Area (Sq.ft)" name="area" value={form.area} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Bedrooms" name="bedrooms" value={form.bedrooms} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Bathrooms" name="bathrooms" value={form.bathrooms} onChange={handleChange} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Computed Title" value={form.title} disabled /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Predicted Price" value={form.price} disabled /></Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Type" name="type" value={form.type} onChange={handleChange}>
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Villa">Villa</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" component="label" fullWidth startIcon={<CloudUploadIcon />}>
                    {image ? image.name : "Upload Image"}
                    <input type="file" hidden onChange={handleImage} />
                </Button>
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" size="large" onClick={handleSubmit} sx={{ mt: 3, bgcolor: '#B89B5E', py: 1.5 }}>
            {editingProperty ? "Update Property" : "Add Property"}
          </Button>
        </Paper>
      )}

      {tab === 2 && (
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#1A1D2D' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                <TableCell align="right" sx={{ color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id} hover>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell align="right">
                    <Button color="error" variant="outlined" onClick={() => deleteUser(u._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminDashboard;