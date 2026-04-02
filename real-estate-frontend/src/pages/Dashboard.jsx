import Navbar from "../components/Navbar";
import Properties from "../components/Properties"
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="bg-[#f8f9fb] min-h-screen">

      <Navbar />
      <main className="pt-28">
          <Hero />
          <Properties />
          <Features />
          <About />
          <CTA />
          <Footer />
      </main>

    </div>
  );
};

export default Dashboard;