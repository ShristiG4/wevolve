import { create } from "zustand"

interface ChatMessage {
  id: string
  message: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatbotState {
  isOpen: boolean
  messages: ChatMessage[]
  isTyping: boolean
  toggleChat: () => void
  sendMessage: (message: string) => Promise<void>
  clearChat: () => void
}

const botResponses = {
  greeting: [
    "Hello! I'm here to help you with your mental health journey. How can I assist you today?",
    "Hi there! I'm your WEvolve assistant. What would you like to know about our services?",
    "Welcome to WEvolve! I'm here to support you. How can I help?",
  ],
  appointment: [
    "I can help you book an appointment! You can browse our available doctors and schedule a session that works for you. Would you like me to guide you through the process?",
    "To book an appointment, simply visit our 'Find Doctors' page where you can filter by specialty and availability. Need help finding the right therapist for you?",
  ],
  emergency: [
    "If you're experiencing a mental health emergency, please call our 24/7 helpline at +1 (555) 000-0000 or contact emergency services at 911. Your safety is our priority.",
    "This sounds urgent. Please reach out to our crisis helpline immediately at +1 (555) 000-0000. We have trained professionals available 24/7.",
  ],
  services: [
    "We offer therapy sessions with licensed therapists, consultations with psychologists, and psychiatric services. We also provide wellness tracking and mental health resources.",
    "Our services include individual therapy, group sessions, psychiatric consultations, and wellness monitoring. All sessions can be conducted online or in-person.",
  ],
  default: [
    "I understand you're looking for help. Could you tell me more about what you need assistance with?",
    "I'm here to help! Could you be more specific about what you'd like to know?",
    "Let me help you with that. Can you provide more details about your question?",
  ],
}

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)]
  }

  if (message.includes("appointment") || message.includes("book") || message.includes("schedule")) {
    return botResponses.appointment[Math.floor(Math.random() * botResponses.appointment.length)]
  }

  if (
    message.includes("emergency") ||
    message.includes("crisis") ||
    message.includes("urgent") ||
    message.includes("help me")
  ) {
    return botResponses.emergency[Math.floor(Math.random() * botResponses.emergency.length)]
  }

  if (message.includes("service") || message.includes("therapy") || message.includes("counseling")) {
    return botResponses.services[Math.floor(Math.random() * botResponses.services.length)]
  }

  return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
}

export const useChatbot = create<ChatbotState>((set, get) => ({
  isOpen: false,
  messages: [
    {
      id: "1",
      message: "Hello! I'm your WEvolve assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ],
  isTyping: false,

  toggleChat: () => {
    set((state) => ({ isOpen: !state.isOpen }))
  },

  sendMessage: async (message: string) => {
    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      sender: "user",
      timestamp: new Date(),
    }

    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
    }))

    // Simulate bot thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const botMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      message: getBotResponse(message),
      sender: "bot",
      timestamp: new Date(),
    }

    set((state) => ({
      messages: [...state.messages, botMessage],
      isTyping: false,
    }))
  },

  clearChat: () => {
    set({
      messages: [
        {
          id: "1",
          message: "Hello! I'm your WEvolve assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
    })
  },
}))
