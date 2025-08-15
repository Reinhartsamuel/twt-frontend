export const BASE_URL:string = window.location.hostname === 'localhost' ?
  process.env.VITE_BACKEND_BASE_URL_LOCAL! :
  process.env.VITE_BACKEND_BASE_URL!;
