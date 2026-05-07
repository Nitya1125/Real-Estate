import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/properties/${id}`);
        const data = await res.json();
        setProperty(data.property);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#F9F8F3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ width: 40, height: 40, border: '2px solid #C9A84C', borderTopColor: 'transparent', borderRadius: '50%' }}
      />
    </div>
  );

  if (!property) return (
    <div style={{ minHeight: '100vh', background: '#F9F8F3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888', fontFamily: "'Playfair Display', serif", fontSize: 22, fontStyle: 'italic' }}>Property not found</p>
    </div>
  );

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each element's animation
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.215, 0.610, 0.355, 1.000] } },
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#F9F8F3', // Warm off-white
      color: '#1A1D2D', // Deep Navy
      fontFamily: "'Outfit', sans-serif",
      padding: '40px'
    }}>
      <style>{`
        /* Professional Font Pairing */
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        .stat-category { border-bottom: 1px solid #EAE8E0; padding: 20px 0; display: grid; grid-template-columns: 1fr 1fr; align-items: center; }
        .stat-category:first-of-type { border-top: 1px solid #EAE8E0; }
        .stat-category:last-of-type { border-bottom: none; }
        
        .action-button {
            background: #1A1D2D;
            color: #F9F8F3;
            padding: 18px 45px;
            border: none;
            border-radius: 2px;
            font-weight: 500;
            letter-spacing: 2px;
            cursor: pointer;
            transition: all 0.4s;
            text-transform: uppercase;
            font-size: 12px;
        }
        .action-button:hover {
            background: #C9A84C; // Gold accent
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(201, 168, 76, 0.15);
        }
        .back-link:hover { color: #C9A84C !important; }
      `}</style>

      {/* Main Container - The "Staggered Reveal" Parent */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}
      >
        
        {/* Left Column - Navigation & Image */}
        <div>
          <motion.button 
            variants={itemVariants}
            onClick={() => navigate(-1)} 
            className="back-link"
            style={{ 
              background: 'none', border: 'none', color: '#888', cursor: 'pointer', 
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 40, transition: 'color 0.3s'
            }}>
            ← Return to listings
          </motion.button>
          
          <motion.div 
            variants={itemVariants} 
            style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', boxShadow: '0 20px 60px rgba(26, 29, 45, 0.08)' }}
          >
            <img
              src={`http://localhost:5000/uploads/${property.image}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              alt={property.title}
            />
            {/* Price overlay */}
            <div style={{ position: 'absolute', top: 30, right: 30, background: 'rgba(249, 248, 243, 0.9)', backdropFilter: 'blur(5px)', padding: '12px 25px', borderRadius: '2px', border: '1px solid #EAE8E0' }}>
              <span style={{ color: '#C9A84C', fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 500, letterSpacing: 0.5 }}>
                ₹{Number(property.price).toLocaleString('en-IN')}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Structured Content */}
        <motion.div variants={itemVariants} style={{ paddingTop: '50px' }}>
          
          <span style={{ color: '#AAA', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase', marginBottom: 15, display: 'block' }}>
               {property.location}
          </span>
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '48px', 
            margin: '0 0 50px', 
            lineHeight: 1.1, 
            fontWeight: 500
          }}>
            {property.title}
          </h1>

          {/* Details Grid */}
          <div style={{ marginBottom: 60 }}>
            {[
              { label: 'Total Area', val: `${property.area} sqft` },
              { label: 'Bedroom Suites', val: property.bedrooms },
              { label: 'Bathroom Facilities', val: property.bathrooms },
              { label: 'Asking Price', val: `₹${Number(property.price).toLocaleString('en-IN')}` }
            ].map((item, idx) => (
              <div key={idx} className="stat-category">
                <p style={{ color: '#AAA', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 }}>{item.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: idx === 3 ? 24 : 20, color: idx === 3 ? '#C9A84C' : '#1A1D2D', fontStyle: idx === 3 ? 'normal' : 'italic' }}>{item.val}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <button className="action-button">Request a Viewing</button>
            <p style={{ fontSize: 11, color: '#AAA', letterSpacing: 1 }}>
              Listed: {new Date(property.createdAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
            </p>
          </div>

        </motion.div>

      </motion.div>

      {/* Subtle Footer Spacing */}
      <div style={{ height: 100 }} />
    </div>
  );
};

export default PropertyDetails;