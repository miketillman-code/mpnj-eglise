import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Evenements = () => {
  const [events, setEvents] = useState([]);


useEffect(() => {
  const q = query(collection(db, "events"), orderBy("timestamp", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
  return () => unsubscribe();
}, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10 md:mb-16">
          <h1 className="text-2xl md:text-4xl font-black text-blue-900 uppercase italic tracking-tighter px-2">
            Agenda & Événements
          </h1>
          <div className="h-1.5 w-20 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-6 font-medium text-sm md:text-base px-4">
            Ne manquez aucun de nos prochains rendez-vous spirituels
          </p>
        </header>
        
        {events.length === 0 ? (
          <div className="text-center bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-400 italic font-medium">Aucun événement n'est programmé pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:gap-10">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row transition-transform hover:scale-[1.01]">
                
                {/* Image avec fallback - Hauteur ajustée pour mobile */}
                <div className="w-full md:w-1/3 h-56 md:h-auto overflow-hidden">
                  <img 
                    src={event.image || "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600"} 
                    alt={event.titre} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600" }}
                  />
                </div>

                {/* Texte - Padding adapté */}
                <div className="p-4 md:p-8 md:w-2/3 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="bg-white-100 text-blue-600 text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                      🗓 {event.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-blue-950 mb-3 uppercase leading-tight">{event.titre}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{event.description}"</p>
                  
                  {/* Boutons - Empilement ou côte à côte selon l'écran */}
                  <div className="mt-auto flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Link to="/contact" className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-8 py-4 md:py-3 rounded-xl transition-all shadow-lg text-center text-sm uppercase tracking-widest">
                      Je participe
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section Donation - Responsive Padding */}
        <div className="mt-10 md:mt-20 p-4 md:p-12 bg-gradient-to-r from-blue-900 to-blue-800 rounded-[2rem] md:rounded-[3rem] text-white text-center shadow-2xl">
          <h2 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight px-2">Soutenir nos rassemblements</h2>
          <p className="text-blue-200 mb-4 italic text-sm md:text-base px-2">Chaque événement est une opportunité de salut. Votre don aide à l'organisation.</p>
          <Link to="/don" className="inline-block w-full sm:w-auto bg-amber-500 text-blue-900 font-black px-12 py-4 rounded-xl hover:bg-amber-400 transition transform hover:scale-105 shadow-xl text-xs uppercase tracking-widest">
            FAIRE UN DON
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Evenements;