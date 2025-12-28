
import React, { useState } from 'react';
import { Job } from '../types';
import { generateJobDetails } from '../services/geminiService';

interface JobPostingFormProps {
  onBack: () => void;
  onSave: (job: Partial<Job>) => void;
}

const JobPostingForm: React.FC<JobPostingFormProps> = ({ onBack, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    company: '',
    salary: '',
    type: 'Tiempo Completo',
    location: 'Maicao, La Guajira',
    educationLevel: 'Bachiller',
    description: '',
    requirements: [],
    skills: [],
    personalQualities: [],
    experienceYears: 0, // Default to 0 as per new policy
    contactEmail: '',
    contactPhone: '',
    tags: [],
  });

  const handleMagicFill = async () => {
    if (!formData.title) return alert("Escribe un cargo primero (ej. Auxiliar de Bodega)");
    setLoading(true);
    try {
      const details = await generateJobDetails(formData.title);
      setFormData(prev => ({
        ...prev,
        ...details,
        salary: details.salary || prev.salary,
        experienceYears: details.experienceYears ?? 0
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors">
      <header className="bg-slate-900 dark:bg-black p-6 rounded-b-[40px] text-white shadow-xl flex items-center gap-4 sticky top-0 z-50">
        <button onClick={onBack} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-xl font-bold">Publicar Vacante</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Talento Joven Maicao</p>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-2xl mx-auto -mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary font-bold text-sm">1</div>
              <h3 className="font-bold text-slate-900 dark:text-white uppercase text-sm tracking-widest">General</h3>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-widest ml-1">Cargo a cubrir</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ej. Recepcionista, Ayudante..."
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                />
                <button 
                  type="button"
                  onClick={handleMagicFill}
                  disabled={loading}
                  className="bg-secondary text-white p-4 rounded-2xl shadow-lg shadow-secondary/20"
                >
                  {loading ? '...' : '✨'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 tracking-widest ml-1">Nivel Educativo</label>
                  <select 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-secondary/50 appearance-none"
                    value={formData.educationLevel}
                    onChange={e => setFormData({...formData, educationLevel: e.target.value as any})}
                  >
                    <option value="Bachiller">Bachiller (Colegio)</option>
                    <option value="Técnico/Tecnólogo">Técnico / Tecnólogo</option>
                    <option value="Universitario">Universitario</option>
                    <option value="Cualquiera">Sin estudio mínimo</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 tracking-widest ml-1">Años de experiencia</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-secondary/50"
                    value={formData.experienceYears}
                    onChange={e => setFormData({...formData, experienceYears: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-[10px] text-secondary font-bold">Sugerencia: 0 para atraer jóvenes locales.</p>
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white uppercase text-sm tracking-widest flex items-center gap-2">
               <span className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 text-sm">2</span>
               El Trabajo
            </h3>
            <textarea 
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm text-slate-700 dark:text-slate-300 min-h-[120px] outline-none"
              placeholder="¿Qué hará el joven en tu negocio?"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-secondary hover:bg-secondary-dark text-white font-black py-5 rounded-3xl shadow-xl shadow-secondary/30 transition-all active:scale-95 text-lg uppercase"
          >
            PUBLICAR PARA EL TALENTO DE MAICAO
          </button>
        </form>
      </main>
    </div>
  );
};

export default JobPostingForm;
