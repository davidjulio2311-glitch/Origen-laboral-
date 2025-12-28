
import React from 'react';
import { Job } from '../types';

interface EmployerDashboardProps {
  myJobs: Job[];
  onPostJob: () => void;
  onLogout: () => void;
  onViewApplicants: (job: Job) => void;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ myJobs, onPostJob, onLogout, onViewApplicants }) => {
  const totalCandidates = myJobs.reduce((acc, job) => acc + (job.applicants?.length || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors">
      <header className="bg-slate-900 dark:bg-black p-6 rounded-b-[40px] text-white shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <span className="font-bold tracking-tight">Panel Empresa</span>
          </div>
          <button onClick={onLogout} className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest">
            Cerrar Sesión
          </button>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-1">¡Hola de nuevo!</h2>
          <p className="text-slate-400 text-sm mb-6">Gestiona tus vacantes en Maicao.</p>
          
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl">
                <div className="text-2xl font-black text-secondary">{myJobs.length}</div>
                <div className="text-[10px] uppercase text-slate-500 font-bold">Publicaciones</div>
             </div>
             <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl">
                <div className="text-2xl font-black text-indigo-400">{totalCandidates}</div>
                <div className="text-[10px] uppercase text-slate-500 font-bold">Solicitantes</div>
             </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto space-y-8">
        <button 
          onClick={onPostJob}
          className="bg-secondary hover:bg-secondary-dark text-white font-black py-5 rounded-3xl shadow-xl shadow-secondary/20 transition-all active:scale-95 w-full flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          PUBLICAR NUEVA VACANTE
        </button>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white px-2 flex justify-between items-center">
             Actividad Reciente
             <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 px-2 py-1 rounded-full uppercase">En Vivo</span>
          </h3>

          {myJobs.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[32px] border border-dashed border-slate-200 dark:border-slate-800 text-center">
               <p className="text-sm text-slate-400 italic">Tus ofertas aparecerán aquí.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myJobs.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => onViewApplicants(job)}
                  className="bg-white dark:bg-slate-900 p-5 rounded-[28px] border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{job.title}</h4>
                      <p className="text-[10px] text-indigo-500 uppercase font-black tracking-widest">Maicao</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                       <span className="bg-indigo-600 text-white text-xs font-black h-8 w-8 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30">
                         {job.applicants?.length || 0}
                       </span>
                       <span className="text-[8px] text-slate-400 uppercase font-bold mt-1">Nuevos</span>
                    </div>
                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
