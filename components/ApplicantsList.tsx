
import React from 'react';
import { Job, Applicant } from '../types';

interface ApplicantsListProps {
  job: Job;
  applicants: Applicant[];
  onBack: () => void;
  onSelectApplicant: (applicant: Applicant) => void;
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ job, applicants, onBack, onSelectApplicant }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <header className="bg-white dark:bg-slate-900 p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 sticky top-0 z-50 shadow-sm">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
           <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">{job.title}</h2>
          <p className="text-xs text-slate-500 font-medium">Lista de Candidatos ({applicants.length})</p>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto space-y-4">
        {applicants.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">Aún no hay solicitantes para esta vacante.</p>
          </div>
        ) : (
          applicants.map((app) => (
            <div 
              key={app.id} 
              onClick={() => onSelectApplicant(app)}
              className="bg-white dark:bg-slate-900 p-5 rounded-[28px] border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer relative overflow-hidden group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.name}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {app.name}
                    {app.status === 'apt' && <span className="text-emerald-500 text-sm">✓</span>}
                    {app.status === 'not-apt' && <span className="text-rose-500 text-sm">✕</span>}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">{app.role} • {app.experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                 {app.status === 'pending' && (
                   <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Nuevo</span>
                 )}
                 <svg className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </div>
              
              {app.status && app.status !== 'pending' && (
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${app.status === 'apt' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default ApplicantsList;
