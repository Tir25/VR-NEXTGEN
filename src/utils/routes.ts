export const APP_ROUTES = {
  home: '/',
  services: '/services',
  serviceById: (id: string | number) => `/services/${id}`,
  industries: '/industries',
  industryById: (id: string | number) => `/industries/${id}`,
  contact: '/contact',
} as const;


