"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Heart,
  Users,
  Video,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  User,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const services = [
  {
    icon: Brain,
    title: "Individual Therapy",
    description: "One-on-one sessions with licensed therapists specializing in various mental health conditions.",
    price: "$120-180",
    duration: "50 minutes",
    features: ["Personalized treatment plans", "Evidence-based approaches", "Flexible scheduling", "Progress tracking"],
    specialties: ["Depression", "Anxiety", "PTSD", "Relationship Issues"],
  },
  {
    icon: Users,
    title: "Group Therapy",
    description: "Supportive group sessions led by experienced therapists for shared healing experiences.",
    price: "$60-90",
    duration: "90 minutes",
    features: ["Peer support", "Shared experiences", "Cost-effective", "Social skills development"],
    specialties: ["Addiction Recovery", "Grief Support", "Social Anxiety", "Life Transitions"],
  },
  {
    icon: Heart,
    title: "Couples Counseling",
    description: "Relationship therapy to help couples improve communication and resolve conflicts.",
    price: "$150-220",
    duration: "60 minutes",
    features: ["Communication skills", "Conflict resolution", "Intimacy building", "Relationship assessment"],
    specialties: ["Marriage Counseling", "Pre-marital Therapy", "Divorce Mediation", "Family Planning"],
  },
  {
    icon: User,
    title: "Psychiatric Consultation",
    description: "Medical evaluation and medication management with board-certified psychiatrists.",
    price: "$200-300",
    duration: "45 minutes",
    features: ["Medication management", "Diagnostic assessment", "Treatment monitoring", "Collaborative care"],
    specialties: ["Bipolar Disorder", "Schizophrenia", "ADHD", "Mood Disorders"],
  },
]

const sessionTypes = [
  {
    type: "Video Sessions",
    icon: Video,
    description: "Face-to-face therapy from the comfort of your home",
    pros: ["Personal connection", "Non-verbal communication", "Comfortable environment", "No travel required"],
    cons: ["Requires stable internet", "Technology barriers", "Privacy concerns at home"],
    bestFor: "Most therapy types, initial consultations, ongoing treatment",
  },
  {
    type: "Phone Sessions",
    icon: Phone,
    description: "Voice-only therapy sessions for maximum flexibility",
    pros: ["No video requirements", "Works with poor internet", "Complete privacy", "Easy scheduling"],
    cons: ["Limited non-verbal cues", "Potential distractions", "Less personal connection"],
    bestFor: "Follow-up sessions, crisis support, busy schedules",
  },
  {
    type: "Chat Therapy",
    icon: MessageCircle,
    description: "Text-based therapy for ongoing support and communication",
    pros: ["Asynchronous communication", "Time to process thoughts", "Written record", "Lower cost"],
    cons: ["No immediate response", "Limited emotional expression", "Typing required"],
    bestFor: "Ongoing support, journaling therapy, supplemental care",
  },
]

const specializations = [
  { name: "Anxiety Disorders", therapists: 45, description: "Generalized anxiety, panic disorders, phobias" },
  {
    name: "Depression",
    therapists: 52,
    description: "Major depression, seasonal affective disorder, postpartum depression",
  },
  { name: "Trauma & PTSD", therapists: 38, description: "Combat trauma, childhood trauma, accident recovery" },
  {
    name: "Relationship Issues",
    therapists: 41,
    description: "Marriage counseling, family therapy, communication skills",
  },
  {
    name: "Addiction Recovery",
    therapists: 29,
    description: "Substance abuse, behavioral addictions, recovery support",
  },
  { name: "Eating Disorders", therapists: 23, description: "Anorexia, bulimia, binge eating, body image issues" },
  { name: "ADHD", therapists: 31, description: "Attention deficit, hyperactivity, executive function" },
  {
    name: "Bipolar Disorder",
    therapists: 27,
    description: "Mood stabilization, medication compliance, lifestyle management",
  },
  { name: "OCD", therapists: 19, description: "Obsessive-compulsive disorder, intrusive thoughts, compulsions" },
  { name: "Grief & Loss", therapists: 35, description: "Bereavement, loss processing, life transitions" },
  { name: "LGBTQ+ Issues", therapists: 26, description: "Identity exploration, coming out, discrimination support" },
  { name: "Teen & Adolescent", therapists: 33, description: "Teenage depression, school issues, identity development" },
]

