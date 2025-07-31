"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Video,
  Phone,
  MessageCircle,
  Bell,
  Settings,
  Heart,
  Brain,
  TrendingUp,
  Clock,
  Star,
  Plus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { Settings as SettingsComponent } from "@/components/dashboard/settings"

const upcomingAppointments = [
  {
    id: 1,
    therapist: "Dr. Sarah Johnson",
    date: "Today",
    time: "2:00 PM",
    type: "video",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    therapist: "Dr. Michael Chen",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "phone",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    therapist: "Lisa Rodriguez, LCSW",
    date: "Friday",
    time: "3:30 PM",
    type: "video",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const recentSessions = [
  {
    id: 1,
    therapist: "Dr. Sarah Johnson",
    date: "Dec 18, 2024",
    duration: "50 minutes",
    rating: 5,
    notes: "Great progress on anxiety management techniques",
  },
  {
    id: 2,
    therapist: "Dr. Michael Chen",
    date: "Dec 15, 2024",
    duration: "45 minutes",
    rating: 5,
    notes: "Medication adjustment discussion",
  },
  {
    id: 3,
    therapist: "Lisa Rodriguez, LCSW",
    date: "Dec 12, 2024",
    duration: "50 minutes",
    rating: 4,
    notes: "Family dynamics exploration",
  },
]

const notifications = [
  {
    id: 1,
    type: "appointment",
    title: "Upcoming Session Reminder",
    message: "Your session with Dr. Sarah Johnson is in 2 hours",
    time: "2 hours ago",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "message",
    title: "New Message from Dr. Chen",
    message: "I've sent you some resources to review before our next session",
    time: "1 day ago",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "system",
    title: "Wellness Check-in Available",
    message: "Complete your weekly wellness assessment",
    time: "2 days ago",
    read: true,
    priority: "low",
  },
  {
    id: 4,
    type: "appointment",
    title: "Session Completed",
    message: "Your session with Lisa Rodriguez has been completed. Rate your experience.",
    time: "3 days ago",
    read: true,
    priority: "medium",
  },
]

const wellnessMetrics = {
  mood: { current: 7, previous: 6, trend: "up" },
  anxiety: { current: 4, previous: 6, trend: "down" },
  sleep: { current: 8, previous: 7, trend: "up" },
  energy: { current: 6, previous: 5, trend: "up" },
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [notificationFilter, setNotificationFilter] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    if (notificationFilter === "unread") return !notification.read
    if (notificationFilter === "high") return notification.priority === "high"
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/wevolve-logo.png" alt="WEvolve Logo" width={40} height={40} className="w-10 h-10" />
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">WEVOLVE</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-green-600">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back, John!</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Here's your mental health journey overview</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="notifications" className="relative">
              Notifications
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next Session</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">Today 2PM</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Sessions This Month</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">8</p>
                    </div>
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">7.2/10</p>
                    </div>
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">+15%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Appointments */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Upcoming Appointments</span>
                    <Link href="/appointments">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {appointment.therapist
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{appointment.therapist}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {appointment.type === "video" && <Video className="h-5 w-5 text-green-600" />}
                        {appointment.type === "phone" && <Phone className="h-5 w-5 text-blue-600" />}
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Wellness Metrics */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Wellness Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(wellnessMetrics).map(([metric, data]) => (
                    <div key={metric} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="capitalize font-medium text-gray-800 dark:text-white">{metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 dark:text-gray-300">{data.current}/10</span>
                          {data.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                          )}
                        </div>
                      </div>
                      <Progress value={data.current * 10} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Sessions */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-gray-800 dark:text-white">{session.therapist}</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < session.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                          {session.date} • {session.duration}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{session.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-600 hover:bg-green-700">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Book Session</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-sm">Message Therapist</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <Heart className="h-6 w-6" />
                    <span className="text-sm">Wellness Check</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">Add Journal</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Appointments</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Book New Session
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Sessions</h3>
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {appointment.therapist
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{appointment.therapist}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {appointment.date} at {appointment.time}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              {appointment.type === "video" && (
                                <>
                                  <Video className="h-4 w-4 text-green-600" />
                                  <span className="text-xs text-gray-500">Video Call</span>
                                </>
                              )}
                              {appointment.type === "phone" && (
                                <>
                                  <Phone className="h-4 w-4 text-blue-600" />
                                  <span className="text-xs text-gray-500">Phone Call</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Join Session
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-8">Past Sessions</h3>
                {recentSessions.map((session) => (
                  <Card key={session.id} className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{session.therapist}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {session.date} • {session.duration}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{session.notes}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < session.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <Button variant="outline" size="sm">
                            View Notes
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Session Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Total Sessions</span>
                      <span className="font-semibold text-gray-800 dark:text-white">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">This Month</span>
                      <span className="font-semibold text-gray-800 dark:text-white">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Average Rating</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-gray-800 dark:text-white">4.8</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Consistency</span>
                      <span className="font-semibold text-green-600">95%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Session
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Therapist
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Clock className="h-4 w-4 mr-2" />
                      View Availability
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notifications</h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant={notificationFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNotificationFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={notificationFilter === "unread" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNotificationFilter("unread")}
                >
                  Unread ({unreadCount})
                </Button>
                <Button
                  variant={notificationFilter === "high" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNotificationFilter("high")}
                >
                  High Priority
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`dark:bg-gray-800 dark:border-gray-700 ${
                    !notification.read ? "border-l-4 border-l-green-500" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-full ${
                            notification.type === "appointment"
                              ? "bg-green-100 dark:bg-green-900"
                              : notification.type === "message"
                                ? "bg-blue-100 dark:bg-blue-900"
                                : "bg-gray-100 dark:bg-gray-700"
                          }`}
                        >
                          {notification.type === "appointment" && <Calendar className="h-5 w-5 text-green-600" />}
                          {notification.type === "message" && <MessageCircle className="h-5 w-5 text-blue-600" />}
                          {notification.type === "system" && <Bell className="h-5 w-5 text-gray-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-800 dark:text-white">{notification.title}</h3>
                            {!notification.read && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                            {notification.priority === "high" && (
                              <Badge variant="destructive" className="text-xs">
                                High
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Button variant="outline" size="sm">
                            Mark as Read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredNotifications.length === 0 && (
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">No notifications found</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {notificationFilter === "unread"
                      ? "You're all caught up! No unread notifications."
                      : notificationFilter === "high"
                        ? "No high priority notifications at this time."
                        : "You don't have any notifications yet."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
