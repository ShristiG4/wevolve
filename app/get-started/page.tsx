"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Heart, Brain, Calendar, CheckCircle, AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const steps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Mental Health Screening", icon: Brain },
  { id: 3, title: "Therapy Preferences", icon: Heart },
  { id: 4, title: "Scheduling & Payment", icon: Calendar },
  { id: 5, title: "Complete Setup", icon: CheckCircle },
]

const mentalHealthQuestions = [
  {
    id: "mood",
    question: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    crisis: ["More than half the days", "Nearly every day"],
  },
  {
    id: "anxiety",
    question: "How often do you feel nervous, anxious, or on edge?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    crisis: ["More than half the days", "Nearly every day"],
  },
  {
    id: "sleep",
    question: "How would you rate your sleep quality over the past month?",
    options: ["Excellent", "Good", "Fair", "Poor", "Very poor"],
    crisis: ["Poor", "Very poor"],
  },
  {
    id: "selfharm",
    question: "Have you had thoughts of hurting yourself or that you would be better off dead?",
    options: ["Never", "Rarely", "Sometimes", "Often"],
    crisis: ["Sometimes", "Often"],
  },
]

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Mental Health Screening
    mentalHealthAnswers: {},
    previousTherapy: "",
    currentMedications: "",
    primaryConcerns: [],

    // Therapy Preferences
    therapyType: "",
    sessionFormat: "",
    therapistGender: "",
    specializations: [],
    availability: [],

    // Scheduling & Payment
    preferredStartDate: "",
    insurance: "",
    paymentMethod: "",
  })

  const [showCrisisAlert, setShowCrisisAlert] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const progress = (currentStep / steps.length) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleMentalHealthAnswer = (questionId: string, answer: string) => {
    const question = mentalHealthQuestions.find((q) => q.id === questionId)
    const newAnswers = {
      ...formData.mentalHealthAnswers,
      [questionId]: answer,
    }

    setFormData((prev) => ({
      ...prev,
      mentalHealthAnswers: newAnswers,
    }))

    // Check for crisis indicators
    if (question?.crisis.includes(answer)) {
      setShowCrisisAlert(true)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return Object.keys(formData.mentalHealthAnswers).length === mentalHealthQuestions.length
      case 3:
        return formData.therapyType && formData.sessionFormat
      case 4:
        return formData.preferredStartDate && (formData.insurance || formData.paymentMethod)
      default:
        return true
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <div className="p-6 bg-green-100 dark:bg-green-900 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Welcome to WEvolve!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Your assessment is complete. We'll match you with the perfect therapist based on your preferences and needs.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Next Steps:</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Review your matches within 24 hours</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Schedule your first session</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Begin your healing journey</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/doctors">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 bg-transparent"
              >
                Browse Therapists
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
      </nav>

      {/* Crisis Alert */}
      {showCrisisAlert && (
        <Alert className="mx-4 mt-4 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Immediate Support Available:</strong> If you're having thoughts of self-harm, please call our crisis
            line at{" "}
            <a href="tel:988" className="font-semibold underline">
              988
            </a>{" "}
            or contact emergency services at{" "}
            <a href="tel:911" className="font-semibold underline">
              911
            </a>
            . You're not alone.
          </AlertDescription>
        </Alert>
      )}

      {/* Progress Bar */}
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{steps[currentStep - 1].title}</h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "bg-green-600 border-green-600 text-white"
                      : "border-gray-300 text-gray-400 dark:border-gray-600 dark:text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      currentStep > step.id ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card className="max-w-2xl mx-auto dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Let's get to know you</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Please provide your basic information to create your profile
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                      className="flex flex-wrap gap-6 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non-binary" id="non-binary" />
                        <Label htmlFor="non-binary">Non-binary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                        <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Mental Health Screening */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Mental Health Assessment</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      These questions help us understand your current mental health status
                    </p>
                  </div>

                  {mentalHealthQuestions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {index + 1}. {question.question}
                      </h3>
                      <RadioGroup
                        value={formData.mentalHealthAnswers[question.id] || ""}
                        onValueChange={(value) => handleMentalHealthAnswer(question.id, value)}
                        className="space-y-3"
                      >
                        {question.options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                            <Label htmlFor={`${question.id}-${option}`} className="flex-1">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}

                  <div className="space-y-4">
                    <Label htmlFor="previousTherapy">Have you received mental health treatment before?</Label>
                    <RadioGroup
                      value={formData.previousTherapy}
                      onValueChange={(value) => handleInputChange("previousTherapy", value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="therapy-yes" />
                        <Label htmlFor="therapy-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="therapy-no" />
                        <Label htmlFor="therapy-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="currentMedications">Current Medications (if any)</Label>
                    <Textarea
                      id="currentMedications"
                      value={formData.currentMedications}
                      onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                      placeholder="List any medications you're currently taking..."
                      rows={3}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Therapy Preferences */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your Therapy Preferences</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Help us match you with the right therapist and treatment approach
                    </p>
                  </div>

                  <div>
                    <Label>What type of therapy are you most interested in? *</Label>
                    <RadioGroup
                      value={formData.therapyType}
                      onValueChange={(value) => handleInputChange("therapyType", value)}
                      className="space-y-3 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="individual" id="individual" />
                        <Label htmlFor="individual">Individual Therapy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="couples" id="couples" />
                        <Label htmlFor="couples">Couples Therapy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="family" id="family" />
                        <Label htmlFor="family">Family Therapy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="group" id="group" />
                        <Label htmlFor="group">Group Therapy</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Preferred session format *</Label>
                    <RadioGroup
                      value={formData.sessionFormat}
                      onValueChange={(value) => handleInputChange("sessionFormat", value)}
                      className="space-y-3 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="video" id="video" />
                        <Label htmlFor="video">Video Sessions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone">Phone Sessions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="chat" id="chat" />
                        <Label htmlFor="chat">Text/Chat Sessions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-person" id="in-person" />
                        <Label htmlFor="in-person">In-Person Sessions</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Therapist gender preference</Label>
                    <Select
                      value={formData.therapistGender}
                      onValueChange={(value) => handleInputChange("therapistGender", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-preference">No preference</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Areas you'd like to focus on (select all that apply)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {[
                        "Anxiety",
                        "Depression",
                        "Trauma/PTSD",
                        "Relationship Issues",
                        "Stress Management",
                        "Grief & Loss",
                        "Self-Esteem",
                        "Life Transitions",
                        "Addiction",
                        "Eating Disorders",
                        "Sleep Issues",
                        "Work/Career",
                      ].map((concern) => (
                        <div key={concern} className="flex items-center space-x-2">
                          <Checkbox
                            id={concern}
                            checked={formData.primaryConcerns.includes(concern)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleInputChange("primaryConcerns", [...formData.primaryConcerns, concern])
                              } else {
                                handleInputChange(
                                  "primaryConcerns",
                                  formData.primaryConcerns.filter((c) => c !== concern),
                                )
                              }
                            }}
                          />
                          <Label htmlFor={concern}>{concern}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Scheduling & Payment */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Scheduling & Payment</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Set up your session schedule and payment preferences
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="preferredStartDate">When would you like to start? *</Label>
                    <Input
                      id="preferredStartDate"
                      type="date"
                      value={formData.preferredStartDate}
                      onChange={(e) => handleInputChange("preferredStartDate", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <Label>Preferred session times (select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {[
                        "Morning (8AM-12PM)",
                        "Afternoon (12PM-5PM)",
                        "Evening (5PM-8PM)",
                        "Weekdays",
                        "Weekends",
                        "Flexible",
                      ].map((time) => (
                        <div key={time} className="flex items-center space-x-2">
                          <Checkbox
                            id={time}
                            checked={formData.availability.includes(time)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleInputChange("availability", [...formData.availability, time])
                              } else {
                                handleInputChange(
                                  "availability",
                                  formData.availability.filter((t) => t !== time),
                                )
                              }
                            }}
                          />
                          <Label htmlFor={time}>{time}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Insurance Provider</Label>
                    <Select value={formData.insurance} onValueChange={(value) => handleInputChange("insurance", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your insurance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                        <SelectItem value="aetna">Aetna</SelectItem>
                        <SelectItem value="cigna">Cigna</SelectItem>
                        <SelectItem value="united">UnitedHealthcare</SelectItem>
                        <SelectItem value="kaiser">Kaiser Permanente</SelectItem>
                        <SelectItem value="humana">Humana</SelectItem>
                        <SelectItem value="medicaid">Medicaid</SelectItem>
                        <SelectItem value="medicare">Medicare</SelectItem>
                        <SelectItem value="self-pay">Self-Pay</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.insurance === "self-pay" && (
                    <div>
                      <Label>Payment Method</Label>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleInputChange("paymentMethod", value)}
                        className="space-y-3 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card">Credit/Debit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hsa-fsa" id="hsa-fsa" />
                          <Label htmlFor="hsa-fsa">HSA/FSA</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="payment-plan" id="payment-plan" />
                          <Label htmlFor="payment-plan">Payment Plan</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      Free 15-Minute Consultation
                    </h4>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Before your first paid session, you'll have a free consultation to meet your therapist and ensure
                      they're the right fit for you.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                >
                  {currentStep === steps.length ? "Complete Setup" : "Next"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
