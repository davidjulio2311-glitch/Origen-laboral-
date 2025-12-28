
import React, { useState, useEffect } from 'react';
import { Job, View, Role, Applicant } from './types';
import { searchJobs } from './services/geminiService';
import JobCard from './components/JobCard';
import JobDetail from './components/JobDetail';
import RoleSelection from './components/RoleSelection';
import EmployerDashboard from './components/EmployerDashboard';
import JobPostingForm from './components/JobPostingForm';
import ApplicantsList from './components/ApplicantsList';
import ApplicantDetail from './components/ApplicantDetail';
import CandidateApplications from './components/CandidateApplications';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [view, setView] = useState<View>('auth');
  const [role, setRole] = useState<Role>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setView('onboarding');
  };

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setView(selectedRole === 'candidate' ? 'home' : 'employer-dashboard');
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setView('search');
    const results = await searchJobs(query);
    setJobs(results);
    setIsLoading(false);
  };

  const handleApply = (job: Job) => {
    const currentUserApplicant: Applicant = {
      id: 'user-id-123',
      name: userEmail?.split('@')[0] || 'Usuario Candidato',
      role: job.educationLevel === 'Universitario' ? 'Profesional Local' : 'Bachiller Maicao',
      experience: 'Buscando mi primera oportunidad',
      skills: ['Deseo de aprender', 'Responsabilidad'],
      bio: 'Soy un habitante de Maicao buscando superarme.',
      phone: '3000000000',
      email: userEmail || 'candidato@maicao.com',
      status: 'pending'
    };

    if (!appliedJobIds.includes(job.id)) {
      setAppliedJobIds([...appliedJobIds, job.id]);
      
      setMyJobs(prev => prev.map(j => {
        if (j.id === job.id) {
          return { ...j, applicants: [currentUserApplicant, ...(j.applicants || [])] };
        }
        return j;
      }));

      setJobs(prev => prev.map(j => {
        if (j.id === job.id) {
          return { ...j, applicants: [currentUserApplicant, ...(j.applicants || [])] };
        }
        return j;
      }));
    }

    alert("¡Postulación enviada con éxito!");
    setView('candidate-applications');
  };

  const handleSaveJob = (newJobData: Partial<Job>) => {
    const isUni = newJobData.educationLevel === 'Universitario';
    const mockApplicants: Applicant[] = [
      { id: '1', name: 'Luis Eduardo Gámez', role: isUni ? 'Universitario' : 'Bachiller', experience: 'Sin experiencia', skills: ['Office'], bio: 'Local de Maicao.', phone: '301', email: 'luis@mail.com', status: 'pending' },
    ];

    const fullNewJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      title: newJobData.title || 'Cargo',
      company: newJobData.company || 'Negocio',
      salary: newJobData.salary || 'SMLV',
      type: newJobData.type || 'Tiempo Completo',
      location: 'Maicao, La Guajira',
      schedule: 'Lunes a Sábado',
      noDegreeRequired: newJobData.educationLevel === 'Bachiller',
      educationLevel: newJobData.educationLevel || 'Bachiller',
      description: newJobData.description || '',
      requirements: newJobData.requirements || [],
      skills: newJobData.skills || [],
      personalQualities: newJobData.personalQualities || [],
      experienceYears: 0,
      contactEmail: newJobData.contactEmail || '',
      contactPhone: newJobData.contactPhone || '',
      tags: ['Sin Experiencia'],
      postedAt: new Date().toLocaleDateString(),
      applicants: mockApplicants
    };

    setMyJobs([fullNewJob, ...myJobs]);
    setView('employer-dashboard');
  };

  const handleUpdateApplicantStatus = (jobId: string, applicantId: string, status: 'apt' | 'not-apt') => {
    const startDate = status === 'apt' ? 'Próximo Lunes, 8:00 AM' : undefined;
    
    const updateJobs = (list: Job[]) => list.map(job => {
      if (job.id === jobId && job.applicants) {
        return {
          ...job,
          applicants: job.applicants.map(app => 
            app.id === applicantId ? { ...app, status, startDate } : app
          )
        };
      }
      return job;
    });

    setMyJobs(updateJobs(myJobs));
    setJobs(updateJobs(jobs));
    setView('applicants-list');
  };

  const logout = () => { 
    setRole(null); 
    setUserEmail(null);
    setView('auth'); 
    setAppliedJobIds([]); 
  };

  const getAppliedJobs = () => {
    const allAvailableJobs = [...jobs, ...myJobs];
    return appliedJobIds.map(id => allAvailableJobs.find(j => j.id === id)).filter(Boolean) as Job[];
  };

  if (view === 'auth') return <Auth onLogin={handleLogin} />;
  if (view === 'onboarding') return <RoleSelection onSelect={handleRoleSelect} />;
  
  if (view === 'employer-dashboard') return (
    <EmployerDashboard 
      myJobs={myJobs} 
      onPostJob={() => setView('post-job')} 
      onLogout={logout}
      onViewApplicants={(job) => { setSelectedJob(job); setView('applicants-list'); }}
    />
  );

  if (view === 'post-job') return <JobPostingForm onBack={() => setView('employer-dashboard')} onSave={handleSaveJob} />;

  if (view === 'applicants-list' && selectedJob) return (
    <ApplicantsList 
      job={selectedJob} 
      applicants={myJobs.find(j => j.id === selectedJob.id)?.applicants || jobs.find(j => j.id === selectedJob.id)?.applicants || []}
      onBack={() => setView('employer-dashboard')}
      onSelectApplicant={(app) => { setSelectedApplicant(app); setView('applicant-detail'); }}
    />
  );

  if (view === 'candidate-applications') return (
    <CandidateApplications 
      appliedJobs={getAppliedJobs()} 
      onBack={() => setView('home')} 
    />
  );

  if (view === 'applicant-detail' && selectedApplicant && selectedJob) return (
    <ApplicantDetail 
      applicant={selectedApplicant}
      onBack={() => setView('applicants-list')}
      onDecision={(status) => handleUpdateApplicantStatus(selectedJob.id, selectedApplicant.id, status)}
    />
  );

  if (view === 'details' && selectedJob) return <JobDetail job={selectedJob} onBack={() => setView('search')} onApply={handleApply} />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <header className="bg-primary dark:bg-indigo-950 p-6 rounded-b-[40px] text-white shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
             <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
             </div>
             <div><h1 className="text-xl font-bold tracking-tight">Origen Laboral</h1><p className="text-[10px] text-indigo-100 uppercase tracking-widest">Maicao • Talento Joven</p></div>
          </div>
          <div className="flex gap-2">
             <button onClick={() => setView('candidate-applications')} title="Mis Postulaciones" className="p-2 rounded-full bg-white/10 relative">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
               {appliedJobIds.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-secondary border-2 border-primary rounded-full"></span>}
             </button>
             <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-white/10">{darkMode ? '☀️' : '🌙'}</button>
             <button onClick={logout} title="Cerrar Sesión" className="p-2 rounded-full bg-white/10">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
             </button>
          </div>
        </div>
        <div className="relative z-10 max-w-lg mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Busca empleo en Maicao..." className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-800 focus:ring-4 outline-none shadow-xl transition-all" />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </form>
        </div>
      </header>
      <main className="p-6 max-w-2xl mx-auto">
        {view === 'home' && (
          <div className="py-10 text-center space-y-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">Tu oportunidad en <span className="text-primary italic">Maicao</span> empieza aquí</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Vendedores', 'Ayudantes', 'Meseros', 'Cajeros'].map((cat) => (
                <button key={cat} onClick={() => { setQuery(cat); handleSearch(); }} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary transition-all">
                  <span className="font-bold text-slate-700 dark:text-slate-200">{cat}</span>
                </button>
              ))}
            </div>
            
            {appliedJobIds.length > 0 && (
              <button 
                onClick={() => setView('candidate-applications')}
                className="inline-flex items-center gap-2 text-primary font-bold bg-primary/5 px-6 py-3 rounded-2xl"
              >
                Ver mis {appliedJobIds.length} postulaciones
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
            )}
          </div>
        )}
        {view === 'search' && (
          <div className="space-y-4">
            {isLoading ? (
               <div className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest animate-pulse">Buscando vacantes...</div>
            ) : jobs.length === 0 ? (
               <div className="text-center py-10 text-slate-400 italic">No encontramos resultados. Prueba con otra palabra.</div>
            ) : (
              jobs.map(job => <JobCard key={job.id} job={job} onClick={(j) => { setSelectedJob(j); setView('details'); }} />)
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
