"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  Heart,
  Home,
  Layers,
  MessageSquare,
  Search,
  Settings,
  Share2,
  ShoppingBag,
  Star,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function InteriorDesignPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  // Sample data for interior design projects
  const projects = [
    {
      id: 1,
      title: "Modern Minimalist Living Room",
      designer: "Emma Johnson",
      image: "/placeholder.svg?height=400&width=600",
      category: "living",
      rating: 4.8,
      likes: 342,
      comments: 56,
      featured: true,
    },
    {
      id: 2,
      title: "Scandinavian Kitchen Design",
      designer: "Alex Peterson",
      image: "/placeholder.svg?height=400&width=600",
      category: "kitchen",
      rating: 4.7,
      likes: 289,
      comments: 42,
      featured: true,
    },
    {
      id: 3,
      title: "Bohemian Bedroom Retreat",
      designer: "Sophia Martinez",
      image: "/placeholder.svg?height=400&width=600",
      category: "bedroom",
      rating: 4.9,
      likes: 412,
      comments: 78,
      featured: true,
    },
    {
      id: 4,
      title: "Industrial Style Home Office",
      designer: "Daniel Kim",
      image: "/placeholder.svg?height=400&width=600",
      category: "office",
      rating: 4.6,
      likes: 256,
      comments: 34,
      featured: false,
    },
    {
      id: 5,
      title: "Luxury Bathroom Renovation",
      designer: "Olivia Williams",
      image: "/placeholder.svg?height=400&width=600",
      category: "bathroom",
      rating: 4.8,
      likes: 321,
      comments: 48,
      featured: false,
    },
    {
      id: 6,
      title: "Contemporary Dining Room",
      designer: "Michael Chen",
      image: "/placeholder.svg?height=400&width=600",
      category: "dining",
      rating: 4.7,
      likes: 278,
      comments: 39,
      featured: false,
    },
  ]

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
              InteriorVision
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="text-gray-700 dark:text-gray-300">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button variant="ghost" className="text-gray-700 dark:text-gray-300">
              <BookOpen className="mr-2 h-4 w-4" />
              Explore
            </Button>
            <Button variant="ghost" className="text-gray-700 dark:text-gray-300">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Shop
            </Button>
            <Button variant="ghost" className="text-gray-700 dark:text-gray-300">
              <MessageSquare className="mr-2 h-4 w-4" />
              Community
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search designs..."
                className="pl-10 w-64 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Saved Designs</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/placeholder.svg?height=500&width=1200"
              alt="Interior Design Inspiration"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex flex-col justify-center p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-md">Transform Your Space</h1>
              <p className="text-lg text-white/90 mb-6 max-w-md">
                Discover stunning interior designs and get inspired for your next home project
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <Button className="bg-white text-purple-700 hover:bg-gray-100">
                  Explore Designs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  Find a Designer
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Explore Designs</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200 dark:border-gray-800">
                  Sort by: Popular
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Popular</DropdownMenuItem>
                <DropdownMenuItem>Recent</DropdownMenuItem>
                <DropdownMenuItem>Most Liked</DropdownMenuItem>
                <DropdownMenuItem>Most Commented</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              <TabsTrigger
                value="all"
                onClick={() => setActiveCategory("all")}
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="living"
                onClick={() => setActiveCategory("living")}
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                Living Room
              </TabsTrigger>
              <TabsTrigger
                value="kitchen"
                onClick={() => setActiveCategory("kitchen")}
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                Kitchen
              </TabsTrigger>
              <TabsTrigger
                value="bedroom"
                onClick={() => setActiveCategory("bedroom")}
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                Bedroom
              </TabsTrigger>
              <TabsTrigger
                value="bathroom"
                onClick={() => setActiveCategory("bathroom")}
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                Bathroom
              </TabsTrigger>
              <TabsTrigger
                value="office"
                onClick={() => setActiveCategory("office")}
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                Office
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} variants={itemVariants} />
                ))}
              </motion.div>
            </TabsContent>

            {/* Other tabs content will be shown based on the active category */}
            <TabsContent value="living" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} variants={itemVariants} />
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="kitchen" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} variants={itemVariants} />
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="bedroom" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} variants={itemVariants} />
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="bathroom" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} variants={itemVariants} />
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="office" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} variants={itemVariants} />
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Design Trends Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Latest Design Trends</h2>
            <Button variant="link" className="text-purple-600 dark:text-purple-400">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Biophilic Design",
                description: "Incorporating nature and natural elements into interior spaces",
                image: "/placeholder.svg?height=300&width=400",
                color: "from-green-500 to-teal-500",
              },
              {
                title: "Japandi Style",
                description: "A fusion of Japanese and Scandinavian aesthetics for minimal, functional spaces",
                image: "/placeholder.svg?height=300&width=400",
                color: "from-amber-500 to-orange-500",
              },
              {
                title: "Curved Furniture",
                description: "Soft, organic shapes that add visual interest and comfort to any room",
                image: "/placeholder.svg?height=300&width=400",
                color: "from-purple-500 to-pink-500",
              },
            ].map((trend, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg">
                <div className="relative h-48">
                  <div className={`absolute inset-0 bg-gradient-to-br ${trend.color} opacity-90`}></div>
                  <img
                    src={trend.image || "/placeholder.svg"}
                    alt={trend.title}
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">{trend.title}</h3>
                    <p className="text-white/90 text-sm">{trend.description}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="inline-block mr-1 h-3 w-3" />
                      Trending now
                    </span>
                    <Button variant="ghost" size="sm" className="text-purple-600 dark:text-purple-400 p-0">
                      Learn more
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Designers */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Featured Designers</h2>
            <Button variant="link" className="text-purple-600 dark:text-purple-400">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Emma Johnson",
                specialty: "Modern Minimalist",
                projects: 48,
                followers: "12.5K",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Alex Peterson",
                specialty: "Scandinavian",
                projects: 36,
                followers: "9.8K",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Sophia Martinez",
                specialty: "Bohemian",
                projects: 52,
                followers: "15.2K",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Daniel Kim",
                specialty: "Industrial",
                projects: 41,
                followers: "11.3K",
                image: "/placeholder.svg?height=200&width=200",
              },
            ].map((designer, index) => (
              <Card
                key={index}
                className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img
                      src={designer.image || "/placeholder.svg"}
                      alt={designer.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{designer.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{designer.specialty} Designer</p>
                  <div className="flex justify-center gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{designer.projects}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">Projects</span>
                    </div>
                    <Separator orientation="vertical" className="h-4 bg-gray-300 dark:bg-gray-700" />
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{designer.followers}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">Followers</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-gray-200 dark:border-gray-800 hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-500 dark:hover:text-purple-400"
                  >
                    Follow
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500 shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 flex flex-col justify-center md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Space?</h2>
              <p className="text-white/90 mb-6 max-w-md">
                Join our community of interior design enthusiasts and professionals. Get personalized recommendations
                and connect with top designers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-purple-700 hover:bg-gray-100">Get Started</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Interior Design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                  InteriorVision
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Transforming spaces into beautiful, functional environments that inspire and delight.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <FacebookIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <InstagramIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <TwitterIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <PinterestIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Browse Designs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Find Designers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Design Tips
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Style Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Color Palettes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Subscribe</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get the latest design inspiration and tips delivered to your inbox.
              </p>
              <div className="flex">
                <Input placeholder="Your email" className="rounded-r-none border-gray-300 dark:border-gray-700" />
                <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700">Subscribe</Button>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-800" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">© 2023 InteriorVision. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-purple-600 dark:hover:text-purple-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-purple-600 dark:hover:text-purple-400"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-purple-600 dark:hover:text-purple-400"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project, variants }) {
  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow group">
        <div className="relative">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {project.featured && (
            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0">
              Featured
            </Badge>
          )}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white text-gray-700">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white text-gray-700">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">{project.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">by {project.designer}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.rating}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                {project.likes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {project.comments}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Social Media Icons
function FacebookIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  )
}

function TwitterIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
    </svg>
  )
}

function PinterestIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 12h8"></path>
      <path d="M12 8v8"></path>
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  )
}

function Bell(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  )
}
