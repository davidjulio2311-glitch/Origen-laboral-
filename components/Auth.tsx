
import React, { useState, useEffect } from 'react';

interface AuthProps {
  onLogin: (email: string) => void;
}

interface UserRecord {
  email: string;
  password?: string;
  name?: string;
  phone?: string;
  age?: string;
  authMethod?: 'email' | 'google' | 'phone';
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [method, setMethod] = useState<'email' | 'google' | 'phone'>('email');
  const [step, setStep] = useState<'input' | 'verify' | 'google_select' | 'google_password' | 'math_challenge'>('input');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googlePass, setGooglePass] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState<string | null>(null);
  const [isAddingNewGoogleAccount, setIsAddingNewGoogleAccount] = useState(false);
  const [newGoogleEmail, setNewGoogleEmail] = useState('');
  
  // Estados para el reto matemático
  const [mathProblem, setMathProblem] = useState({ n1: 0, n2: 0, op: '+', ans: 0 });
  const [userMathAns, setUserMathAns] = useState('');

  const googleAccounts = [
    { name: 'Usuario Maicao', email: 'maicao.trabajo@gmail.com', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { name: 'Talento Guajira', email: 'guajira.joven@gmail.com', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aria' }
  ];

  useEffect(() => {
    setError(null);
    setStep('input');
    setSelectedGoogleAccount(null);
    setIsAddingNewGoogleAccount(false);
    setNewGoogleEmail('');
    setGooglePass('');
    setUserMathAns('');
  }, [isLogin, method]);

  const generateMathProblem = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let n1 = Math.floor(Math.random() * 10) + 1;
    let n2 = Math.floor(Math.random() * 10) + 1;
    let ans = 0;

    if (op === '+') ans = n1 + n2;
    if (op === '-') {
      if (n1 < n2) [n1, n2] = [n2, n1]; // Evitar negativos para simplicidad
      ans = n1 - n2;
    }
    if (op === '*') ans = n1 * n2;

    setMathProblem({ n1, n2, op, ans });
    setUserMathAns('');
  };

  const handleGoogleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('google_select');
    }, 800);
  };

  const selectGoogleAccount = (email: string) => {
    setSelectedGoogleAccount(email);
    setStep('google_password');
  };

  const handleGooglePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (googlePass.length < 4) {
      setError("La contraseña es demasiado corta.");
      return;
    }
    setError(null);
    generateMathProblem();
    setStep('math_challenge');
  };

  const handleMathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userMathAns) === mathProblem.ans) {
      onLogin(selectedGoogleAccount || 'google-user@maicao.com');
    } else {
      setError("Resultado incorrecto. Intenta con este nuevo problema.");
      generateMathProblem();
    }
  };

  const handleManualGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoogleEmail.includes('@')) {
      setError("Ingresa un correo de Google válido.");
      return;
    }
    selectGoogleAccount(newGoogleEmail);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Ingresa un número de celular válido.");
      return;
    }
    // El flujo de teléfono sigue usando OTP (simulado) para mantener variedad
    const newCode = "1234";
    setGeneratedOtp(newCode);
    setStep('verify');
    alert(`SMS Maicao: Tu código es ${newCode}`);
  };

  const handleVerifyOtp = () => {
    const userOtp = otp.join('');
    if (userOtp === generatedOtp) {
      onLogin(`${phone}@maicao.call`);
    } else {
      setError(`Código incorrecto.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const users = (JSON.parse(localStorage.getItem('origen_laboral_users') || '[]')) as UserRecord[];

    if (isLogin) {
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) { setError("Este correo no está registrado."); return; }
      if (user.password !== password) { setError("Contraseña incorrecta."); return; }
      onLogin(user.email);
    } else {
      if (!name || !email || !phone || !age || !password) { setError("Todos los campos son obligatorios."); return; }
      users.push({ email, password, name, phone, age, authMethod: 'email' });
      localStorage.setItem('origen_laboral_users', JSON.stringify(users));
      onLogin(email);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold animate-pulse">Cargando servicios de Google...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-md my-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-[24px] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4c-1.11 0-2 .89-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Origen Laboral</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Maicao • La Guajira</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          
          {step === 'google_password' ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
               <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-4" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hola, {selectedGoogleAccount?.split('@')[0]}</h2>
                  <p className="text-sm text-slate-500 mt-1">{selectedGoogleAccount}</p>
               </div>
               <form onSubmit={handleGooglePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-1.5 block">Ingresa tu contraseña</label>
                    <input 
                      type="password" 
                      className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-sm font-bold outline-none border border-transparent focus:border-blue-500" 
                      value={googlePass} 
                      onChange={e => setGooglePass(e.target.value)} 
                      required 
                      placeholder="Contraseña de Google"
                      autoFocus
                    />
                  </div>
                  {error && <p className="text-rose-500 text-[10px] font-bold">{error}</p>}
                  <button type="submit" className="w-full bg-[#4285F4] text-white font-black py-4 rounded-2xl shadow-lg uppercase tracking-widest text-xs">
                    Siguiente
                  </button>
                  <button type="button" onClick={() => setStep('google_select')} className="w-full text-slate-400 font-bold text-[10px] uppercase">
                    No soy yo
                  </button>
               </form>
            </div>
          ) : step === 'math_challenge' ? (
            <div className="space-y-8 animate-in zoom-in duration-300">
               <div className="text-center">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Verificación Humana</h2>
                  <p className="text-xs text-slate-500 mt-2 px-4">Resuelve este problema para confirmar que eres de Maicao.</p>
               </div>

               <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[32px] text-center">
                  <div className="text-4xl font-black text-primary mb-4">
                     {mathProblem.n1} {mathProblem.op} {mathProblem.n2} = ?
                  </div>
                  <form onSubmit={handleMathSubmit} className="space-y-4">
                     <input 
                       type="number" 
                       className="w-full bg-white dark:bg-slate-700 rounded-2xl p-4 text-center text-2xl font-black outline-none border-2 border-transparent focus:border-primary" 
                       value={userMathAns} 
                       onChange={e => setUserMathAns(e.target.value)} 
                       required 
                       placeholder="Tu respuesta"
                       autoFocus
                     />
                     {error && <p className="text-rose-500 text-[10px] font-bold animate-shake">{error}</p>}
                     <button type="submit" className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-lg uppercase tracking-widest text-xs">
                        Confirmar y Entrar
                     </button>
                  </form>
               </div>
            </div>
          ) : step === 'google_select' ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center mb-6">
                <svg className="w-10 h-10 mx-auto mb-4" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAddingNewGoogleAccount ? 'Ingresa tu correo' : 'Elige una cuenta'}
                </h2>
                <p className="text-xs text-slate-500">para continuar en Origen Laboral</p>
              </div>

              {isAddingNewGoogleAccount ? (
                <form onSubmit={handleManualGoogleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-1.5 block">Email de Google</label>
                    <input type="email" placeholder="nombre@gmail.com" className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-sm font-bold outline-none border border-transparent focus:border-blue-500" value={newGoogleEmail} onChange={e => setNewGoogleEmail(e.target.value)} required autoFocus />
                  </div>
                  <button type="submit" className="w-full bg-[#4285F4] text-white font-black py-4 rounded-2xl shadow-lg uppercase tracking-widest text-xs">
                    Siguiente
                  </button>
                  <button type="button" onClick={() => setIsAddingNewGoogleAccount(false)} className="w-full text-slate-400 font-bold text-[10px] uppercase">
                    Volver
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  {googleAccounts.map((acc) => (
                    <button key={acc.email} onClick={() => selectGoogleAccount(acc.email)} className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 text-left">
                      <img src={acc.img} className="w-10 h-10 rounded-full bg-slate-100" alt="avatar" />
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{acc.name}</p>
                        <p className="text-xs text-slate-500">{acc.email}</p>
                      </div>
                    </button>
                  ))}
                  <button onClick={() => setIsAddingNewGoogleAccount(true)} className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Usar otra cuenta</p>
                  </button>
                </div>
              )}
            </div>
          ) : step === 'verify' ? (
             <div className="space-y-8 animate-in zoom-in duration-300">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Verificación SMS</h2>
                  <p className="text-xs text-slate-500">Enviado al +57 {phone}</p>
                </div>
                <div className="flex justify-between gap-3 max-w-[240px] mx-auto">
                   {[0,1,2,3].map((i) => (
                     <input 
                       key={i} 
                       id={`otp-${i}`}
                       type="text" 
                       maxLength={1} 
                       className="w-12 h-16 bg-slate-50 dark:bg-slate-800 text-center text-2xl font-black rounded-xl border-2 border-transparent focus:border-primary outline-none"
                       value={otp[i]}
                       onChange={(e) => {
                         const newOtp = [...otp];
                         newOtp[i] = e.target.value;
                         setOtp(newOtp);
                         if(e.target.value && i < 3) document.getElementById(`otp-${i+1}`)?.focus();
                       }}
                     />
                   ))}
                </div>
                <button onClick={handleVerifyOtp} className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-lg uppercase tracking-widest text-xs">Confirmar</button>
             </div>
          ) : (
            <>
              <div className="flex gap-4 mb-8 bg-slate-50 dark:bg-slate-800 p-1 rounded-2xl">
                <button onClick={() => setIsLogin(true)} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${isLogin ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400'}`}>Entrar</button>
                <button onClick={() => setIsLogin(false)} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${!isLogin ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400'}`}>Registrarme</button>
              </div>

              <div className="space-y-3 mb-8">
                <button onClick={handleGoogleClick} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all group shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Continuar con Google</span>
                </button>
                <button onClick={() => setMethod('phone')} className="w-full bg-emerald-500 text-white p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  <span className="text-sm font-bold">Usar número de celular</span>
                </button>
              </div>

              <div className="relative mb-8 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
                <span className="relative bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold tracking-widest text-[9px] uppercase">O con tu correo local</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                   <div className="space-y-4">
                      <input type="text" placeholder="Tu nombre" className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-sm outline-none" value={name} onChange={e => setName(e.target.value)} required />
                      <input type="tel" placeholder="Celular" className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-sm outline-none" value={phone} onChange={e => setPhone(e.target.value)} required />
                   </div>
                )}
                <input type="email" placeholder="Email" className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-sm outline-none" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-sm outline-none" value={password} onChange={e => setPassword(e.target.value)} required />
                {error && <p className="text-rose-500 text-[10px] font-bold">{error}</p>}
                <button type="submit" className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-lg uppercase tracking-widest text-xs">
                  {isLogin ? 'Entrar' : 'Registrarme'}
                </button>
              </form>
            </>
          )}
        </div>
        
        <p className="mt-8 text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">
          Maicao • Colombia
        </p>
      </div>
    </div>
  );
};

export default Auth;
