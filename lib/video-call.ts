import { create } from "zustand"

interface VideoCallState {
  isInCall: boolean
  callId: string | null
  localStream: MediaStream | null
  remoteStream: MediaStream | null
  isMuted: boolean
  isVideoOff: boolean
  startCall: (appointmentId: string) => Promise<void>
  endCall: () => void
  toggleMute: () => void
  toggleVideo: () => void
}

export const useVideoCall = create<VideoCallState>((set, get) => ({
  isInCall: false,
  callId: null,
  localStream: null,
  remoteStream: null,
  isMuted: false,
  isVideoOff: false,

  startCall: async (appointmentId: string) => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      set({
        isInCall: true,
        callId: appointmentId,
        localStream: stream,
        isMuted: false,
        isVideoOff: false,
      })

      // In a real app, you would initialize WebRTC connection here
      console.log("Video call started for appointment:", appointmentId)
    } catch (error) {
      console.error("Failed to start video call:", error)
    }
  },

  endCall: () => {
    const { localStream, remoteStream } = get()

    // Stop all tracks
    localStream?.getTracks().forEach((track) => track.stop())
    remoteStream?.getTracks().forEach((track) => track.stop())

    set({
      isInCall: false,
      callId: null,
      localStream: null,
      remoteStream: null,
      isMuted: false,
      isVideoOff: false,
    })
  },

  toggleMute: () => {
    const { localStream, isMuted } = get()
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = isMuted
      })
      set({ isMuted: !isMuted })
    }
  },

  toggleVideo: () => {
    const { localStream, isVideoOff } = get()
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = isVideoOff
      })
      set({ isVideoOff: !isVideoOff })
    }
  },
}))
