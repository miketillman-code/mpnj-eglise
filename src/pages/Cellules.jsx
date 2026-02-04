import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Cellules = () => {
  const [cells, setCells] = useState([]);

useEffect(() => {
  const q = query(collection(db, "cells"), orderBy("timestamp", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setCells(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
  return () => unsubscribe();
}, []);

  const openInMaps = (adresse, quartier) => {
    const searchQuery = encodeURIComponent(`${adresse}, ${quartier}, Kinshasa, RDC`);
    const url = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Texte centré sur mobile */}
        <header className="mb-10 md:mb-16 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-black text-blue-900 mb-4 tracking-tighter uppercase italic leading-tight px-2">
            Nos Cellules de Prière
          </h1>
          <p className="text-gray-600 max-w-2xl font-medium text-sm md:text-base px-2">
            "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux." 
            Trouvez la famille spirituelle la plus proche de chez vous.
          </p>
        </header>

        {cells.length === 0 ? (
          <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium italic">Aucune cellule n'est répertoriée pour le moment.</p>
          </div>
        ) : (
          /* Grille : 1 col mobile, 2 cols tablette, 3 cols desktop */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cells.map((cell) => (
              <div key={cell.id} className="bg-white p-2 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border-t-8 border-blue-600 flex flex-col hover:shadow-2xl transition-all duration-300">
                <div className="bg-amber-100 w-8 h-8 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner text-xl md:text-2xl">
                  📍
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-blue-950 mb-4 uppercase">{cell.quartier}</h3>
                
                <div className="space-y-4 flex-grow">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">👤</span>
                    <div className="text-gray-700 text-sm leading-tight">
                      <span className="block text-[9px] md:text-[10px] uppercase font-bold text-gray-400 mb-1">Responsable</span>
                      <p className="font-semibold text-gray-800">{cell.responsable}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">🏠</span>
                    <div className="text-gray-600 text-sm italic leading-relaxed">
                      <span className="block text-[9px] md:text-[10px] uppercase font-bold text-gray-400 mb-1">Localisation</span>
                      <p className="text-gray-700">{cell.adresse}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => openInMaps(cell.adresse, cell.quartier)}
                  className="mt-4 w-full py-3 bg-blue-50 text-blue-700 font-black rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 text-xs md:text-sm uppercase tracking-widest"
                >
                  🗺️ Itinéraire
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Section Donation - Empilement sur mobile */}
        <div className="mt-10 md:mt-20 p-6 md:p-10 bg-blue-900 rounded-[2rem] md:rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-center md:text-left">
          <div>
            <h4 className="text-xl font-bold mb-2 uppercase">Soutenir l'œuvre de Dieu</h4>
            <p className="text-blue-200 text-xs md:text-sm max-w-md italic px-2 md:px-0">
              Votre générosité permet à nos cellules de continuer à grandir et à bénir nos quartiers.
            </p>
          </div>
          <Link to="/don" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-amber-500 text-blue-950 font-black px-10 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-lg uppercase text-xs tracking-widest">
              Faire un don
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cellules;