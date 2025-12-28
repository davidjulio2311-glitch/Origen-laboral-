
import React from 'react';
import { Job } from '../types';

interface CandidateApplicationsProps {
  appliedJobs: Job[];
  onBack: () => void;
}

const CandidateApplications: React.FC<CandidateApplicationsProps> = ({ appliedJobs, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <header className="bg-white dark:bg-slate-900 p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 sticky top-0 z-50 shadow-md">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
           <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Mis Postulaciones</h2>
          <p className="text-xs text-slate-500 font-medium">Seguimiento en tiempo real</p>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto space-y-6">
        {appliedJobs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <p className="text-slate-500 font-medium px-10">Aún no has solicitado ningún trabajo. ¡Explora las vacantes en Maicao!</p>
            <button 
              onClick={onBack}
              className="mt-6 bg-primary text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-primary/20"
            >
              Buscar Empleos
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appliedJobs.map((job) => {
              // Buscamos nuestra propia postulación en este empleo
              const myApplication = job.applicants?.find(a => a.id === 'user-id-123');
              const status = myApplication?.status || 'pending';
              const startDate = myApplication?.startDate;

              return (
                <div 
                  key={job.id} 
                  className={`bg-white dark:bg-slate-900 p-6 rounded-[32px] border transition-all shadow-sm ${
                    status === 'apt' ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">{job.title}</h3>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">{job.company}</p>
                    </div>
                    {status === 'apt' ? (
                      <div className="bg-emerald-500 text-white p-2 rounded-xl shadow-lg shadow-emerald-500/20">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      </div>
                    ) : (
                      <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-2 rounded-xl">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      Solicitado el {job.postedAt}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Estado:</span>
                       <span className={`text-xs font-black uppercase tracking-widest ${
                         status === 'apt' ? 'text-emerald-500' : 'text-amber-500'
                       }`}>
                         {status === 'apt' ? '¡ACEPTADO!' : 'En Espera'}
                       </span>
                    </div>

                    {status === 'apt' && startDate && (
                      <div className="bg-emerald-500/10 dark:bg-emerald-500/5 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 mt-2">
                         <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-1">📅 INFORMACIÓN DE INICIO:</p>
                         <p className="text-emerald-800 dark:text-emerald-200 font-black text-sm">Empiezas el {startDate}</p>
                         <p className="text-[10px] text-emerald-600/70 mt-1 uppercase">Preséntate en {job.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidateApplications;
