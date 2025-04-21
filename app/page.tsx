"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Code, Database, Lightbulb, Trophy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LandingPage() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      {/* Navbar */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-100">AWAKE & ARISE</h1>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <Link href="#features" className="text-purple-200 hover:text-purple-100">
              Features
            </Link>
            <Link href="#testimonials" className="text-purple-200 hover:text-purple-100">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-purple-200 hover:text-purple-100">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button className="bg-purple-700 text-white hover:bg-purple-600" onClick={() => router.push("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/80 to-black/90"></div>

        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <h1 className="mb-6 text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                AWAKE & ARISE
              </h1>
              <p className="mb-8 text-xl text-purple-100 md:text-2xl">
                A gamified 3D learning platform for JEE/NEET, bank, government exams, and English skills
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start justify-center">
                <Button
                  className="bg-purple-700 text-white hover:bg-purple-600"
                  size="lg"
                  onClick={() => router.push("/signup")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
                  size="lg"
                  onClick={() => {
                    const featuresSection = document.getElementById("features")
                    if (featuresSection) {
                      featuresSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative h-80 w-80 md:h-96 md:w-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
                <div className="relative flex h-full items-center justify-center">
                  {/* This would be a 3D model in the actual implementation */}
                  <div className="h-64 w-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                    <div className="h-full w-full rounded-full bg-black/50 backdrop-blur-sm"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-purple-100 md:text-4xl">Platform Features</h2>
            <p className="mx-auto max-w-3xl text-lg text-purple-300">
              Our comprehensive learning platform offers a variety of features to help you succeed in your exams and
              career
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Student Dashboard",
                icon: Users,
                description:
                  "Track your progress, compete on leaderboards, and get personalized guidance from AI mentors.",
                features: ["Progress tracking", "AI mentorship", "Mock tests", "Code playground"],
              },
              {
                title: "Exam Preparation",
                icon: BookOpen,
                description: "Prepare for JEE, NEET, bank exams, and government positions with specialized mock tests.",
                features: [
                  "50+ languages supported",
                  "Anti-cheat system",
                  "Real-time feedback",
                  "Performance analytics",
                ],
              },
              {
                title: "Teacher Dashboard",
                icon: Database,
                description: "Create and manage exams, track student performance, and generate reports.",
                features: ["Bulk upload questions", "AI question generation", "Export results", "Student rankings"],
              },
              {
                title: "Code Playground",
                icon: Code,
                description: "Practice coding in multiple languages with real-time execution and feedback.",
                features: ["Multi-language support", "Code execution", "Debugging tools", "Coding challenges"],
              },
              {
                title: "AI Mentor",
                icon: Lightbulb,
                description: "Get personalized guidance and answers to your questions from our AI mentor.",
                features: ["24/7 availability", "Subject expertise", "Personalized feedback", "Learning suggestions"],
              },
              {
                title: "Gamified Learning",
                icon: Trophy,
                description: "Earn points, badges, and climb the leaderboard as you learn and complete challenges.",
                features: ["XP system", "Achievement badges", "Daily streaks", "Competitive leaderboards"],
              },
            ].map((feature, i) => (
              <Card key={i} className="overflow-hidden border-purple-700/50 bg-purple-900/30 backdrop-blur-md group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-6 relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-800/50">
                    <feature.icon className="h-6 w-6 text-purple-300" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-purple-200">{feature.title}</h3>
                  <p className="mb-4 text-purple-300">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, j) => (
                      <li key={j} className="flex items-center text-sm text-purple-400">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-purple-100 md:text-4xl">Student Success Stories</h2>
            <p className="mx-auto max-w-3xl text-lg text-purple-300">
              Hear from our students who have achieved their goals with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Rahul Sharma",
                role: "JEE Advanced Qualifier",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "The mock tests and AI mentor helped me identify my weak areas and focus my preparation. I cleared JEE Advanced with a top rank!",
              },
              {
                name: "Priya Patel",
                role: "NEET Topper",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "The biology section and detailed explanations were incredibly helpful. I scored in the 99th percentile in NEET thanks to this platform.",
              },
              {
                name: "Amit Kumar",
                role: "Bank PO",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "The quantitative aptitude and reasoning sections prepared me perfectly for the Bank PO exam. I got selected in my first attempt!",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="overflow-hidden border-purple-700/50 bg-purple-900/30 backdrop-blur-md group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-6 relative">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-200">{testimonial.name}</h3>
                      <p className="text-sm text-purple-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-purple-300">"{testimonial.quote}"</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-purple-100 md:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mx-auto max-w-3xl text-lg text-purple-300">
              Choose the plan that fits your needs and start your learning journey today
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Basic",
                price: "₹499",
                period: "per month",
                description: "Perfect for beginners starting their preparation",
                features: [
                  "Access to basic mock tests",
                  "Limited code playground usage",
                  "Community forum access",
                  "Email support",
                ],
                buttonText: "Get Started",
                isPopular: false,
              },
              {
                name: "Pro",
                price: "₹999",
                period: "per month",
                description: "Ideal for serious exam preparation",
                features: [
                  "Unlimited mock tests",
                  "Full code playground access",
                  "AI mentor (limited queries)",
                  "Performance analytics",
                  "Priority email support",
                ],
                buttonText: "Get Pro",
                isPopular: true,
              },
              {
                name: "Premium",
                price: "₹1,999",
                period: "per month",
                description: "Comprehensive preparation for top results",
                features: [
                  "Everything in Pro",
                  "Unlimited AI mentor queries",
                  "1-on-1 coaching sessions",
                  "Advanced analytics and insights",
                  "24/7 priority support",
                ],
                buttonText: "Get Premium",
                isPopular: false,
              },
            ].map((plan, i) => (
              <Card
                key={i}
                className={`overflow-hidden backdrop-blur-md relative ${
                  plan.isPopular
                    ? "border-purple-500 bg-purple-900/40 scale-105 z-10"
                    : "border-purple-700/50 bg-purple-900/30"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold text-purple-200">{plan.name}</h3>
                  <div className="my-4">
                    <span className="text-3xl font-bold text-purple-100">{plan.price}</span>
                    <span className="text-purple-400"> {plan.period}</span>
                  </div>
                  <p className="mb-6 text-purple-300">{plan.description}</p>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-sm text-purple-300">
                        <svg
                          className="mr-2 h-5 w-5 text-purple-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={
                      plan.isPopular
                        ? "w-full bg-purple-600 text-white hover:bg-purple-500"
                        : "w-full bg-purple-700/70 text-white hover:bg-purple-600/70"
                    }
                    onClick={() => router.push("/signup")}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-black/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-purple-100 md:text-4xl">Ready to Start Your Journey?</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-purple-300">
            Join thousands of students who have transformed their learning experience with our platform
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              className="bg-purple-700 text-white hover:bg-purple-600"
              size="lg"
              onClick={() => router.push("/signup")}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outline"
              className="border-purple-700 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50"
              size="lg"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-purple-100">AWAKE & ARISE</h3>
              <p className="text-sm text-purple-400">
                A comprehensive learning platform for competitive exams and skill development
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase text-purple-300">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-purple-400 hover:text-purple-300">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-purple-400 hover:text-purple-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-400 hover:text-purple-300">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase text-purple-300">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-purple-400 hover:text-purple-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-400 hover:text-purple-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-400 hover:text-purple-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase text-purple-300">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-purple-400 hover:text-purple-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-400 hover:text-purple-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-400 hover:text-purple-300">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-purple-900/50 pt-8 text-center text-sm text-purple-400">
            <p>&copy; {new Date().getFullYear()} AWAKE & ARISE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
