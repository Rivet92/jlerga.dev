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