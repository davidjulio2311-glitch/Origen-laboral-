
import React from 'react';
import { Job } from '../types';

interface JobDetailProps {
  job: Job;
  onBack: () => void;
  onApply: (job: Job) => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onBack, onApply }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-32 transition-colors">
      <div className="h-40 bg-primary relative">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full text-white transition-all z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white dark:bg-slate-800 rounded-[40px] shadow-2xl p-8 mb-6 border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-3xl flex items-center justify-center mb-4 shadow-inner overflow-hidden">
              <img src={`https://picsum.photos/seed/${job.id}/200/200`} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1 leading-tight">{job.title}</h1>
            <p className="text-primary font-bold">{job.company}</p>
            
            {job.experienceYears === 0 && (
              <div className="mt-4 bg-secondary/10 text-secondary text-[10px] font-black px-4 py-1.5 rounded-full uppercase border border-secondary/20 tracking-wider">
                🌟 Ideal para tu primer empleo
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-3xl text-center">
              <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Educación Requerida</p>
              <p className="font-bold text-slate-900 dark:text-white">{job.educationLevel}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-3xl text-center">
              <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Experiencia Laboral</p>
              <p className="font-bold text-slate-900 dark:text-white">{job.experienceYears > 0 ? `${job.experienceYears} años` : 'No se requiere'}</p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Descripción del Puesto
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed ml-4">
                {job.description}
              </p>
            </section>

            <section>
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                ¿Qué necesitas?
              </h3>
              <ul className="space-y-3 ml-4">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                    <span className="text-secondary font-bold">●</span>
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-50">
        <button 
          onClick={() => onApply(job)}
          className="w-full bg-secondary hover:bg-secondary-dark text-white font-black py-5 rounded-3xl shadow-xl shadow-secondary/20 transition-all active:scale-95 text-lg"
        >
          POSTULARME AHORA
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
