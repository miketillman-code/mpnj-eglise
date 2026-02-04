import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// 1. Importe ton nouveau composant Footer
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Don from './pages/Don';
import Cellules from './pages/Cellules';
import Evenements from './pages/Evenements';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Predications from './pages/Predications';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    // Si pas connecté, on redirige vers le login
    return <Navigate to="/admin-login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/cellules" element={<Cellules />} />
            <Route path="/predications" element={<Predications />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/don" element={<Don />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Route publique pour se connecter */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* 2. Route protégée : On enveloppe le Dashboard avec ProtectedRoute */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;