import { useEffect, useState } from "react";
import Splashscreen from "./components/Splashscreen";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PropertiesPage from "./pages/PropertiesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import PropertyDetails from "./pages/PropertyDetails";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./pages/Profile";
import WishList from "./pages/WishList";
import RequestPropertyView from "./pages/RequestPropertyView";

function App() {
  const [loading, setLoading] = useState(true);

  // Splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // SAFE USER PARSING
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.log("Invalid user data",error);
    user = null;
  }

  if (loading) return <Splashscreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path="/Properties" element={<ProtectedRoutes> <PropertiesPage /> </ProtectedRoutes>} />
        <Route path="/properties/:id" element={<ProtectedRoutes><PropertyDetails /></ProtectedRoutes>} />
        <Route path = "/request/visit/:id" element={<ProtectedRoutes><RequestPropertyView /></ProtectedRoutes>}/>
        <Route path="/about" element={<ProtectedRoutes><AboutPage /></ProtectedRoutes>} />
        <Route path="/contact" element={<ProtectedRoutes><ContactPage /></ProtectedRoutes>} />
        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
        <Route path ="/wishlist" element={<ProtectedRoutes><WishList/></ProtectedRoutes>}/>
        <Route path="/signup" element={<Signup />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;