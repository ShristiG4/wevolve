"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, Calendar, Filter, Search, Brain, Heart, Stethoscope } from "lucide-react"
import Link from "next/link"

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
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Psychiatrist",
    type: "psychiatrist",
    rating: 4.8,
    reviews: 89,
    experience: "12 years",
    location: "Los Angeles, CA",
    price: 200,
    image: "/placeholder.svg?height=200&width=200",
    bio: "Board-certified psychiatrist specializing in mood disorders, ADHD, and medication management.",
    availability: ["Tue", "Thu", "Sat"],
    languages: ["English", "Mandarin"],
    education: "MD, UCLA School of Medicine",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Licensed Therapist",
    type: "therapist",
    rating: 4.7,
    reviews: 156,
    experience: "6 years",
    location: "Chicago, IL",
    price: 120,
    image: "/placeholder.svg?height=200&width=200",
    bio: "Focuses on relationship counseling, family therapy, and stress management techniques.",
    availability: ["Mon", "Tue", "Thu"],
    languages: ["English", "Spanish"],
    education: "MA in Marriage and Family Therapy, Northwestern University",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Clinical Psychologist",
    type: "psychologist",
    rating: 4.9,
    reviews: 203,
    experience: "15 years",
    location: "Boston, MA",
    price: 175,
    image: "/placeholder.svg?height=200&width=200",
    bio: "Expert in cognitive behavioral therapy, specializing in OCD, phobias, and panic disorders.",
    availability: ["Wed", "Thu", "Fri"],
    languages: ["English"],
    education: "PhD in Clinical Psychology, Boston University",
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Psychiatrist",
    type: "psychiatrist",
    rating: 4.6,
    reviews: 94,
    experience: "10 years",
    location: "Seattle, WA",
    price: 180,
    image: "/placeholder.svg?height=200&width=200",
    bio: "Specializes in adolescent psychiatry, eating disorders, and dual diagnosis treatment.",
    availability: ["Mon", "Wed", "Fri"],
    languages: ["English"],
    education: "MD, University of Washington School of Medicine",
  },
  {
    id: 6,
    name: "Dr. David Kumar",
    specialty: "Licensed Therapist",
    type: "therapist",
    rating: 4.8,
    reviews: 112,
    experience: "7 years",
    location: "Austin, TX",
    price: 110,
    image: "/placeholder.svg?height=200&width=200",
    bio: "Specializes in mindfulness-based therapy, addiction counseling, and group therapy sessions.",
    availability: ["Tue", "Thu", "Sat"],
    languages: ["English", "Hindi"],
    education: "MA in Clinical Mental Health Counseling, University of Texas",
  },
]

const specialtyIcons = {
  psychologist: Brain,
  psychiatrist: Stethoscope,
  therapist: Heart,
}

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [filteredDoctors, setFilteredDoctors] = useState(doctors)

  const handleSearch = () => {
    let filtered = doctors

    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSpecialty !== "all") {
      filtered = filtered.filter((doctor) => doctor.type === selectedSpecialty)
    }

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "experience":
          return Number.parseInt(b.experience) - Number.parseInt(a.experience)
        default:
          return 0
      }
    })

    setFilteredDoctors(filtered)
  }

  useState(() => {
    handleSearch()
  }, [searchTerm, selectedSpecialty, sortBy])

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
                <Link href="/doctors" className="text-green-600 px-3 py-2 text-sm font-medium">
                  Find Doctors
                </Link>
                <Link href="/appointments" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                  My Appointments
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
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Mental Health Professional</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Connect with certified therapists, psychologists, and psychiatrists who understand your unique needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="therapist">Therapists</SelectItem>
                <SelectItem value="psychologist">Psychologists</SelectItem>
                <SelectItem value="psychiatrist">Psychiatrists</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => {
              const SpecialtyIcon = specialtyIcons[doctor.type as keyof typeof specialtyIcons]
              return (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Available: {doctor.availability.join(", ")}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {doctor.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-2xl font-bold text-green-600">
                          ${doctor.price}
                          <span className="text-sm text-gray-500 font-normal">/session</span>
                        </div>
                        <Link href={`/book-appointment/${doctor.id}`}>
                          <Button className="bg-green-600 hover:bg-green-700">Book Now</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
