import Navbar from "./components/Navbar";
import { useEffect,useState } from "react";
import Splashscreen from "./components/Splashscreen"
import Dashboard from "./pages/Dashboard";

function App(){
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return loading ? <Splashscreen/> : <Dashboard />;

};

export default App;