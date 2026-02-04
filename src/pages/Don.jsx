import React from 'react';

const Don = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* En-tête avec verset biblique */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 uppercase italic tracking-tighter">
            Soutenir notre Ministère
          </h1>
          <div className="h-1 w-20 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-sm md:text-lg text-gray-600 italic max-w-2xl mx-auto px-2 leading-relaxed">
            "Chacun doit donner ce qu’il a décidé dans son cœur, sans regret et sans contrainte, car Dieu aime celui que donne avec joie."
            <br/><span className="font-bold text-blue-900 block mt-2">— 2 Corinthiens 9:7</span>
          </p>
        </div>
        <div className="mt-3 md:mt-4 rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 text-center ">
          <h2 className="text-l md:text-xl font-bold mb-4 uppercase italic">⚠️ Attention aux fraudes</h2>
          <p className="text-[15px] md:text-[20px] text-gray-700">
              Pour protéger vos dons, utilisez uniquement les numéros de compte indiqué ici. Nous ne vous demanderons <strong> JAMAIS</strong> vos mots de passe ou codes bancaires. <br />
               En cas de doute, contactez le secrétariat de l’église au numéro ci-dessous.
            </p>
        </div>
        {/* Grille des méthodes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* 1. MOBILE MONEY */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-lg border-t-4 border-orange-500 flex flex-col h-full">
            <h3 className="text-xl font-bold mb-6 text-gray-800 uppercase tracking-tight">Mobile Money</h3>
            
            <div className="space-y-6 flex-grow">
              {/* Orange Money & M-Pesa */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/100px-Orange_logo.svg.png" alt="Orange" className="h-6 w-6 object-contain" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/M-Pesa_logo.png/100px-M-Pesa_logo.png" alt="M-Pesa" className="h-6 w-auto object-contain" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Orange Money ou M-pesa</p>
                  <p className="text-base md:text-lg font-mono font-bold text-orange-600 bg-orange-50 p-3 rounded-xl border border-orange-100 text-center md:text-left">
                    Pas encore disponible
                  </p>
                </div>
              </div>

              {/* Airtel Money */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                   <img src="https://www.pikpng.com/pngl/m/544-5440336_2018-download-logos-airtel-money-logo-png-clipart.png" alt="Airtel Money" className="h-6 w-auto object-contain" />

                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Airtel Money : Kiziamina Kibila J.O</p>
                  <p className="text-base md:text-lg font-mono font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 text-center md:text-left">
                    +243 998 222 267
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. CARTE BANCAIRE */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-lg border-t-4 border-blue-600 flex flex-col h-full">
            <h3 className="text-xl font-bold mb-6 text-gray-800 uppercase tracking-tight">Carte Bancaire</h3>
            
            <div className="flex gap-3 mb-6">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" className="h-5 object-contain" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 object-contain" />
            </div>

            <p className="text-gray-600 mb-8 text-sm md:text-base flex-grow">
              Donnez par carte Visa ou Mastercard via notre plateforme sécurisée <br /><strong>Pas encore disponible</strong>
            </p>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-md transition-all active:scale-95 uppercase text-xs tracking-widest">
              Accéder au paiement
            </button>
          </div>

          {/* 3. VIREMENT BANCAIRE */}
          <div className="bg-white p-6 md:p-4 rounded-[2rem] shadow-lg border-t-4 border-gray-400 flex flex-col h-full">
            <h3 className="text-xl font-bold mb-6 text-gray-800 uppercase tracking-tight">Virement Bancaire</h3>
            
            <div className="bg-gray-20 p-4 rounded-xl font-mono text-xs md:text-sm text-gray-700 mb-2 flex-grow break-all">
              <p className="font-bold mb-4 text-blue-900 border-b border-gray-200 pb-2">COORDONNÉES (RIB)</p>
              <p className="text-[15px] uppercase text-gray-500 mb-1">Banque:</p>
              <p className="text-base mb-3 font-bold">EQUITY BCDC</p>
              <p className="text-[15px] uppercase text-gray-500 mb-1">IBAN:</p>
              <p className="text-base mb-3 font-bold">00018-00500-12000001154-83</p>
              <p className="text-[15px] uppercase text-gray-500 mb-1">Swift / BIC:</p>
              <p className="text-base font-bold uppercase">BCDCCDKI</p>
            </div>

            
          </div>

        </div>

        {/* Section Assistance */}
        <div className="mt-12 md:mt-16 bg-blue-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase italic">Besoin d'aide ?</h2>
          <p className="text-blue-100 mb-8 text-sm md:text-base">Notre service comptabilité est disponible pour vous accompagner.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <span className="bg-blue-800/50 border border-blue-700 px-6 py-3 rounded-full text-xs md:text-sm font-medium">
              📞 +243 998 877 665
            </span>
            <span className="bg-blue-800/50 border border-blue-700 px-6 py-3 rounded-full text-xs md:text-sm font-medium">
              ✉️ contact@mpnjc.com
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Don;
