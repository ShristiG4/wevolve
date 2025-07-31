"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, Video, Phone, MapPin, Star, MessageCircle, MoreHorizontal } from "lucide-react"
import Link from "next/link"

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Clinical Psychologist",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "50 minutes",
    type: "Follow-up Session",
    status: "confirmed",
    sessionType: "video",
    notes: "Continue CBT techniques for anxiety management",
    rating: null,
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Psychiatrist",
    date: "2024-01-18",
    time: "2:00 PM",
    duration: "30 minutes",
    type: "Medication Review",
    status: "pending",
    sessionType: "video",
    notes: "Review current medication effectiveness",
    rating: null,
  },
  {
    id: 3,
    doctor: "Dr. Emily Rodriguez",
    specialty: "Licensed Therapist",
    date: "2024-01-10",
    time: "3:00 PM",
    duration: "50 minutes",
    type: "Initial Consultation",
    status: "completed",
    sessionType: "video",
    notes: "Discussed relationship concerns and coping strategies",
    rating: 5,
  },
  {
    id: 4,
    doctor: "Dr. James Wilson",
    specialty: "Clinical Psychologist",
    date: "2024-01-08",
    time: "11:00 AM",
    duration: "50 minutes",
    type: "Therapy Session",
    status: "completed",
    sessionType: "phone",
    notes: "Worked on exposure therapy techniques for social anxiety",
    rating: 4,
  },
]

export default function AppointmentsPage() {
  const [selectedTab, setSelectedTab] = useState("upcoming")

  const upcomingAppointments = appointments.filter((apt) => apt.status === "confirmed" || apt.status === "pending")
  const pastAppointments = appointments.filter((apt) => apt.status === "completed")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "in-person":
        return <MapPin className="h-4 w-4" />
      default:
        return <Video className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-green-600">
              WEVOLVE
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/doctors" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                  Find Doctors
                </Link>
                <Link href="/appointments" className="text-green-600 px-3 py-2 text-sm font-medium">
                  Appointments
                </Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-4">My Appointments</h1>
            <p className="text-xl">Manage your mental health appointments and sessions</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Sessions</h2>
            <p className="text-gray-600">Keep track of your mental health journey</p>
          </div>
          <Link href="/doctors">
            <Button className="bg-green-600 hover:bg-green-700">Book New Appointment</Button>
          </Link>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingAppointments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No upcoming appointments</h3>
                  <p className="text-gray-600 mb-6">Schedule your next session with a mental health professional</p>
                  <Link href="/doctors">
                    <Button className="bg-green-600 hover:bg-green-700">Find a Doctor</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 text-lg">{appointment.doctor}</h3>
                              <p className="text-gray-600">{appointment.specialty}</p>
                              <p className="text-sm text-gray-500">{appointment.type}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="font-semibold text-gray-800">{appointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">{appointment.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getSessionIcon(appointment.sessionType)}
                              <span className="text-sm text-gray-500 capitalize">{appointment.sessionType}</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button variant="outline" size="sm">
                                Cancel
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <strong>Notes:</strong> {appointment.notes}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastAppointments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No past appointments</h3>
                  <p className="text-gray-600">Your completed sessions will appear here</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pastAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 text-lg">{appointment.doctor}</h3>
                              <p className="text-gray-600">{appointment.specialty}</p>
                              <p className="text-sm text-gray-500">{appointment.type}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="font-semibold text-gray-800">{appointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">{appointment.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getSessionIcon(appointment.sessionType)}
                              <span className="text-sm text-gray-500 capitalize">{appointment.sessionType}</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                            {appointment.rating && (
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < appointment.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button variant="outline" size="sm">
                                Book Again
                              </Button>
                            </div>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <strong>Session Notes:</strong> {appointment.notes}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
