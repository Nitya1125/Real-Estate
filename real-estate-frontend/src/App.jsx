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
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/Profile";
import WishList from "./pages/WishList";
import RequestPropertyView from "./pages/RequestPropertyView";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPage";
import { ToastProvider } from "./context/ToastContext";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Splashscreen />;

  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/properties"
              element={
                <ProtectedRoutes>
                  <PropertiesPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/Properties"
              element={<Navigate to="/properties" replace />}
            />
            <Route
              path="/properties/:id"
              element={
                <ProtectedRoutes>
                  <PropertyDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/request/visit/:id"
              element={
                <ProtectedRoutes>
                  <RequestPropertyView />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoutes>
                  <AboutPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoutes>
                  <ContactPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoutes>
                  <WishList />
                </ProtectedRoutes>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
