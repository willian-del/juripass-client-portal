export const BRAND = {
  name: 'Juripass',
  calendarUrl: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2GyYmhF9M7wyTa-iyORM70ntb_ojyDZ3M9rcr_kGrCnZZV-WZ7FOsl4KH2rTJ4Y4Bn28SgRmV2?gv=true',
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
    title: 'Juripass — Acolhimento Jurídico Corporativo',
    description: 'Canal externo e confidencial de orientação jurídica para colaboradores. Benefício corporativo que fortalece a gestão de pessoas.'
  }
} as const;

export function openScheduling() {
  window.open(BRAND.calendarUrl, '_blank', 'noopener,noreferrer');
}
