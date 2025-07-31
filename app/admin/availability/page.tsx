"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Plus, X, Save } from "lucide-react"
import Link from "next/link"
import { format, addDays, startOfWeek } from "date-fns"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

interface DaySchedule {
  date: string
  isWorkingDay: boolean
  timeSlots: TimeSlot[]
}

const defaultTimeSlots: TimeSlot[] = [
  { id: "1", startTime: "09:00", endTime: "10:00", isAvailable: true },
  { id: "2", startTime: "10:00", endTime: "11:00", isAvailable: true },
  { id: "3", startTime: "11:00", endTime: "12:00", isAvailable: true },
  { id: "4", startTime: "14:00", endTime: "15:00", isAvailable: true },
  { id: "5", startTime: "15:00", endTime: "16:00", isAvailable: true },
  { id: "6", startTime: "16:00", endTime: "17:00", isAvailable: true },
]

export default function DoctorAvailabilityPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>(() => {
    const startDate = startOfWeek(new Date())
    return Array.from({ length: 7 }, (_, i) => ({
      date: format(addDays(startDate, i), "yyyy-MM-dd"),
      isWorkingDay: i >= 1 && i <= 5, // Monday to Friday
      timeSlots: [...defaultTimeSlots],
    }))
  })
  const [newSlot, setNewSlot] = useState({ startTime: "", endTime: "" })
  const [selectedTab, setSelectedTab] = useState("weekly")

  const updateDaySchedule = (date: string, updates: Partial<DaySchedule>) => {
    setWeekSchedule((prev) => prev.map((day) => (day.date === date ? { ...day, ...updates } : day)))
  }

  const toggleTimeSlot = (date: string, slotId: string) => {
    setWeekSchedule((prev) =>
      prev.map((day) =>
        day.date === date
          ? {
              ...day,
              timeSlots: day.timeSlots.map((slot) =>
                slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot,
              ),
            }
          : day,
      ),
    )
  }

  const addTimeSlot = (date: string) => {
    if (!newSlot.startTime || !newSlot.endTime) return

    const newSlotObj: TimeSlot = {
      id: Math.random().toString(36).substr(2, 9),
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      isAvailable: true,
    }

    setWeekSchedule((prev) =>
      prev.map((day) =>
        day.date === date
          ? { ...day, timeSlots: [...day.timeSlots, newSlotObj].sort((a, b) => a.startTime.localeCompare(b.startTime)) }
          : day,
      ),
    )

    setNewSlot({ startTime: "", endTime: "" })
  }

  const removeTimeSlot = (date: string, slotId: string) => {
    setWeekSchedule((prev) =>
      prev.map((day) =>
        day.date === date ? { ...day, timeSlots: day.timeSlots.filter((slot) => slot.id !== slotId) } : day,
      ),
    )
  }

  const saveSchedule = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Schedule saved successfully!")
  }

  const getDayName = (dateString: string) => {
    return format(new Date(dateString), "EEEE")
  }

  const getFormattedDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-green-600">
              WEVOLVE
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Doctor Portal</Badge>
              <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-green-600">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-4">Manage Your Availability</h1>
            <p className="text-xl">Set your working hours and manage appointment slots</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <Button onClick={saveSchedule} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Schedule
            </Button>
          </div>

          <TabsContent value="weekly" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
              {weekSchedule.map((day, index) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className={`h-full ${!day.isWorkingDay ? "opacity-60" : ""}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{getDayName(day.date)}</CardTitle>
                          <CardDescription>{getFormattedDate(day.date)}</CardDescription>
                        </div>
                        <Switch
                          checked={day.isWorkingDay}
                          onCheckedChange={(checked) => updateDaySchedule(day.date, { isWorkingDay: checked })}
                        />
                      </div>
                    </CardHeader>

                    {day.isWorkingDay && (
                      <CardContent className="space-y-3">
                        {/* Time Slots */}
                        <div className="space-y-2">
                          {day.timeSlots.map((slot) => (
                            <div
                              key={slot.id}
                              className={`flex items-center justify-between p-2 rounded border ${
                                slot.isAvailable
                                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                  : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={slot.isAvailable}
                                  onCheckedChange={() => toggleTimeSlot(day.date, slot.id)}
                                  size="sm"
                                />
                                <span className="text-sm font-medium">
                                  {slot.startTime} - {slot.endTime}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTimeSlot(day.date, slot.id)}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* Add New Slot */}
                        <div className="pt-3 border-t space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="time"
                              placeholder="Start"
                              value={newSlot.startTime}
                              onChange={(e) => setNewSlot((prev) => ({ ...prev, startTime: e.target.value }))}
                              className="text-xs"
                            />
                            <Input
                              type="time"
                              placeholder="End"
                              value={newSlot.endTime}
                              onChange={(e) => setNewSlot((prev) => ({ ...prev, endTime: e.target.value }))}
                              className="text-xs"
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addTimeSlot(day.date)}
                            className="w-full text-xs"
                            disabled={!newSlot.startTime || !newSlot.endTime}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Slot
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Select Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Selected Day Schedule */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        {format(selectedDate, "EEEE, MMMM d, yyyy")}
                      </div>
                      <Switch
                        checked={
                          weekSchedule.find((d) => d.date === format(selectedDate, "yyyy-MM-dd"))?.isWorkingDay || false
                        }
                        onCheckedChange={(checked) =>
                          updateDaySchedule(format(selectedDate, "yyyy-MM-dd"), { isWorkingDay: checked })
                        }
                      />
                    </CardTitle>
                    <CardDescription>Manage your availability for this day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const daySchedule = weekSchedule.find((d) => d.date === format(selectedDate, "yyyy-MM-dd"))
                      if (!daySchedule?.isWorkingDay) {
                        return (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>Not a working day</p>
                          </div>
                        )
                      }

                      return (
                        <div className="space-y-4">
                          {/* Time Slots Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {daySchedule.timeSlots.map((slot) => (
                              <div
                                key={slot.id}
                                className={`flex items-center justify-between p-3 rounded-lg border ${
                                  slot.isAvailable
                                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <Switch
                                    checked={slot.isAvailable}
                                    onCheckedChange={() => toggleTimeSlot(daySchedule.date, slot.id)}
                                  />
                                  <span className="font-medium">
                                    {slot.startTime} - {slot.endTime}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTimeSlot(daySchedule.date, slot.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          {/* Add New Slot */}
                          <div className="border-t pt-4">
                            <h4 className="font-semibold mb-3">Add New Time Slot</h4>
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <Label htmlFor="startTime" className="text-sm">
                                  Start Time
                                </Label>
                                <Input
                                  id="startTime"
                                  type="time"
                                  value={newSlot.startTime}
                                  onChange={(e) => setNewSlot((prev) => ({ ...prev, startTime: e.target.value }))}
                                />
                              </div>
                              <div className="flex-1">
                                <Label htmlFor="endTime" className="text-sm">
                                  End Time
                                </Label>
                                <Input
                                  id="endTime"
                                  type="time"
                                  value={newSlot.endTime}
                                  onChange={(e) => setNewSlot((prev) => ({ ...prev, endTime: e.target.value }))}
                                />
                              </div>
                              <Button
                                onClick={() => addTimeSlot(daySchedule.date)}
                                disabled={!newSlot.startTime || !newSlot.endTime}
                                className="bg-green-600 hover:bg-green-700 mt-6"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
