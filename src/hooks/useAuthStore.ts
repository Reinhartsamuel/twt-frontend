import { create } from 'zustand';

interface User {
  id: string;
  firebaseUid: string;
  username: string;
  profileImage: string | null;
  name: string | null;
  authToken: string | null;

}

interface Wallet {
  publicKey: string;
}
interface LoginPayload {
  user: User;
  wallet: Wallet;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  wallet: Wallet | null;
  login: (payload:LoginPayload) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  wallet: null,
  login: (payload:LoginPayload) => set({
    isAuthenticated: true,
    user: payload.user,
    wallet: payload.wallet
  }),
  logout: () => set({
    isAuthenticated: false,
    user: null,
    wallet: null
  })
}));
