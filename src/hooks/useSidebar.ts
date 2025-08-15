import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
  setMobile: (mobile: boolean) => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  isMobile: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
  openSidebar: () => set({ isOpen: true }),
  setMobile: (mobile: boolean) => set({ isMobile: mobile }),
}));