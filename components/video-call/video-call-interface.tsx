"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, MessageCircle } from "lucide-react"
import { useVideoCall } from "@/lib/video-call"

interface VideoCallInterfaceProps {
  appointmentId: string
  doctorName: string
  onEndCall: () => void
}

export function VideoCallInterface({ appointmentId, doctorName, onEndCall }: VideoCallInterfaceProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  const { isInCall, localStream, remoteStream, isMuted, isVideoOff, startCall, endCall, toggleMute, toggleVideo } =
    useVideoCall()

  useEffect(() => {
    if (!isInCall) {
      startCall(appointmentId)
    }
  }, [appointmentId, isInCall, startCall])

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  const handleEndCall = () => {
    endCall()
    onEndCall()
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Session with {doctorName}</h2>
          <p className="text-sm text-gray-300">Video Call</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video (Doctor) */}
        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />

        {/* Local Video (Patient) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden"
        >
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          {isVideoOff && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <VideoOff className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </motion.div>

        {/* Connection Status */}
        <div className="absolute top-4 left-4">
          <Card className="bg-green-600 text-white px-3 py-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm">Connected</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-6">
        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={toggleMute}
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            className="rounded-full w-12 h-12"
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <Button
            onClick={toggleVideo}
            variant={isVideoOff ? "destructive" : "secondary"}
            size="lg"
            className="rounded-full w-12 h-12"
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>

          <Button onClick={handleEndCall} variant="destructive" size="lg" className="rounded-full w-12 h-12">
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            {isMuted && "Microphone is muted"} {isVideoOff && "Camera is off"}
          </p>
        </div>
      </div>
    </div>
  )
}
