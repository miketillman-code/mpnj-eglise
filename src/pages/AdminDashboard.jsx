import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('Tous');
  
  // NOUVEAU : State pour gérer l'affichage du formulaire
  const [showForm, setShowForm] = useState(false);

  // Listes de données
  const [videos, setVideos] = useState([]);
  const [events, setEvents] = useState([]);
  const [cells, setCells] = useState([]);
  const [members, setMembers] = useState([]);
  const [requests, setRequests] = useState([]);

  // States de formulaires
  const [videoLink, setVideoLink] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [cellQuartier, setCellQuartier] = useState('');
  const [cellResponsable, setCellResponsable] = useState('');
  const [cellAdresse, setCellAdresse] = useState('');
  const [mNom, setMNom] = useState('');
  const [mTel, setMTel] = useState('');
  const [mAdresse, setMAdresse] = useState('');
  const [mStatut, setMStatut] = useState('Non Baptisé');
  const [msgSearch, setMsgSearch] = useState('');
  const [msgFilter, setMsgFilter] = useState('Tous');

  // Réinitialiser l'affichage du formulaire quand on change d'onglet
  useEffect(() => {
    setShowForm(false);
  }, [activeTab]);

  // --- SYNCHRONISATION FIREBASE ---
  useEffect(() => {
    const qVideos = query(collection(db, "videos"), orderBy("timestamp", "desc"));
    const unsubVideos = onSnapshot(qVideos, (snap) => setVideos(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const qEvents = query(collection(db, "events"), orderBy("timestamp", "desc"));
    const unsubEvents = onSnapshot(qEvents, (snap) => setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const qCells = query(collection(db, "cells"), orderBy("timestamp", "desc"));
    const unsubCells = onSnapshot(qCells, (snap) => setCells(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const qMembers = query(collection(db, "members"), orderBy("timestamp", "desc"));
    const unsubMembers = onSnapshot(qMembers, (snap) => setMembers(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const qMessages = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubMessages = onSnapshot(qMessages, (snap) => setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    return () => { unsubVideos(); unsubEvents(); unsubCells(); unsubMembers(); unsubMessages(); };
  }, []);

  // --- SUPPRESSION ---
  const deleteItem = async (id, collectionName) => {
    if(window.confirm("Voulez-vous vraiment supprimer cet élément définitivement ?")) {
      try {
        await deleteDoc(doc(db, collectionName, id));
      } catch (error) {
        alert("Erreur : " + error.message);
      }
    }
  };

  // --- ACTIONS D'AJOUT (Avec fermeture automatique du formulaire) ---
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "members"), {
        nom: mNom, tel: mTel, adresse: mAdresse, statut: mStatut,
        dateInscription: new Date().toLocaleDateString(), timestamp: serverTimestamp()
      });
      setMNom(''); setMTel(''); setMAdresse(''); setMStatut('Non Baptisé');
      setShowForm(false); // Ferme le formulaire
      alert("Membre enregistré !");
    } catch (err) { alert("Erreur d'enregistrement"); }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoLink.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    
    if(id) {
      try {
        await addDoc(collection(db, "videos"), {
          embedId: id, titre: videoTitle, date: new Date().toLocaleDateString(), timestamp: serverTimestamp()
        });
        setVideoLink(''); setVideoTitle('');
        setShowForm(false); // Ferme le formulaire
        alert("Vidéo publiée !");
      } catch (err) { alert("Erreur lors de la publication"); }
    } else {
      alert("Lien YouTube invalide");
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), {
        titre: eventTitle, date: eventDate, description: eventDesc, image: eventImage, timestamp: serverTimestamp()
      });
      setEventTitle(''); setEventDate(''); setEventDesc(''); setEventImage('');
      setShowForm(false); // Ferme le formulaire
      alert("Événement créé !");
    } catch (err) { alert("Erreur lors de la création"); }
  };

  const handleAddCell = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "cells"), {
        quartier: cellQuartier, responsable: cellResponsable, adresse: cellAdresse, timestamp: serverTimestamp()
      });
      setCellQuartier(''); setCellResponsable(''); setCellAdresse('');
      setShowForm(false); // Ferme le formulaire
      alert("Cellule ajoutée !");
    } catch (err) { alert("Erreur lors de l'ajout"); }
  };

  // --- FILTRES ---
  const filteredMembers = members.filter(m => {
    const matchSearch = m.nom.toLowerCase().includes(searchTerm.toLowerCase()) || m.tel.includes(searchTerm);
    const matchStatut = filterStatut === 'Tous' || m.statut === filterStatut;
    return matchSearch && matchStatut;
  });

  const filteredMessages = requests.filter(req => {
    const matchSearch = req.nom.toLowerCase().includes(msgSearch.toLowerCase());
    const matchType = msgFilter === 'Tous' || req.type === msgFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-blue-900 text-white p-6 md:p-8 shadow-2xl sticky top-0 z-50 md:h-screen md:sticky">
        <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-10 text-amber-500 tracking-tighter text-center md:text-left">MPNJC ADMIN</h2>
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
          {['videos', 'events', 'cellules'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap flex-shrink-0 w-auto md:w-full flex items-center gap-3 p-3 md:p-4 rounded-xl capitalize transition-all text-xs md:text-sm ${activeTab === tab ? 'bg-amber-500 text-blue-900 font-bold shadow-lg' : 'hover:bg-white/10 text-blue-100'}`}>
              {tab === 'videos' ? '🎥 Vidéos' : tab === 'events' ? '📅 Événements' : '🏠 Cellules'}
            </button>
          ))}
          <button onClick={() => setActiveTab('membres')} className={`whitespace-nowrap flex-shrink-0 w-auto md:w-full flex items-center gap-3 p-3 md:p-4 rounded-xl transition text-xs md:text-sm ${activeTab === 'membres' ? 'bg-amber-500 text-blue-900 font-bold' : 'hover:bg-white/10 text-blue-100'}`}>
              <span>👥</span> Membres
          </button>
          <button onClick={() => setActiveTab('messages')} className={`whitespace-nowrap flex-shrink-0 w-auto md:w-full flex items-center gap-3 p-3 md:p-4 rounded-xl transition text-xs md:text-sm ${activeTab === 'messages' ? 'bg-amber-500 text-blue-900 font-bold' : 'hover:bg-white/10 text-blue-100'}`}>
              <span>📩</span> Messages {requests.filter(r => !r.lu).length > 0 && <span className="bg-red-500 text-white text-[8px] md:text-[10px] px-2 py-1 rounded-full">Nouveau</span>}
          </button>
        </nav>
        <div className="hidden md:block mt-20 p-4 bg-blue-800/50 rounded-2xl border border-blue-700">
            <p className="text-[10px] uppercase font-bold text-blue-300 mb-2">Note</p>
            <p className="text-[11px] leading-relaxed text-blue-100 italic">N'oubliez pas d'inclure la page de donation pour chaque événement spécial.</p>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="flex-grow p-4 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
             <h1 className="text-2xl md:text-3xl font-black text-blue-900 uppercase tracking-tight">Gestion des { activeTab}</h1>
             {/* BOUTON D'OUVERTURE DU FORMULAIRE (Sauf pour Messages) */}
             {activeTab !== 'messages' && !showForm && (
               <button 
                 onClick={() => setShowForm(true)}
                 className="bg-blue-700 hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-bold uppercase text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2"
               >
                 <span>＋</span> Ajouter
               </button>
             )}
          </div>

          <section className="mb-8">
            
            {/* --- SECTION MESSAGES (Pas de formulaire d'ajout) --- */}
            {activeTab === 'messages' && (
              <div className="space-y-8">
                {/* ... (Code Messages identique) ... */}
                <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-lg border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-black text-blue-900 uppercase tracking-tighter">Boîte de Réception</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{filteredMessages.length} message(s)</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <input type="text" placeholder="Chercher un fidèle..." value={msgSearch} onChange={(e) => setMsgSearch(e.target.value)} className="w-full md:w-auto bg-gray-100 px-6 py-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    <select value={msgFilter} onChange={(e) => setMsgFilter(e.target.value)} className="w-full md:w-auto bg-blue-900 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider outline-none cursor-pointer">
                      <option value="Tous">Tous</option>
                      <option value="Requête de prière">Requêtes</option>
                      <option value="Prendre rendez-vous">Rendez-vous</option>
                      <option value="Témoignage">Témoignages</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-6">
                  {filteredMessages.map((req) => (
                    <div key={req.id} className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col sm:flex-row">
                      <div className={`w-full h-2 sm:w-2 sm:h-auto ${req.type === 'Requête de prière' ? 'bg-blue-500' : req.type === 'Prendre rendez-vous' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                      <div className="p-6 md:p-8 flex-grow">
                        <div className="flex justify-between items-start mb-4 gap-4">
                          <div className="min-w-0">
                            <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${req.type === 'Requête de prière' ? 'bg-blue-600 text-white' : 'bg-amber-500 text-white'}`}>{req.type}</span>
                            <h3 className="text-lg font-black text-blue-950 uppercase mt-2">{req.nom}</h3>
                            <p className="text-blue-600 font-bold text-sm">📞 {req.tel}</p>
                          </div>
                          <button onClick={() => deleteItem(req.id, 'messages')} className="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all">🗑</button>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-6 italic text-gray-700 text-sm">"{req.message}"</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- SECTION MEMBRES --- */}
            {activeTab === 'membres' && (
               <div className="space-y-10">
                {/* FORMULAIRE REPLIABLE */}
                {showForm && (
                  <div className="bg-blue-50/50 p-3 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-blue-100 animate-fade-in-down">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-blue-900 uppercase">Nouvelle Inscription</h2>
                      <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 font-bold">✕ Fermer</button>
                    </div>
                    <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <input type="text" value={mNom} onChange={(e) => setMNom(e.target.value)} placeholder="Nom Complet" className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
                      </div>
                      <div className="space-y-1">
                        <input type="tel" value={mTel} onChange={(e) => setMTel(e.target.value)} placeholder="Téléphone" className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <input type="text" value={mAdresse} onChange={(e) => setMAdresse(e.target.value)} placeholder="Adresse" className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Statut</label>
                        <select value={mStatut} onChange={(e) => setMStatut(e.target.value)} className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-black text-sm">
                          <option value="Non Baptisé">Non Baptisé</option>
                          <option value="Baptisé">Baptisé</option>
                          <option value="En formation">En formation</option>
                          <option value="Serviteur">Serviteur / Ouvrier</option>
                        </select>
                      </div>
                      <div className="flex items-end gap-4">
                        <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl text-xs uppercase">Annuler</button>
                        <button type="submit" className="flex-[2] bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition text-xs uppercase">Enregistrer</button>
                      </div>
                    </form>
                  </div>
                )}

                {/* LISTE */}
                <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 md:p-8 bg-blue-950 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <h2 className="font-black text-xl md:text-2xl tracking-tighter uppercase">REGISTRE MPNJC</h2>
                      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {/* Barre de recherche par Nom ou Téléphone */}
                        <input 
                          type="text" 
                          placeholder="Chercher un nom ou tél..." 
                          value={searchTerm} 
                          onChange={(e) => setSearchTerm(e.target.value)} 
                          className="w-full sm:w-auto pl-6 pr-4 py-3 rounded-xl text-white text-sm font-bold border border-gray-300 outline-none focus:ring-2 focus:ring-amber-500" 
                        />
                        
                        {/* Filtre par Statut Spirituel */}
                        <select 
                          value={filterStatut} 
                          onChange={(e) => setFilterStatut(e.target.value)} 
                          className="w-full sm:w-auto bg-blue-800 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer outline-none border border-blue-700"
                        >
                          <option value="Tous">Tous les statuts</option>
                          <option value="Baptisé">Baptisés</option>
                          <option value="Non Baptisé">Non Baptisés</option>
                          <option value="En formation">En formation</option>
                          <option value="Serviteur">Serviteurs</option>
                        </select>
                      </div>
                    </div>
                  </div>                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                      <tbody className="text-sm">
                        {filteredMembers.map(m => (
                          <tr key={m.id} className="border-t hover:bg-blue-50/50">
                            <td className="p-6 font-black text-blue-950 uppercase">{m.nom}</td>
                            <td className="p-6 text-gray-600">{m.tel}</td>
                            <td className="p-6"><span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase bg-blue-100 text-blue-700 border border-blue-200">{m.statut}</span></td>
                            <td className="p-6 text-right"><button onClick={() => deleteItem(m.id, 'members')} className="text-red-400 hover:text-red-600 font-bold text-xs uppercase">Supprimer</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* --- SECTION VIDEOS --- */}
            {activeTab === 'videos' && (
              <>
              {showForm && (
                <div className="bg-blue-50/50 p-3 rounded-[2rem] border-2 border-blue-100 mb-6 animate-fade-in-down">
                    <h3 className="font-bold text-blue-900 uppercase mb-4">Nouvelle vidéo</h3>
                    <form onSubmit={handleAddVideo} className="space-y-4">
                        <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} placeholder="Titre du message" className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none" required />
                        <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} placeholder="Lien YouTube" className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none" required />
                        <div className="flex gap-4">
                            <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-600 font-bold py-4 rounded-xl uppercase text-xs">Annuler</button>
                            <button type="submit" className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg uppercase text-xs">Publier</button>
                        </div>
                    </form>
                </div>
              )}
              </>
            )}

            {/* --- SECTION EVENTS --- */}
            {activeTab === 'events' && (
              <>
              {showForm && (
                <div className="bg-blue-50/50 p-3 rounded-[2rem] border-2 border-blue-100 mb-6 animate-fade-in-down">
                  <h3 className="font-bold text-blue-900 uppercase mb-4">Nouvel Événement</h3>
                  <form onSubmit={handleAddEvent} className="space-y-4">
                    <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Titre" className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none" required />
                    <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none" required />
                    <textarea value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} placeholder="Description" className="w-full bg-white border border-gray-300 p-2 rounded-xl h-24 outline-none" required />
                    <div className="flex gap-4">
                         <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-600 font-bold py-4 rounded-xl uppercase text-xs">Annuler</button>
                         <button type="submit" className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg uppercase text-xs">Ajouter</button>
                    </div>
                  </form>
                </div>
              )}
              </>
            )}

            {/* --- SECTION CELLULES --- */}
            {activeTab === 'cellules' && (
               <>
               {showForm && (
                 <div className="bg-blue-50/50 p-3 rounded-[2rem] border-2 border-blue-100 mb-6 animate-fade-in-down">
                   <h3 className="font-bold text-blue-900 uppercase mb-4">Nouvelle Cellule</h3>
                   <form onSubmit={handleAddCell} className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <input type="text" value={cellQuartier} onChange={(e) => setCellQuartier(e.target.value)} placeholder="Quartier" className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none" required />
                        <input type="text" value={cellResponsable} onChange={(e) => setCellResponsable(e.target.value)} placeholder="Responsable" className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none" required />
                     </div>
                     <input type="text" value={cellAdresse} onChange={(e) => setCellAdresse(e.target.value)} placeholder="Adresse" className="w-full bg-white border border-gray-300 p-2 rounded-xl outline-none" required />
                     <div className="flex gap-4">
                         <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-600 font-bold py-4 rounded-xl uppercase text-xs">Annuler</button>
                         <button type="submit" className="flex-[2] bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg uppercase text-xs">Enregistrer</button>
                     </div>
                   </form>
                 </div>
               )}
               </>
            )}

          </section>

          {/* LISTES DE SUPPRESSION (Seulement si le formulaire est fermé pour garder la page propre, ou toujours visible */}
          {activeTab !== 'messages' && activeTab !== 'membres' && (
              <section className="px-2">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-red-500">🗑</span> Liste des publications
                </h2>
                <div className="grid gap-4">
                {activeTab === 'videos' && videos.map(v => (
                    <div key={v.id} className="bg-white p-4 rounded-2xl shadow-sm border flex justify-between items-center gap-4">
                    <div className="min-w-0"><p className="font-bold text-blue-900 text-sm truncate">{v.titre}</p><p className="text-[10px] text-gray-700">{v.date}</p></div>
                    <button onClick={() => deleteItem(v.id, 'videos')} className="shrink-0 bg-red-50 text-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition text-xs">Supprimer</button>
                    </div>
                ))}
                {activeTab === 'events' && events.map(ev => (
                    <div key={ev.id} className="bg-white p-4 rounded-2xl shadow-sm border flex justify-between items-center gap-4">
                    <div className="min-w-0"><p className="font-bold text-blue-900 text-sm truncate">{ev.titre}</p><p className="text-[10px] text-gray-700">{ev.date}</p></div>
                    <button onClick={() => deleteItem(ev.id, 'events')} className="shrink-0 bg-red-50 text-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition text-xs">Supprimer</button>
                    </div>
                ))}
                {activeTab === 'cellules' && cells.map(c => (
                    <div key={c.id} className="bg-white p-4 rounded-2xl shadow-sm border flex justify-between items-center gap-4">
                    <div className="min-w-0"><p className="font-bold text-blue-900 text-sm truncate">{c.quartier}</p><p className="text-[10px] text-gray-700 truncate">Res : {c.responsable}</p></div>
                    <button onClick={() => deleteItem(c.id, 'cells')} className="shrink-0 bg-red-50 text-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition text-xs">Supprimer</button>
                    </div>
                ))}
                </div>
              </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;