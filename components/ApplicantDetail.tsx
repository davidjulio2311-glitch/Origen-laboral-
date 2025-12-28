
import React from 'react';
import { Applicant } from '../types';

interface ApplicantDetailProps {
  applicant: Applicant;
  onBack: () => void;
  onDecision: (status: 'apt' | 'not-apt') => void;
}

const ApplicantDetail: React.FC<ApplicantDetailProps> = ({ applicant, onBack, onDecision }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32">
      <header className="p-6 flex items-center gap-4 border-b border-slate-50 dark:border-slate-900">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-lg font-bold">Perfil del Candidato</h2>
      </header>

      <main className="p-6 max-w-xl mx-auto space-y-8">
        {/* Header Perfil */}
        <div className="flex flex-col items-center text-center space-y-4">
           <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-[40px] p-1 border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${applicant.name}`} alt="Candidato" className="w-full h-full object-cover" />
           </div>
           <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">{applicant.name}</h1>
              <p className="text-indigo-500 font-bold uppercase tracking-widest text-xs mt-1">{applicant.role}</p>
           </div>
        </div>

        {/* Info Rápida */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-3xl text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Experiencia</p>
              <p className="font-bold dark:text-white">{applicant.experience}</p>
           </div>
           <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-3xl text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Ubicación</p>
              <p className="font-bold dark:text-white">Maicao</p>
           </div>
        </div>

        {/* Bio */}
        <section className="space-y-3">
           <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
              Sobre el candidato
           </h3>
           <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
             {applicant.bio}
           </p>
        </section>

        {/* Habilidades */}
        <section className="space-y-3">
           <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
              Habilidades clave
           </h3>
           <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill, i) => (
                <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-2xl text-xs font-medium border border-slate-200 dark:border-slate-700">
                  {skill}
                </span>
              ))}
           </div>
        </section>

        {/* Contacto Directo */}
        <section className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-[32px] border border-indigo-100 dark:border-indigo-900/30">
           <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Información de Contacto
           </h3>
           <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                 <span className="text-indigo-400">WhatsApp:</span>
                 <span className="font-bold dark:text-white">{applicant.phone}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                 <span className="text-indigo-400">Email:</span>
                 <span className="font-bold dark:text-white">{applicant.email}</span>
              </div>
           </div>
        </section>
      </main>

      {/* Botones de Acción Fijos */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-900 flex gap-4 z-50">
         <button 
           onClick={() => onDecision('not-apt')}
           className="flex-1 bg-rose-50 text-rose-600 font-bold py-4 rounded-2xl border border-rose-100 active:scale-95 transition-all"
         >
           NO ES APTO
         </button>
         <button 
           onClick={() => onDecision('apt')}
           className="flex-1 bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/30 active:scale-95 transition-all"
         >
           ES APTO
         </button>
      </div>
    </div>
  );
};

export default ApplicantDetail;
