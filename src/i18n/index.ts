import { defaultLang, type Lang, type LocalizedText, type NavKey } from '@/types';

export const ui = {
  es: {
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Aptitudes',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.home': 'Inicio',
    'nav.cv': 'CV',
    'nav.mobile': 'Menú',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'theme.toggle': 'Cambiar tema',
    'lang.switch': 'Cambiar idioma',
    'hero.tagline': 'Team Coach · Desarrollador Full Stack · Scrum/SAFe',
    'hero.cta.contact': 'Contactar',
    'hero.cta.cv': 'Ver CV',

    'experience.title': 'Experiencia',
    'experience.current': 'Actualidad',
    'experience.mode': 'Modalidad',
    'experience.client': 'Cliente',
    'experience.stack': 'Stack',
    'education.title': 'Educación',
    'skills.title': 'Aptitudes',
    'projects.title': 'Proyectos destacados',
    'projects.award': '3.º premio concurso artículos técnicos InterSystems',
    'projects.link': 'Ver artículo',
    'contact.title': 'Contacto',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.cv': 'Curriculum Vitae',
    'contact.cvOnline': 'Ver online',
    'contact.cvDownload': 'Descargar',
    'contact.print': 'Imprimir CV',
    'contact.printHint': 'Usa Ctrl/Cmd + P y "Guardar como PDF"',
    'footer.rights': 'Todos los derechos reservados.',
    'cv.title': 'Currículum',
    'cv.summary': 'Resumen',
    'cv.experience': 'Experiencia',
    'cv.education': 'Educación',
    'cv.skills': 'Aptitudes',
    'cv.contact': 'Contacto',
    'cv.print': 'Imprimir / Guardar como PDF',
    'seo.defaultTitle': 'Jaime Lerga Marquina — Team Coach & Full Stack Developer',
    'seo.defaultDescription': 'Portfolio y CV de Jaime Lerga Marquina: Team Coach, desarrollador full-stack y especialista en Scrum/SAFe con experiencia en .NET, React e InterSystems IRIS.',
  },
  en: {
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.home': 'Home',
    'nav.cv': 'CV',
    'nav.mobile': 'Menu',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.toggle': 'Toggle theme',
    'lang.switch': 'Switch language',
    'hero.tagline': 'Team Coach · Full Stack Developer · Scrum/SAFe',
    'hero.cta.contact': 'Get in touch',
    'hero.cta.cv': 'View CV',

    'experience.title': 'Experience',
    'experience.current': 'Present',
    'experience.mode': 'Mode',
    'experience.client': 'Client',
    'experience.stack': 'Stack',
    'education.title': 'Education',
    'skills.title': 'Skills',
    'projects.title': 'Featured projects',
    'projects.award': '3rd prize InterSystems technical article contest',
    'projects.link': 'Read article',
    'contact.title': 'Contact',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.cv': 'Curriculum Vitae',
    'contact.cvOnline': 'View online',
    'contact.cvDownload': 'Download',
    'contact.print': 'Print CV',
    'contact.printHint': 'Use Ctrl/Cmd + P and "Save as PDF"',
    'footer.rights': 'All rights reserved.',
    'cv.title': 'Curriculum Vitae',
    'cv.summary': 'Summary',
    'cv.experience': 'Experience',
    'cv.education': 'Education',
    'cv.skills': 'Skills',
    'cv.contact': 'Contact',
    'cv.print': 'Print / Save as PDF',
    'seo.defaultTitle': 'Jaime Lerga Marquina — Team Coach & Full Stack Developer',
    'seo.defaultDescription': 'Portfolio and CV of Jaime Lerga Marquina: Team Coach, full-stack developer and Scrum/SAFe specialist with experience in .NET, React and InterSystems IRIS.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['es'];

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en' || lang === 'es') return lang;
  return defaultLang;
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string) {
    return `/${lang}${path}`;
  };
}

export function getLocalized(value: LocalizedText | string, lang: Lang): string {
  if (typeof value === 'string') return value;
  return value[lang] ?? value[defaultLang];
}

export function getOppositeLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export const navKeys: NavKey[] = ['about', 'experience', 'skills', 'projects', 'contact'];