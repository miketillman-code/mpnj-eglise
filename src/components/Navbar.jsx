import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // État pour ouvrir/fermer le menu sur mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-blue-900 tracking-tighter shrink-0">
          MPNJC
        </Link>

        {/* LIENS ORDINATEUR (Cachés sur mobile) */}
        <ul className="hidden md:flex gap-8 font-bold text-gray-600 uppercase text-xs tracking-widest">
          <li><Link to="/cellules" className="hover:text-blue-800 transition">Nos Cellules</Link></li>
          <li><Link to="/predications" className="hover:text-blue-800 transition">Prédications</Link></li>
          <li><Link to="/evenements" className="hover:text-blue-800 transition">Événements</Link></li>
          <li><Link to="/contact" className="hover:text-blue-800 transition ">Contact</Link></li>
        </ul>

        {/* BOUTON DROITE */}
        <div className="flex items-center gap-4">
          <Link to="/don" className="hidden sm:block">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full font-black text-[15px] uppercase shadow-md transition transform hover:scale-110 active:scale-95">
              Faire un don
            </button>
          </Link>

          {/* ICÔNE MENU BURGER (Visible uniquement sur mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-blue-900 p-2"
          >
            {isOpen ? (
              <span className="text-2xl">✕</span> // Icône Fermer
            ) : (
              <span className="text-2xl">☰</span> // Icône Menu
            )}
          </button>
        </div>
      </div>

      {/* MENU MOBILE (S'affiche uniquement quand isOpen est vrai) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 space-y-4 shadow-xl">
          <ul className="flex flex-col gap-5 font-black text-blue-900 uppercase text-sm tracking-tighter">
            <li><Link to="/cellules" onClick={() => setIsOpen(false)} className="block">Nos Cellules</Link></li>
            <li><Link to="/predications" onClick={() => setIsOpen(false)} className="block">Prédications</Link></li>
            <li><Link to="/evenements" onClick={() => setIsOpen(false)} className="block">Événements</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)} className="block">Contact</Link></li>
            <li className="pt-4">
              <Link to="/don" onClick={() => setIsOpen(false)} className="block bg-amber-500 text-white text-center py-4 rounded-2xl">
                FAIRE UN DON
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;