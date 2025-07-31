"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Star, MapPin, Clock, ArrowLeft, CheckCircle, Brain, Heart, Stethoscope } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { PaymentForm } from "@/components/payment/payment-form"

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Clinical Psychologist",
    type: "psychologist",
    rating: 4.9,
    reviews: 127,
    experience: "8 years",
    location: "New York, NY",
    price: 150,
    image: "/placeholder.svg?height=200&width=200",
    bio: "Specializes in anxiety, depression, and trauma therapy using CBT and EMDR techniques.",
    availability: ["Mon", "Wed", "Fri"],
    languages: ["English", "Spanish"],
    education: "PhD in Clinical Psychology, Harvard University",
    timeSlots: {
      "2024-01-15": ["09:00", "10:00", "11:00", "14:00", "15:00"],
      "2024-01-17": ["09:00", "10:00", "13:00", "14:00", "16:00"],
      "2024-01-19": ["10:00", "11:00", "14:00", "15:00", "16:00"],
    },
  },
  // Add other doctors here...
]

const specialtyIcons = {
  psychologist: Brain,
  psychiatrist: Stethoscope,
  therapist: Heart,
}

export default function BookAppointmentPage({ params }: { params: { id: string } }) {
  const doctorId = Number.parseInt(params.id)
  const doctor = doctors.find((d) => d.id === doctorId)

  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionType, setSessionType] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
    previousTherapy: "",
    emergencyContact: "",
    insurance: "",
  })
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  if (!doctor) {
    return <div>Doctor not found</div>
  }

  const SpecialtyIcon = specialtyIcons[doctor.type as keyof typeof specialtyIcons]

  const availableTimeSlots = selectedDate ? doctor.timeSlots[format(selectedDate, "yyyy-MM-dd")] || [] : []

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setShowPayment(true)
  }

  const handlePaymentSuccess = (paymentId: string) => {
    setPaymentCompleted(true)
    setIsBooked(true)
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointment Booked!</h2>
              <p className="text-gray-600 mb-6">
                Your appointment with {doctor.name} has been successfully scheduled for{" "}
                {selectedDate && format(selectedDate, "MMMM d, yyyy")} at {selectedTime}.
              </p>
              <div className="space-y-3">
                <Link href="/appointments">
                  <Button className="w-full bg-green-600 hover:bg-green-700">View My Appointments</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full bg-transparent">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
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
            <Link href="/doctors" className="flex items-center text-gray-600 hover:text-green-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Doctors
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-600 rounded-full p-2">
                    <SpecialtyIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold">{doctor.name}</CardTitle>
                <CardDescription className="text-green-600 font-semibold">{doctor.specialty}</CardDescription>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{doctor.rating}</span>
                  </div>
                  <span className="text-gray-500">({doctor.reviews} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">{doctor.bio}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {doctor.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {doctor.experience} experience
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="text-2xl font-bold text-green-600">
                    ${doctor.price}
                    <span className="text-sm text-gray-500 font-normal">/session</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Book Your Appointment</CardTitle>
                <CardDescription>
                  Step {step} of 3:{" "}
                  {step === 1 ? "Select Date & Time" : step === 2 ? "Session Details" : "Personal Information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                        className="rounded-md border"
                      />
                    </div>

                    {selectedDate && (
                      <div>
                        <Label className="text-base font-semibold mb-4 block">Available Time Slots</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {availableTimeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              onClick={() => setSelectedTime(time)}
                              className={selectedTime === time ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => setStep(2)}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Continue
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label htmlFor="sessionType" className="text-base font-semibold">
                        Session Type
                      </Label>
                      <Select value={sessionType} onValueChange={setSessionType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="initial">Initial Consultation</SelectItem>
                          <SelectItem value="followup">Follow-up Session</SelectItem>
                          <SelectItem value="emergency">Emergency Session</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="reason" className="text-base font-semibold">
                        Reason for Visit
                      </Label>
                      <Textarea
                        id="reason"
                        placeholder="Please describe what you'd like to discuss in this session..."
                        value={formData.reason}
                        onChange={(e) => handleInputChange("reason", e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="previousTherapy" className="text-base font-semibold">
                        Previous Therapy Experience
                      </Label>
                      <Select
                        value={formData.previousTherapy}
                        onValueChange={(value) => handleInputChange("previousTherapy", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No previous therapy</SelectItem>
                          <SelectItem value="some">Some previous therapy</SelectItem>
                          <SelectItem value="extensive">Extensive therapy experience</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        disabled={!sessionType || !formData.reason}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-base font-semibold">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-base font-semibold">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-base font-semibold">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-base font-semibold">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="emergencyContact" className="text-base font-semibold">
                        Emergency Contact
                      </Label>
                      <Input
                        id="emergencyContact"
                        placeholder="Name and phone number"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="insurance" className="text-base font-semibold">
                        Insurance Provider (Optional)
                      </Label>
                      <Input
                        id="insurance"
                        placeholder="Insurance company name"
                        value={formData.insurance}
                        onChange={(e) => handleInputChange("insurance", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Appointment Summary</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <strong>Doctor:</strong> {doctor.name}
                        </p>
                        <p>
                          <strong>Date:</strong> {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                        </p>
                        <p>
                          <strong>Time:</strong> {selectedTime}
                        </p>
                        <p>
                          <strong>Session Type:</strong> {sessionType}
                        </p>
                        <p>
                          <strong>Cost:</strong> ${doctor.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={
                          !formData.firstName ||
                          !formData.lastName ||
                          !formData.email ||
                          !formData.phone ||
                          isSubmitting
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {isSubmitting ? "Booking..." : "Book Appointment"}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {showPayment && !paymentCompleted && (
                  <PaymentForm
                    amount={doctor.price}
                    description={`Appointment with ${doctor.name}`}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setShowPayment(false)}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
