import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
  theme: "light" | "dark"
  toggleTheme: () => void
  setTheme: (theme: "light" | "dark") => void
}

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",

      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === "light" ? "dark" : "light"
        set({ theme: newTheme })

        // Update document class
        if (typeof window !== "undefined") {
          document.documentElement.classList.toggle("dark", newTheme === "dark")
        }
      },

      setTheme: (theme) => {
        set({ theme })
        if (typeof window !== "undefined") {
          document.documentElement.classList.toggle("dark", theme === "dark")
        }
      },
    }),
    {
      name: "theme-storage",
    },
  ),
)
