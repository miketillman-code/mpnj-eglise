import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase"; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔹 Déconnexion propre avant toute tentative
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Aucune session Firebase existante à supprimer");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');

    } catch (error) {
      console.error("Erreur Firebase Auth :", error.code, error.message);
      alert("Connexion impossible : " + error.code);
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-md w-full bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>

        <div className="text-center mb-8">
          <div className="bg-amber-50/50 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border border-amber-100">
            <span className="text-2xl">🔐</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-blue-900 uppercase italic tracking-tighter">
            Espace Admin
          </h1>
          <p className="text-black-500 text-[11px] md:text-sm mt-2 font-medium px-4 leading-tight">
            Accès réservé aux responsables du MPNJC
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
          {/* Email */}
          <div>
            <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
              Email Admin
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all text-center md:text-left"
              placeholder="admin@exemple.com"
              required
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
              Mot de passe
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all text-center md:text-left"
              placeholder="••••••••"
              required
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-900 text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl transition-all active:scale-95 uppercase tracking-widest text-[11px] md:text-sm">
            Se Connecter
          </button>
        </form>

        <div className="mt-8 md:mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-[9px] md:text-[10px] text-black-400 uppercase tracking-widest leading-relaxed">
            Ministère la Puissance du <br className="md:hidden" />Nom de Jésus-Christ <br />
            Gestion des Requêtes & Médias
          </p>
        </div>
      </div>

      <button 
        onClick={() => navigate('/')} 
        className="mt-8 bg-white/5 border border-white/10 px-6 py-2 rounded-full text-blue-300 text-[10px] font-bold hover:text-white hover:bg-white/10 transition uppercase tracking-widest"
      >
        ← Retour au site public
      </button>
    </div>
  );
};

export default AdminLogin;
