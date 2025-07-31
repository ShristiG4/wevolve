"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, Shield, Target, Lightbulb, Star, Quote, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { useAuth } from "@/lib/auth"

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Clinical Director & Licensed Psychologist",
    credentials: "Ph.D., Licensed Psychologist",
    specialties: ["Anxiety Disorders", "Cognitive Behavioral Therapy", "Trauma Recovery"],
    experience: "15+ years",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Johnson leads our clinical team with expertise in evidence-based treatments for anxiety and trauma. She's passionate about making mental health care accessible to all.",
  },
  {
    name: "Dr. Michael Chen",
    role: "Psychiatrist & Medical Director",
    credentials: "M.D., Board Certified Psychiatrist",
    specialties: ["Medication Management", "Bipolar Disorder", "Depression"],
    experience: "12+ years",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Chen brings extensive experience in psychiatric medication management and works collaboratively with our therapy team for comprehensive care.",
  },
  {
    name: "Lisa Rodriguez, LCSW",
    role: "Senior Therapist",
    credentials: "LCSW, Licensed Clinical Social Worker",
    specialties: ["Family Therapy", "Relationship Counseling", "Addiction Recovery"],
    experience: "10+ years",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Lisa specializes in family systems and relationship dynamics, helping individuals and families build stronger, healthier connections.",
  },
  {
    name: "Dr. James Wilson",
    role: "Child & Adolescent Specialist",
    credentials: "Ph.D., Licensed Psychologist",
    specialties: ["Child Psychology", "ADHD", "Autism Spectrum"],
    experience: "8+ years",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Wilson focuses on helping children and teens navigate developmental challenges and build resilience for lifelong mental wellness.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We approach every client with empathy, understanding, and genuine care for their wellbeing.",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Creating a secure, confidential space where clients feel comfortable sharing and healing.",
  },
  {
    icon: Users,
    title: "Inclusive Community",
    description: "Welcoming individuals from all backgrounds, identities, and walks of life without judgment.",
  },
  {
    icon: Target,
    title: "Evidence-Based",
    description: "Using proven therapeutic approaches and staying current with the latest research and best practices.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embracing technology and new methods to make mental health care more accessible and effective.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Maintaining the highest standards of professional practice and continuous improvement.",
  },
]

const stats = [
  { number: "10,000+", label: "Clients Served", icon: Users },
  { number: "50+", label: "Licensed Professionals", icon: Award },
  { number: "95%", label: "Client Satisfaction", icon: Star },
  { number: "24/7", label: "Crisis Support", icon: Shield },
]

const testimonials = [
  {
    name: "Sarah M.",
    role: "Client since 2022",
    content:
      "WEvolve changed my life. The therapists are incredibly skilled and caring. I finally found the support I needed to overcome my anxiety.",
    rating: 5,
  },
  {
    name: "David L.",
    role: "Client since 2021",
    content:
      "The convenience of online sessions combined with the quality of care is unmatched. My therapist truly understands my needs.",
    rating: 5,
  },
  {
    name: "Maria R.",
    role: "Client since 2023",
    content:
      "As a busy parent, the flexible scheduling and video sessions have made it possible for me to prioritize my mental health.",
    rating: 5,
  },
]

const certifications = [
  "Joint Commission Accredited",
  "HIPAA Compliant",
  "APA Approved",
  "State Licensed Facility",
  "Crisis Intervention Certified",
  "Trauma-Informed Care",
]

export default function AboutPage() {
  const { user, isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/wevolve-logo.png" alt="WEvolve Logo" className="h-8 w-8" />
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
                <span className="text-green-600 dark:text-green-400 px-3 py-2 text-sm font-medium">About Us</span>
                <Link
                  href="/doctors"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 text-sm font-medium"
                >
                  Find Doctors
                </Link>
                <Link
                  href="/services"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 text-sm font-medium"
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 text-sm font-medium"
                >
                  Contact Us
                </Link>
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  {isAuthenticated && <NotificationCenter />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About <span className="text-green-600 dark:text-green-400">WEvolve</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We're on a mission to make quality mental health care accessible, affordable, and effective for
                everyone. Our team of licensed professionals is dedicated to supporting your journey toward wellness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
                    Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img src="/medical-bg.png" alt="Mental Health Support" className="rounded-lg shadow-lg w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center">
                    <Target className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    To provide compassionate, evidence-based mental health care that empowers individuals to overcome
                    challenges, build resilience, and live fulfilling lives. We believe everyone deserves access to
                    quality mental health support, regardless of their circumstances.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center">
                    <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    A world where mental health care is as accessible and normalized as physical health care. We
                    envision communities where seeking help is seen as a sign of strength, and where technology bridges
                    the gap between those who need support and those who can provide it.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Making a difference in mental health care</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="p-6 dark:bg-gray-700 dark:border-gray-600">
                  <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <stat.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Licensed professionals dedicated to your wellbeing
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-700 dark:border-gray-600">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                        <p className="text-green-600 dark:text-green-400 font-medium mb-2">{member.role}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {member.credentials} • {member.experience}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{member.bio}</p>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Real stories from real people</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Certifications & Accreditations</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Maintaining the highest standards of care</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
              >
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of others who have found support and healing with WEvolve.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Get Started Today
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
