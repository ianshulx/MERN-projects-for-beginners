import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("bg-theme") || "dim",
  setTheme: (theme) => {
    localStorage.setItem("bg-theme", theme);
    set({ theme });
  },
}));
export default useThemeStore;