const insuranceProviders = [
  { name: "Blue Cross Blue Shield", coverage: "80-90%", copay: "$20-40" },
  { name: "Aetna", coverage: "75-85%", copay: "$25-45" },
  { name: "Cigna", coverage: "80-90%", copay: "$20-35" },
  { name: "UnitedHealthcare", coverage: "75-90%", copay: "$25-40" },
  { name: "Kaiser Permanente", coverage: "90-100%", copay: "$15-30" },
  { name: "Humana", coverage: "70-85%", copay: "$30-50" },
  { name: "Medicaid", coverage: "100%", copay: "$0-10" },
  { name: "Medicare", coverage: "80%", copay: "$20-40" },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("services")

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
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 text-sm font-medium"
                >
                  About Us
                </Link>
                <Link
                  href="/doctors"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 text-sm font-medium"
                >
                  Find Doctors
                </Link>
                <span className="text-green-600 dark:text-green-400 px-3 py-2 text-sm font-medium">Services</span>
                <Link
                  href="/contact"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 text-sm font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              Our <span className="text-green-600 dark:text-green-400">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive mental health care tailored to your unique needs. Choose from individual therapy, group
              sessions, couples counseling, and psychiatric consultations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/doctors">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 bg-transparent"
                >
                  Find a Therapist
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="services">Our Services</TabsTrigger>
              <TabsTrigger value="sessions">Session Types</TabsTrigger>
              <TabsTrigger value="specializations">Specializations</TabsTrigger>
              <TabsTrigger value="insurance">Insurance & Pricing</TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  Comprehensive Mental Health Services
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Professional, evidence-based treatment options designed to support your mental health journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
                      <CardHeader>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                            <service.icon className="h-8 w-8 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                              {service.title}
                            </CardTitle>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {service.price}
                              </Badge>
                              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {service.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Key Features:</h4>
                            <ul className="space-y-1">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Specialties:</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.specialties.map((specialty, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-4">
                            Book Consultation
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Session Types Tab */}
            <TabsContent value="sessions" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  Choose Your Preferred Session Type
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Flexible therapy options designed to fit your lifestyle and preferences
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {sessionTypes.map((session, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full dark:bg-gray-800 dark:border-gray-700">
                      <CardHeader className="text-center">
                        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                          <session.icon className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                          {session.type}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300">{session.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Advantages
                          </h4>
                          <ul className="space-y-2">
                            {session.pros.map((pro, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 flex items-center">
                            <XCircle className="h-5 w-5 mr-2" />
                            Considerations
                          </h4>
                          <ul className="space-y-2">
                            {session.cons.map((con, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Best For:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{session.bestFor}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Specializations Tab */}
            <TabsContent value="specializations" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Areas of Expertise</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our licensed therapists specialize in a wide range of mental health conditions and life challenges
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specializations.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{spec.name}</h3>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          >
                            {spec.therapists} therapists
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{spec.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-4 border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                        >
                          Find Specialist
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Insurance & Pricing Tab */}
            <TabsContent value="insurance" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  Insurance & Pricing Information
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  We accept most major insurance plans and offer flexible payment options to make mental health care
                  accessible
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Insurance Providers */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                    <Shield className="h-6 w-6 text-green-600 mr-3" />
                    Accepted Insurance Plans
                  </h3>
                  <div className="space-y-4">
                    {insuranceProviders.map((provider, index) => (
                      <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-800 dark:text-white">{provider.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">Coverage: {provider.coverage}</p>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Copay: {provider.copay}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Payment Options */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                    <CreditCard className="h-6 w-6 text-green-600 mr-3" />
                    Payment Options
                  </h3>
                  <div className="space-y-6">
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Self-Pay Rates</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-300">Individual Therapy (50 min)</span>
                            <span className="font-semibold text-gray-800 dark:text-white">$120-180</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-300">Couples Therapy (60 min)</span>
                            <span className="font-semibold text-gray-800 dark:text-white">$150-220</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-300">Group Therapy (90 min)</span>
                            <span className="font-semibold text-gray-800 dark:text-white">$60-90</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-300">Psychiatric Consultation</span>
                            <span className="font-semibold text-gray-800 dark:text-white">$200-300</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Financial Assistance</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Sliding scale fees available
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Payment plans offered
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            HSA/FSA accepted
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Student discounts available
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                          Free Initial Consultation
                        </h4>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                          Schedule a 15-minute consultation to discuss your needs and determine the best treatment
                          approach.
                        </p>
                        <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                          Schedule Free Consultation
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards better mental health. Our compassionate team is here to support you every step
            of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                Start Assessment
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
