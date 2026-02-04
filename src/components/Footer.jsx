import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-12 px-6 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Colonne 1 : Vision */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase italic">MPNJC</h3>
          <p className="text-blue-200 text-sm leading-relaxed italic max-w-xs">
            "Porter l'Évangile jusqu'aux extrémités de la terre." <br/>
            Une communauté unie dans la prière et la parole de Dieu.
          </p>
        </div>

        {/* Colonne 2 : Liens rapides */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="w-full md:w-auto font-bold mb-4 border-b border-blue-800 pb-2 uppercase text-[10px] md:text-xs tracking-widest text-amber-500">Navigation</h4>
          <ul className="space-y-3 text-sm text-blue-100">
            <li><Link to="/" className="hover:text-amber-400 transition-colors">Accueil</Link></li>
            <li><Link to="/cellules" className="hover:text-amber-400 transition-colors">Nos Cellules</Link></li>
            <li><Link to="/predications" className="hover:text-amber-400 transition-colors">Prédications</Link></li>
            <li><Link to="/evenements" className="hover:text-amber-400 transition-colors">Événements</Link></li>
            <li className="pt-4 md:pt-2">
              {/* Le bouton de don (Non optionnel) */}
              <Link to="/don" className="inline-block bg-amber-500 hover:bg-amber-600 text-blue-950 font-black px-8 py-3 md:px-6 md:py-2 rounded-xl transition-all shadow-lg text-[10px] md:text-xs uppercase tracking-wider active:scale-95">
                Soutenir l'œuvre (Don)
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Contact & Réseaux */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="w-full md:w-auto font-bold mb-4 border-b border-blue-800 pb-2 uppercase text-[10px] md:text-xs tracking-widest text-amber-500">Suivez-nous</h4>
          <div className="flex gap-6 md:gap-4 mb-6 md:mb-0">
            <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-[#1877F2] transition-transform hover:-translate-y-1 shadow-md">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-[#FF0000] transition-transform hover:-translate-y-1 shadow-md">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
          <p className="mt-6 text-xs text-blue-300 leading-loose">
            ✉️ contact@mpnjc.com <br/>
            📞 +243 000 000 000
          </p>
        </div>

      </div>
      
      {/* Copyright avec Mike Tillman Moise */}
      <div className="border-t border-blue-900 mt-12 pt-8 text-center px-4">
        <p className="text-[9px] md:text-[10px] text-blue-400 uppercase tracking-[0.2em] leading-relaxed">
          © 2025 Ministère la Puissance du Nom de Jésus-Christ <br className="md:hidden" />
          <span className="hidden md:inline"> | </span> 
          Created and maintained by <strong className="text-white">Mike Tillman Moise</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;