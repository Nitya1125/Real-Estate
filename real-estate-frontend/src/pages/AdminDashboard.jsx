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
  TextField,
  MenuItem,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";


import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { API_BASE, uploadsUrl } from "../config/api";
import { useToast } from "../context/ToastContext";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  const { success, error } = useToast();
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

  const fetchAll = async () => {
    try {
      const usersRes = await axios.get(
        `${API_BASE}/api/users`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const propRes = await axios.get(
        `${API_BASE}/api/properties?page=1&limit=1000`,
      );
      console.log(usersRes.data);

      setUsers(usersRes.data || []);

      setProperties(
        Array.isArray(propRes.data)
          ? propRes.data
          : propRes.data.properties || [],
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchAll();
    };
    loadData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    let updated = {
      ...form,
      [name]: value,
    };

    if (updated.bedrooms && updated.location && updated.type) {
      updated.title = `${updated.bedrooms}BHK ${updated.type} in ${updated.location}`;
    }

    setForm(updated);

    // Predict price
    if (
      updated.area &&
      updated.bedrooms &&
      updated.bathrooms &&
      updated.location &&
      updated.type
    ) {
      try {
        const res = await axios.post(
          `${API_BASE}/api/predict-price`,
          {
            district: updated.location,
            property_type: updated.type,
            location: updated.location,
            area: Number(updated.area),
            bedrooms: Number(updated.bedrooms),
            bathrooms: Number(updated.bathrooms),
          },
        );

        setForm((prev) => ({
          ...prev,
          price: res.data.price || res.data.predicted_price || "",
        }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (image) {
        data.append("image", image);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingProperty) {
        await axios.put(
          `${API_BASE}/api/properties/edit/${editingProperty._id}`,
          data,
          config,
        );
      } else {
        await axios.post(
          `${API_BASE}/api/properties`,
          data,
          config,
        );
      }

      // Reset form
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
      success(editingProperty ? "Property updated." : "Property added.");
      fetchAll();
    } catch (err) {
      console.log(err);
      error("Could not save property.");
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(
        `${API_BASE}/api/properties/delete/${id}`,
      );

      fetchAll();
      success("Property deleted.");
    } catch (err) {
      console.log(err);
      error("Could not delete property.");
    }
    setEditingProperty(p);
    setForm(p);
    setTab(1);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `${API_BASE}/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchAll();
      success("User removed.");
    } catch (err) {
      console.log(err);
      error("Could not delete user.");
    }
    return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f6f7fb",
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "2rem",
                md: "2.4rem",
              },
              fontWeight: 900,
              color: "#111827",
              letterSpacing: "-1px",
            }}
          >
            Admin Dashboard
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
              mt: 0.5,
              fontSize: "0.95rem",
            }}
          >
            Manage properties and users
          </Typography>
        </Box>

        <Button
          startIcon={<LogoutOutlinedIcon />}
          onClick={handleLogout}
          sx={{
            bgcolor: "#111827",
            color: "white",
            borderRadius: "14px",
            px: 2.5,
            py: 1.1,
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#1f2937",
              boxShadow: "none",
            },
          }}
        >
          Logout
        </Button>
      </Box>

      <Box
        sx={{
          display: "inline-flex",
          bgcolor: "white",
          p: 0.8,
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          mb: 4,
          gap: 1,
        }}
      >
        {["All Properties", "Add Property", "Users"].map((item, index) => (
          <Button
            key={index}
            onClick={() => setTab(index)}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: "12px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "0.9rem",
              bgcolor: tab === index ? "#111827" : "transparent",
              color: tab === index ? "white" : "#6b7280",
              "&:hover": {
                bgcolor: tab === index ? "#111827" : "#f3f4f6",
              },
            }}
          >
            {item}
          </Button>
        ))}
      </Box>

      {tab === 0 && (
        <Grid container spacing={2.5}>
          {properties.map((p) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
              <Card
                sx={{
                  borderRadius: "22px",
                  overflow: "hidden",
                  border: "1px solid #ececec",
                  bgcolor: "white",
                  boxShadow: "none",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={
                    p.image
                      ? uploadsUrl(p.image)
                      : "https://placehold.co/600x400"
                  }
                />

                <CardContent
                  sx={{
                    p: 2.2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.08rem",
                      fontWeight: 800,
                      color: "#111827",
                      lineHeight: 1.4,
                      minHeight: "52px",
                    }}
                  >
                    {p.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "1.9rem",
                      fontWeight: 900,
                      color: "#111827",
                      mt: 1,
                      mb: 2,
                    }}
                  >
                    ₹{Number(p.price).toLocaleString("en-IN")}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      bgcolor: "#f9fafb",
                      borderRadius: "14px",
                      p: 1,
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <KingBedIcon
                        sx={{
                          fontSize: 16,
                          color: "#6b7280",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                        }}
                      >
                        {p.bedrooms}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <BathtubIcon
                        sx={{
                          fontSize: 16,
                          color: "#6b7280",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                        }}
                      >
                        {p.bathrooms}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <SquareFootIcon
                        sx={{
                          fontSize: 16,
                          color: "#6b7280",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                        }}
                      >
                        {p.area}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Button
                      fullWidth
                      startIcon={<EditIcon />}
                      onClick={() => editProperty(p)}
                      sx={{
                        bgcolor: "#111827",
                        color: "white",
                        borderRadius: "14px",
                        py: 1,
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "#1f2937",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Edit
                    </Button>

                    <IconButton
                      onClick={() => deleteProperty(p._id)}
                      sx={{
                        bgcolor: "#f3f4f6",
                        color: "#ef4444",
                        borderRadius: "14px",
                        width: 46,
                        height: 46,
                        "&:hover": {
                          bgcolor: "#fee2e2",
                        },
                      }}
                    >
                      <DeleteSweepIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === 1 && (
        <Paper
          elevation={0}
          sx={{
            maxWidth: 850,
            mx: "auto",
            borderRadius: "28px",
            p: { xs: 3, md: 4 },
            border: "1px solid #ececec",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: 900,
              color: "#111827",
              mb: 4,
            }}
          >
            {editingProperty ? "Edit Property" : "Add Property"}
          </Typography>

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Area"
                name="area"
                value={form.area}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bedrooms"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bathrooms"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Generated Title"
                value={form.title}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Predicted Price"
                value={form.price}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Property Type"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <MenuItem value="Apartment">Apartment</MenuItem>

                <MenuItem value="Villa">Villa</MenuItem>

                <MenuItem value="Flat">Flat</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                component="label"
                fullWidth
                startIcon={<CloudUploadOutlinedIcon />}
                sx={{
                  border: "1px dashed #d1d5db",
                  color: "#6b7280",
                  borderRadius: "16px",
                  py: 1.7,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                {image ? image.name : "Upload Property Image"}

                <input hidden type="file" onChange={handleImage} />
              </Button>
            </Grid>
          </Grid>

          <Button
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 4,
              bgcolor: "#111827",
              color: "white",
              borderRadius: "16px",
              py: 1.4,
              fontWeight: 800,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#1f2937",
                boxShadow: "none",
              },
            }}
          >
            {editingProperty ? "Update Property" : "Add Property"}
          </Button>
        </Paper>
      )}

      {tab === 2 && (
  <Grid container spacing={2.5}>
    {users.map((u) => (
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        key={u._id}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: "22px",
            p: 2.5,
            border: "1px solid #ececec",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "white",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "16px",
                bgcolor: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PersonOutlineOutlinedIcon
                sx={{
                  color: "#111827",
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#111827",
                  fontSize: "0.98rem",
                }}
              >
                {u.name}
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  fontSize: "0.88rem",
                }}
              >
                {u.email}
              </Typography>

              <Typography
                sx={{
                  color: "#2563eb",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  mt: 0.5,
                }}
              >
                {u.role}
              </Typography>
            </Box>
          </Stack>

          <IconButton
            onClick={() => deleteUser(u._id)}
            sx={{
              bgcolor: "#f3f4f6",
              color: "#ef4444",
              width: 44,
              height: 44,
              borderRadius: "14px",
              "&:hover": {
                bgcolor: "#fee2e2",
              },
            }}
          >
            <DeleteSweepIcon />
          </IconButton>
        </Paper>
      </Grid>
    ))}
  </Grid>
)}
    </Box>
  );
}
};

export default AdminDashboard;
