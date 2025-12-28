
import React from 'react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const isNoExperience = job.experienceYears === 0;

  return (
    <div 
      onClick={() => onClick(job)}
      className="bg-white dark:bg-slate-800 p-5 rounded-[28px] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden"
    >
      {isNoExperience && (
        <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-tighter shadow-sm">
          Sin Experiencia
        </div>
      )}

      <div className="flex justify-between items-start mb-3 pr-20">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
            {job.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{job.company}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-indigo-100 dark:border-indigo-800">
          🎓 {job.educationLevel}
        </span>
        <span className="bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
          💰 {job.salary}
        </span>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-5 leading-relaxed">
        {job.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700/50">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Maicao, Guajira
        </div>
        <div className="text-[11px] font-black text-primary uppercase">Ver Detalles →</div>
      </div>
    </div>
  );
};

export default JobCard;
