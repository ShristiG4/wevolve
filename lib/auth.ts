import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: "patient" | "doctor" | "admin"
  avatar?: string
  createdAt: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (
    userData: Omit<User, "id" | "createdAt"> & { password: string },
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock authentication - in real app, this would be an API call
        if (email === "demo@wevolve.com" && password === "demo123") {
          const user: User = {
            id: "1",
            email: "demo@wevolve.com",
            firstName: "Sarah",
            lastName: "Johnson",
            phone: "+1 (555) 123-4567",
            role: "patient",
            avatar: "/placeholder.svg?height=100&width=100",
            createdAt: new Date().toISOString(),
          }

          set({ user, isAuthenticated: true })
          return { success: true }
        }

        return { success: false, error: "Invalid credentials" }
      },

      register: async (userData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          role: userData.role,
          createdAt: new Date().toISOString(),
        }

        set({ user, isAuthenticated: true })
        return { success: true }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
