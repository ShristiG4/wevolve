import { create } from "zustand"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: Date
  read: boolean
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  sendAppointmentReminder: (appointmentId: string, doctorName: string, date: string, time: string) => void
  sendEmailNotification: (email: string, subject: string, message: string) => Promise<void>
  sendSMSNotification: (phone: string, message: string) => Promise<void>
}

export const useNotifications = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    }

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }))
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }))
  },

  removeNotification: (id) => {
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id)
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.read ? state.unreadCount - 1 : state.unreadCount,
      }
    })
  },

  sendAppointmentReminder: (appointmentId, doctorName, date, time) => {
    const { addNotification } = get()
    addNotification({
      title: "Appointment Reminder",
      message: `Your appointment with ${doctorName} is scheduled for ${date} at ${time}`,
      type: "info",
    })
  },

  sendEmailNotification: async (email, subject, message) => {
    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(`Email sent to ${email}: ${subject}`)
  },

  sendSMSNotification: async (phone, message) => {
    // Simulate SMS sending
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(`SMS sent to ${phone}: ${message}`)
  },
}))
