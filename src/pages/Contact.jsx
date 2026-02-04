import React from 'react';
import { db } from '../firebase'; // Import de la base de données
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import des fonctions Firebase
import { Link } from 'react-router-dom';

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // On combine Prénom et Nom
    const nomComplet = `${formData.get('prenom')} ${formData.get('nom')}`;
    
    try {
      // ENREGISTREMENT DANS FIREBASE (pour que l'admin le voie)
      await addDoc(collection(db, "messages"), {
        nom: nomComplet,
        tel: formData.get('telephone') || "Non précisé",
        type: formData.get('sujet'), 
        message: formData.get('message'),
        date: new Date().toLocaleString('fr-FR'),
        timestamp: serverTimestamp(), // Crucial pour le tri
        lu: false
      });

      alert("Votre message a bien été transmis au secrétariat de la MPNJC.");
      e.target.reset();
    } catch (error) {
      console.error("Erreur Firebase:", error);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    }
  };

  const whatsappNumber = "243000000000"; 
  const whatsappMessage = encodeURIComponent("Bonjour MPNJC, j'aimerais vous contacter pour...");

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-2">
            
            {/* Colonne de Gauche : Infos */}
            <div className="bg-blue-900 px-10 py-5 md:p-16 text-white flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-black mb-4 uppercase italic tracking-tighter text-center">Restons Unis</h1>
                <p className="text-blue-200 mb-8 text-lg italic">
                  Une question sur nos cellules ? Une requête de prière ? Notre équipe est à votre écoute.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-bold">Adresse Centrale</p>
                      <p className="text-sm text-blue-200">Avenue de l'Église n°12, Kinshasa, RDC</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <p className="font-bold">Email</p>
                      <p className="text-sm text-blue-200">contact@mpnjc.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold transition-transform hover:scale-105 shadow-xl"
                >
                  <span className="text-2xl">💬</span>
                  Écrivez-nous sur WhatsApp
                </a>
              </div>
            </div>

            {/* Colonne de Droite : Formulaire */}
            <div className="p-5 md:p-16">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                    <input name="prenom" type="text" className="w-full bg-gray-50 border border-gray-300 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jean" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                    <input name="nom" type="text" className="w-full bg-gray-50 border border-gray-300 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Mukendi" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Votre N° de Téléphone (WhatsApp)</label>
                  <input name="telephone" type="tel" className="w-full bg-gray-50 border border-gray-300 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="081XXXXXXX" required />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sujet</label>
                  <select name="sujet" className="w-full bg-gray-50 border border-gray-300 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="Requête de prière">Requête de prière</option>
                    <option value="Témoignage">Témoignage</option>
                    <option value="Prendre rendez-vous">Prendre rendez-vous</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea name="message" className="w-full bg-gray-50 border border-gray-300 p-2 rounded-xl h-30 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Votre message ici..." required></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-800 text-white font-black py-2 rounded-xl transition-all shadow-lg text-lg uppercase tracking-widest">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Note de donation obligatoire */}
        <div className="mt-12 text-center">
            <p className="text-gray-400 text-xs italic mb-4">Soutenez nos ministères et l'entretien de notre plateforme digitale.</p>
            <Link to="/don" className="inline-block bg-amber-500 text-blue-900 font-black px-10 py-3 rounded-full text-xs hover:bg-amber-400 transition shadow-xl uppercase tracking-widest">
              Faire un Don à la MPNJC
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Contact;