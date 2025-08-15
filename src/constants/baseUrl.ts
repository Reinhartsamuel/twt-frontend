console.log(`hostname: ${window.location.hostname}`)
export const BASE_URL:string = window.location.hostname === 'localhost' ?
import.meta.env.VITE_BACKEND_BASE_URL_LOCAL! :
import.meta.env.VITE_BACKEND_BASE_URL!;
