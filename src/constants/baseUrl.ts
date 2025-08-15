export const BASE_URL:string = window.location.hostname === 'localhost' ?
  meta.import.env.VITE_BACKEND_BASE_URL_LOCAL! :
  meta.import.env.VITE_BACKEND_BASE_URL!;
