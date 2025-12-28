
import React from 'react';
import { Role } from '../types';

interface RoleSelectionProps {
  onSelect: (role: Role) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-950 transition-colors">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/20">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Bienvenido a Origen</h1>
        <p className="text-slate-500 dark:text-slate-400">Tu conexión laboral en Maicao, La Guajira.</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <button 
          onClick={() => onSelect('candidate')}
          className="w-full group relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary transition-all text-left shadow-sm hover:shadow-xl flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <div>
            <div className="font-bold text-lg text-slate-900 dark:text-white">Busco Empleo</div>
            <div className="text-sm text-slate-500">Encuentra tu próximo reto hoy mismo.</div>
          </div>
        </button>

        <button 
          onClick={() => onSelect('employer')}
          className="w-full group relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-secondary transition-all text-left shadow-sm hover:shadow-xl flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-secondary/10 dark:bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          </div>
          <div>
            <div className="font-bold text-lg text-slate-900 dark:text-white">Busco Empleados</div>
            <div className="text-sm text-slate-500">Encuentra el mejor talento para tu negocio.</div>
          </div>
        </button>
      </div>

      <div className="mt-12 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
        Maicao • La Guajira • Colombia
      </div>
    </div>
  );
};

export default RoleSelection;
