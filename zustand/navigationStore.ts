import { create } from "zustand";

interface NavigationStore {
  page: string;
  setPage: (page: string) => void;
}

const useNavigationStore = create<NavigationStore>((set) => ({
  page: "",
  setPage: (page) => set({ page: page }),
}));

export default useNavigationStore;
