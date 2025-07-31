"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, Phone, Mail, MapPin, ArrowRight, Brain, UserCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AuthModal } from "@/components/auth/auth-modal"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { useAuth } from "@/lib/auth"

const services = [
  {
    icon: Brain,
    title: "Certified Specialists",
    description:
      "Connect with certified specialists in mental health care, including therapists, psychologists, and psychiatrists who offer personalized guidance and support tailored to your unique needs and circumstances.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: UserCheck,
    title: "Tailored Matching",
    description:
      "Discover the perfect counselor or therapist through our advanced matching system, which considers your individual preferences and requirements.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Wellness Diary",
    description:
      "Track your mental health and holistic well-being with our comprehensive wellness diary. Monitor emotional and psychological health and analyze sleep patterns.",
    color: "from-purple-500 to-pink-500",
  },
]

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description:
      "Create an account on our website by providing basic information. This step allows you to access our services and personalize your treatment journey.",
  },
  {
    number: 2,
    title: "Enter Your Details",
    description:
      "Fill out your form with your personal information and health history. This information helps us understand your specific needs and tailor our services accordingly.",
  },
  {
    number: 3,
    title: "Contact Us",
    description:
      "Reach out to us through our helpline or website to get started. Our friendly staff is available to assist you with any questions or concerns you may have.",
  },
  {
    number: 4,
    title: "Initial Assessment",
    description:
      "Schedule an initial assessment session with one of our counselors. During this session, you will discuss your goals, concerns, and any challenges you may be facing.",
  },
  {
    number: 5,
    title: "Personalized Plan",
    description:
      "Receive a personalized treatment plan based on your assessment. Our experienced counselors will collaborate with you to create a comprehensive plan.",
  },
  {
    number: 6,
    title: "Begin Counseling",
    description:
      "Start your counseling or therapy sessions tailored to your needs. Our compassionate counselors provide a supportive environment.",
  },
]

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

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
                  {isAuthenticated ? (
                    <>
                      <NotificationCenter />
                      <Link
                        href="/dashboard"
                        className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 text-sm font-medium"
                      >
                        Dashboard
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={logout}
                        className="text-gray-700 dark:text-gray-300 hover:text-green-600"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsAuthModalOpen(true)} className="bg-green-600 hover:bg-green-700">
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/'background.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-green-900 bg-opacity-20"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 dark:text-white">
              Evolving Minds,
              <br />
              <span className="text-green-600 dark:text-green-400">Empowering Lives</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200">
              WEvolve offers compassionate online counseling, therapy, and helpline services to support your mental
              well-being. Together, we help you grow and thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 text-lg bg-transparent"
                >
                  About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl font-bold text-green-600 dark:text-green-400 mb-8">OVERVIEW</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Welcome to <span className="text-green-600 dark:text-green-400">WEvolve</span>, your trusted partner
                  in mental health and well-being.
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  At WEvolve, we believe that mental health is fundamental to a fulfilling life. Our mission is to offer
                  comprehensive, accessible, and compassionate care to individuals striving to enhance their mental
                  well-being.
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Our Services</h4>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  We provide a diverse range of services tailored to support you on your journey to wellness. These
                  include personalized online counseling and therapy sessions, as well as a responsive helpline for
                  immediate support.
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Innovative Technology</h4>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  In addition to our counseling services, WEvolve offers innovative sleep tracking technology. Our
                  advanced sleep trackers are designed to monitor and analyze your sleep patterns, empowering you to
                  make informed adjustments.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive mental health support tailored to your unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-full mb-4`}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Get <span className="text-green-600 dark:text-green-400">Started</span> Today!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                        {step.number}
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              At WEvolve, we are committed to evolving alongside you, equipping you with the tools and support necessary
              to thrive. Take the first step towards a healthier, happier you by joining us today.
            </p>
            <Link href="/book-appointment">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Book Your First Session <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Get in touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Our friendly team is always here to chat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Our friendly team is here to help.</p>
                <p className="text-green-600 dark:text-green-400 font-semibold">wevolve.talk@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Office</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Come say hello at our office HQ.</p>
                <p className="text-green-600 dark:text-green-400 font-semibold">
                  DM-4/1 Sector V Bidhannagar KOL 700091 IND
                </p>
              </CardContent>
            </Card>

            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Helpline</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Available 24/7</p>
                <p className="text-green-600 dark:text-green-400 font-semibold">+1 (555) 000-0000</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            The latest mental health news and tips, delivered to your inbox weekly.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-gray-900"
            />
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/wevolve-logo.png" alt="WEvolve Logo" width={32} height={32} className="w-8 h-8" />
                <h3 className="text-2xl font-bold text-green-400">WEVOLVE</h3>
              </div>
              <p className="text-gray-300">Your trusted partner in mental health and well-being.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/therapy" className="hover:text-green-400">
                    Therapy
                  </Link>
                </li>
                <li>
                  <Link href="/counseling" className="hover:text-green-400">
                    Counseling
                  </Link>
                </li>
                <li>
                  <Link href="/psychiatry" className="hover:text-green-400">
                    Psychiatry
                  </Link>
                </li>
                <li>
                  <Link href="/wellness" className="hover:text-green-400">
                    Wellness Tracking
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/about" className="hover:text-green-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-green-400">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-green-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-green-400">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/help" className="hover:text-green-400">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-green-400">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="hover:text-green-400">
                    Emergency
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 WEvolve. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}
