export type Lang = 'es' | 'en';
export const defaultLang: Lang = 'es';
export const languages: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
};

export interface LocalizedText {
  es: string;
  en: string;
}

export type NavKey = 'about' | 'experience' | 'skills' | 'projects' | 'contact' | 'cv';

export interface ExperienceData {
  company: string;
  role: LocalizedText;
  client: LocalizedText;
  start: string;
  end: string | null;
  location: string;
  mode: LocalizedText;
  summary: LocalizedText;
  stack: string[];
  order: number;
}

export interface EducationData {
  degree: LocalizedText;
  school: string;
  start: string;
  end: string;
  description: LocalizedText;
  order: number;
}