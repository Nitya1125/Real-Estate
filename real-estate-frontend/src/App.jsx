import Navbar from "./components/Navbar";
import { useEffect,useState } from "react";
import Splashscreen from "./components/Splashscreen"
import Dashboard from "./pages/Dashboard";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import PropertiesPage from "./pages/PropertiesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App(){
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) return  <Splashscreen/>;

  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element ={<Dashboard/>}/>
      <Route path="/Properties" element= {<PropertiesPage/>} />
      <Route path = "/about" element={<AboutPage/>}/>
      <Route path ="/contact" element ={<ContactPage/>}/>
      <Route path="/login" element = {<Login />}/>
      <Route path ="/signup" element = {<Signup />} />
    </Routes>
    </BrowserRouter>
  )



};

export default App;