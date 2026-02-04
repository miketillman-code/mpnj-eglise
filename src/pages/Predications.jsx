import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Predications = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // Pour le lecteur interne


useEffect(() => {
  // On crée une requête pour récupérer les vidéos triées par date
  const q = query(collection(db, "videos"), orderBy("timestamp", "desc"));

  // On écoute Firebase en temps réel
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const vids = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setVideos(vids);
  });

  // On arrête d'écouter si on quitte la page
  return () => unsubscribe();
}, []);

// N'oublie pas d'inclure ton bouton de donation en bas de page pour les fidèles

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header Section */}
      <div className="bg-blue-900 text-white py-10 px-6 text-center shadow-lg">
        <h1 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter mb-4">
          Nos Prédications
        </h1>
        <p className="text-blue-200 max-w-2xl mx-auto italic text-sm md:text-base">
          Retrouvez tous les messages inspirés pour votre édification spirituelle. 
          La foi vient de ce qu'on entend.
        </p>
      </div>

      {/* Grille des Vidéos */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        {videos.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-[2rem] shadow-inner border border-dashed">
            <p className="text-gray-400 font-bold uppercase tracking-widest">Aucun message disponible pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all group cursor-pointer border border-gray-100"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Miniature avec bouton Play */}
                <div className="relative aspect-video bg-black">
                  <img 
                    src={`https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`} 
                    alt={video.titre}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-amber-500 text-blue-900 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <span className="text-2xl">▶</span>
                    </div>
                  </div>
                </div>

                {/* Infos Vidéo */}
                <div className="p-6">
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{video.date}</span>
                  <h3 className="text-lg font-black text-blue-950 uppercase leading-tight mt-1 line-clamp-2">
                    {video.titre}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- LECTEUR INTERNE (MODAL) --- */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Arrière-plan flou */}
          <div 
            className="absolute inset-0 bg-blue-950/90 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          ></div>
          
          {/* Conteneur de la vidéo */}
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
            <button 
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors font-bold"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
            
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.embedId}?autoplay=1`}
              title={selectedVideo.titre}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Section Donation Obligatoire */}
      <div className="max-w-4xl mx-auto mt-10 px-6">
        <div className="bg-blue-900 rounded-[2rem] p-6 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-white text-xl md:text-3xl font-black uppercase italic mb-4">Soutenez la diffusion de l'Évangile</h2>
            <p className="text-blue-200 text-sm mb-6 max-w-lg mx-auto italic">
              Vos dons nous permettent de continuer à produire et diffuser ces messages gratuitement à travers le monde.
            </p>
            <Link to="/don" className="inline-block bg-amber-500 hover:bg-amber-400 text-blue-950 font-black px-10 py-3 rounded-xl transition-all shadow-xl uppercase tracking-widest text-xs">
              Faire une offrande
            </Link>
          </div>
          {/* Décoration de fond */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Predications;