
export interface Applicant {
  id: string;
  name: string;
  role: string;
  experience: string;
  skills: string[];
  bio: string;
  phone: string;
  email: string;
  status?: 'apt' | 'not-apt' | 'pending';
  startDate?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  salary: string;
  type: 'Tiempo Completo' | 'Medio Tiempo' | 'Remoto' | 'Contrato';
  location: string;
  schedule: string;
  noDegreeRequired: boolean;
  educationLevel: 'Bachiller' | 'Técnico/Tecnólogo' | 'Universitario' | 'Cualquiera';
  description: string;
  requirements: string[];
  skills: string[];
  personalQualities: string[];
  experienceYears: number;
  contactEmail: string;
  contactPhone: string;
  tags: string[];
  postedAt: string;
  applicants?: Applicant[];
}

export type Role = 'candidate' | 'employer' | null;
export type View = 'auth' | 'onboarding' | 'home' | 'search' | 'details' | 'employer-dashboard' | 'post-job' | 'applicants-list' | 'applicant-detail' | 'candidate-applications';
