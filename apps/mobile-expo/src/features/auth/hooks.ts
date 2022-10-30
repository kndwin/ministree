import create from 'zustand';

type AuthStoreType = {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
};

export const useAuthStore = create<AuthStoreType>()((set) => ({
  isLoggedIn: false,
  handleLogin: () => set(() => ({ isLoggedIn: true })),
  handleLogout: () => set(() => ({ isLoggedIn: false })),
}));
