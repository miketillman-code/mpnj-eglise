import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSendPriere = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await addDoc(collection(db, "messages"), {
        nom: formData.get('nom') || formData.get('prenom'),
        tel: formData.get('tel'),
        type: formData.get('sujet') || "Requête de prière",
        message: formData.get('message'),
        date: new Date().toLocaleString('fr-FR'),
        timestamp: serverTimestamp()
      });
      alert("Message envoyé avec succès !");
      e.target.reset();
      if (showModal) setShowModal(false);
    } catch (error) {
      console.error("Erreur Firebase:", error);
      alert("Erreur de connexion à la base de données.");
    }
  };

  return (
    <>
      {/* SECTION HERO */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 pt-28 pb-12 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <img src="/cpc1.jpg" alt="Fond" className="w-full h-full object-cover grayscale opacity-70" />
          <div className="absolute inset-0 bg-blue-900/90"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
          <h1 className="text-2xl md:text-6xl font-extrabold mb-4 tracking-tight px-2 text-center">
            Ministère la Puissance du Nom de Jésus-Christ
          </h1>

          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/50 px-4 py-1 rounded-full mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">Culte en direct : Dimanche 08h30</span>
          </div>

          {/* CONTENEUR ANIMATION STABILISÉ */}
          <div className="text-center mb-8 w-full max-w-3xl">
            <div className="min-h-[100px] md:min-h-[120px] flex items-center justify-center">
              <h2 className="text-xl md:text-4xl font-extrabold tracking-tight px-2 leading-tight">
                <TypeAnimation
                  sequence={[
                    'Si ton dieu est "mort" essaie le Mien', 2000,
                    'La Parole qui Restaure', 2000,
                    "Avec l'Ev. Kiziamina Kibila Jean-Oscar", 2000,
                  ]}
                  repeat={Infinity}
                />
              </h2>
            </div>
            
            <button 
              onClick={() => setShowModal(true)}
              className="mt-6 bg-amber-500 text-blue-900 font-black px-8 md:px-10 py-4 rounded-2xl shadow-2xl hover:bg-amber-400 transition transform active:scale-95 text-sm md:text-base"
            >
              🙏 UN SUJET DE PRIÈRE ?
            </button>
          </div>

          {/* DASHBOARD DES HORAIRES RECADRÉ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-4">
            {[
              { jour: "Dimanche", sujet: "Culte d'action de grace", heure: "07h00 — 11h00" },
              { jour: "Mardi", sujet: "Culte d'Enseignement", heure: "17h00 — 19h30" },
              { jour: "Jeudi", sujet: "Intercession", heure: "17h00 — 19h30" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col items-center text-center">
                <span className="text-[15px] text-amber-400 font-bold mb-1 uppercase md:text-[20px] tracking-[0.2em]">{item.jour}</span>
                <span className="text-amber-400 font-bold mb-1 uppercase text-[10px] md:text-[10px] tracking-[0.2em]">{item.sujet}</span>
                <p className="text-base md:text-sm font-semibold text-white leading-tight">{item.heure}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION VISION */}
      <section className="py-16 md:py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="relative">
            <div className="aspect-photo bg-gray-200 rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-gray-50">
               <img src="/DSC_3902.jpg" alt="Église" className="w-full h-full object-cover" />
            </div>
            
          </div>
          <div>
            <h2 className="text-amber-500 font-bold uppercase tracking-widest text-xs md:sm mb-4">Qui sommes-nous ?</h2>
            <h3 className="text-2xl md:text-4xl font-black text-blue-900 mb-6 leading-tight">Le Ministère la Puissance du Nom de Jésus-Christ</h3>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
              <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white p-6 rounded-2xl hidden md:block shadow-xl">
              <p className="text-3xl font-bold italic">15+</p>
              <p className="text-[10px] uppercase font-bold text-blue-300">Années de Ministère</p>
            </div>
              La MPNJC est dédiée à l'enseignement pur de la parole de Dieu et à la manifestation de l'Esprit. Notre mission est de préparer un peuple saint pour la seconde venue du Seigneur <strong>Jésus-Christ</strong>.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 font-bold text-gray-800 italic text-sm md:text-base">✓ Enseignement Biblique Pur</div>
              <div className="flex items-center gap-4 font-bold text-gray-800 italic text-sm md:text-base">✓ Communion Fraternelle Réelle</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TÉMOIGNAGES - Stabilisée pour éviter le layout shift */}
<section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center">
  <div className="absolute inset-0 z-0">
    {/* Correction du chemin de l'image pour le dossier public */}
    <img src="/cpc2.jpg" alt="Pasteur" className="w-full h-full object-cover grayscale opacity-50" />
    <div className="absolute inset-0 bg-blue-900/90"></div>
  </div>
  
  <div className="relative z-10 max-w-4xl mx-auto px-6 text-white text-center">
    <span className="text-2xl md:text-4xl text-amber-500 font-serif opacity-90 mb-2 block italic">
      "Ce que disent nos fidèles"
    </span>
    
    {/* Conteneur avec hauteur fixe pour stabiliser le texte qui change */}
    <div className="min-h-[180px] md:min-h-[160px] flex items-center justify-center">
      <TypeAnimation
        sequence={[
          '"La MPNJC est une famille où l\'on grandit réellement." — Fr. Marc Kabongo.', 3000,
          '"Ma vie de prière a totalement changé depuis mon arrivée au Ministère la Puissance." — Sr. Sarah Luwangu.', 3000,
          '"Un enseignement pur qui restaure l\'âme et le corps." — Fr. David Mande.', 3000,
        ]}
        wrapper="p" 
        repeat={Infinity} 
        className="text-lg md:text-3xl font-medium italic leading-relaxed"
      />
    </div>
  </div>
</section>

      {/* SECTION FORMULAIRE - Padding et grid adaptés */}
      <section className="py-10 md:py-24 bg-white px-4">
        <div className="max-w-4xl mx-auto px-2">
          <div className="bg-gray-50 border-2 border-dashed border-blue-200 rounded-[2rem] md:rounded-[3rem] p-4 md:p-16 shadow-inner text-center">
            <h2 className="text-2xl md:text-4xl font-black text-blue-900 mb-4 uppercase tracking-tighter italic">Un sujet de Prière ?</h2>
            <p className="text-gray-500 mb-4 md:mb-12 text-sm">Confiez-nous votre requête, notre équipe d'intercession priera pour vous.</p>
            <form onSubmit={handleSendPriere} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <input name="prenom" type="text" placeholder="Nom Complet" className="bg-white border border-gray-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" required />
              <input name="tel" type="text" placeholder="Votre téléphone" className="bg-white border border-gray-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea name="message" placeholder="Décrivez votre sujet de prière..." className="md:col-span-2 bg-white border border-gray-300 p-4 rounded-xl h-40 outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
              <button className="md:col-span-2 bg-blue-600 hover:bg-blue-950 text-white font-black py-3 rounded-xl transition-all shadow-xl uppercase tracking-widest text-sm">
                Envoyer votre requête
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MODAL - Taille adaptée */}
      {showModal && (
        <div className="fixed inset-0 bg-blue-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-10 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-6 text-gray-400 text-3xl">×</button>
            <h2 className="text-xl font-black text-blue-900 mb-4 uppercase italic">Requête Urgente</h2>
            <form onSubmit={handleSendPriere} className="space-y-4">
              <input name="nom" type="text" placeholder="Nom complet" className="w-full bg-gray-50 border border-gray-300 p-2 rounded-xl outline-none" required />
              <input name="tel" type="tel" placeholder="WhatsApp" className="w-full bg-gray-50 border border-gray-300 p-2 rounded-xl outline-none" required />
              <textarea name="message" placeholder="Détail de votre requête..." className="w-full bg-gray-50 border border-gray-300 p-4 rounded-xl h-32 outline-none" required></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-lg uppercase">Envoyer à l'église</button>
            </form>
          </div>
        </div>
      )}

      {/* Footer Donation (Inchangé mais utile) */}
      <div className="bg-amber-500 py-6 text-center text-blue-900 font-black uppercase text-[10px] md:text-xs tracking-[0.2em] italic px-4">
        Soutenez l'œuvre de Dieu — <button onClick={() => window.location.href='/don'} className="underline decoration-2 underline-offset-4">Faire un don maintenant</button>
      </div>
    </>
  );
};

export default Hero;