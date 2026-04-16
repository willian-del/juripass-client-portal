export const BRAND = {
  name: 'Juripass',
  tagline: 'Segurança jurídica na palma da sua mão',
  colors: {
    primary: '#4A9FD8',
    primaryDark: '#2C3E7D',
    primaryLight: '#5BA5DE'
  },
  whatsapp: '5511XXXXXXXXX',
  assets: {
    logoFull: '/images/branding/juripass-logo-full.svg',
    logoIcon: '/images/branding/juripass-icon.svg',
    logoHorizontal: '/images/branding/juripass-logo-horizontal.svg',
    logoHorizontalWhite: '/images/branding/juripass-logo-horizontal-white.svg'
  },
  meta: {
    title: 'Juripass | Plataforma de Gestão de Suporte Jurídico para RH',
    description: 'Plataforma de suporte jurídico para gestão de pessoas. Solução preventiva e estruturada como política corporativa, em conformidade com a Nova NR-01.'
  }
} as const;

export const PUBLIC_SITE_URL = 'https://www.juripass.com.br';

/**
 * Returns the base URL to use for public share links (e.g. /m/:token).
 * Always returns the production domain when running on a Lovable preview/staging host,
 * so links generated in the admin work for external recipients.
 */
export const getPublicShareBaseUrl = (): string => {
  if (typeof window === 'undefined') return PUBLIC_SITE_URL;
  const host = window.location.hostname;
  const isProductionHost = host === 'juripass.com.br' || host === 'www.juripass.com.br';
  return isProductionHost ? window.location.origin : PUBLIC_SITE_URL;
};
