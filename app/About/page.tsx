"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  MapPin,
  Mic,
  Headphones,
  User,
  Compass,
  Info,
  ChevronDown,
  Play,
  Pause,
  MapIcon,
  Smartphone,
  Globe,
  Clock,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Handle scroll progress for the progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]")
      let currentSection = "hero"

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop < window.innerHeight / 2) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isAudioPlaying])

  // Toggle audio playback
  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Audio element for background narration */}
      <audio ref={audioRef} loop>
        <source src="/placeholder-audio.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Fixed audio control */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleAudio}
          className={cn(
            "rounded-full w-12 h-12 shadow-lg flex items-center justify-center transition-all",
            isAudioPlaying ? "bg-amber-700 hover:bg-amber-800" : "bg-amber-600 hover:bg-amber-700",
          )}
        >
          {isAudioPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <span className="absolute -top-8 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {isAudioPlaying ? "Pause narration" : "Play narration"}
        </span>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-amber-200 z-50">
        <div
          className="h-full bg-amber-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <span
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeSection === section.id ? "bg-amber-600" : "bg-amber-300 group-hover:bg-amber-400",
                )}
              ></span>
              <span
                className={cn(
                  "text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity",
                  activeSection === section.id ? "text-amber-800" : "text-amber-600",
                )}
              >
                {section.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setActiveSection("hero")}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 to-amber-800/90 mix-blend-multiply z-10"></div>
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Morocco landscape"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Discover Morocco <span className="text-amber-300">Through Sound</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-amber-50">
              An immersive audio guide that brings Morocco's rich cultural heritage to life as you explore
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-amber-500 hover:bg-amber-600 text-amber-950 h-14 px-8 rounded-full text-lg">
                <Link href="/trips">Explore Trips</Link>
              </Button>
              <Button
                variant="outline"
                className="border-amber-300 text-amber-100 hover:bg-amber-800/50 h-14 px-8 rounded-full text-lg"
              >
                <Link href="#features">Discover Features</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <a
              href="#features"
              className="flex flex-col items-center text-amber-200 hover:text-amber-100 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white" onMouseEnter={() => setActiveSection("about")}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title="About Our Audio Guide"
            subtitle="Transforming how you experience Morocco's cultural treasures"
          />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-amber-900 mb-6">Our Story</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Born from a passion for Morocco's rich cultural heritage, our audio guide app was created to offer
                  travelers an authentic and immersive experience of the country's most treasured sites.
                </p>
                <p>
                  Our team of local historians, cultural experts, and tech enthusiasts came together with a shared
                  vision: to make Morocco's fascinating history and traditions accessible to everyone through the power
                  of sound.
                </p>
                <p>
                  What began as a small project focused on Marrakech has grown into a comprehensive audio guide covering
                  major cities, hidden gems, and everything in between. We're proud to help visitors and locals alike
                  discover the stories behind Morocco's magnificent architecture, vibrant markets, and ancient
                  traditions.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    <Globe className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-amber-900 mb-1">20+ Cities</h4>
                  <p className="text-sm text-amber-700">Covering Morocco's most beautiful destinations</p>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-amber-900 mb-1">500+ Sites</h4>
                  <p className="text-sm text-amber-700">From famous landmarks to hidden gems</p>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    <Headphones className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-amber-900 mb-1">1000+ Hours</h4>
                  <p className="text-sm text-amber-700">Of professionally narrated audio content</p>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-amber-900 mb-1">4.8/5 Rating</h4>
                  <p className="text-sm text-amber-700">From thousands of satisfied travelers</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Morocco cultural site"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Morocco marketplace"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Morocco architecture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-gradient-to-b from-amber-100 to-white"
        onMouseEnter={() => setActiveSection("features")}
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Immersive Features"
            subtitle="Experience Morocco like never before with our innovative audio guide app"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white" onMouseEnter={() => setActiveSection("how-it-works")}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title="How It Works"
            subtitle="Simple steps to start your immersive audio journey through Morocco"
          />

          <div className="mt-16">
            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-amber-200 transform -translate-x-1/2 hidden md:block"></div>

              <div className="space-y-24">
                {howItWorks.map((step, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                    >
                      <div className="md:w-1/2 relative">
                        {/* Step number for mobile */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg md:hidden">
                          {index + 1}
                        </div>

                        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 relative">
                          {/* Step number for desktop */}
                          <div className="absolute top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xl hidden md:flex z-10">
                            {index + 1}
                          </div>
                          <div className={`${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                <step.icon className="w-5 h-5 text-amber-600" />
                              </div>
                              <h3 className="text-xl font-bold text-amber-900">{step.title}</h3>
                            </div>
                            <p className="text-gray-700">{step.description}</p>

                            <div className="mt-4 bg-white rounded-lg p-4 border border-amber-100">
                              <h4 className="font-medium text-amber-800 mb-2 text-sm">Pro Tip:</h4>
                              <p className="text-sm text-gray-600">{step.tip}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-1/2 relative h-64 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={`/placeholder.svg?height=300&width=500&text=Step ${index + 1}`}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-amber-50" onMouseEnter={() => setActiveSection("testimonials")}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title="What Our Users Say"
            subtitle="Hear from travelers who have experienced Morocco through our audio guides"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-amber-100 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=100&width=100&text=${testimonial.name.charAt(0)}`}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 italic flex-1">"{testimonial.text}"</p>

                <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> {testimonial.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white" onMouseEnter={() => setActiveSection("team")}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Meet Our Team"
            subtitle="The passionate experts behind Morocco's premier audio guide experience"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 border-4 border-amber-100">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=${member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-amber-900">{member.name}</h4>
                <p className="text-amber-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  {member.social.map((platform, i) => (
                    <a
                      key={i}
                      href={platform.url}
                      className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 hover:bg-amber-200 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <platform.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-amber-50" onMouseEnter={() => setActiveSection("faq")}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our audio guide app"
          />

          <div className="mt-16 max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative py-24 bg-amber-900 text-white" onMouseEnter={() => setActiveSection("cta")}>
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/placeholder.svg?height=800&width=1600" alt="Morocco pattern" fill className="object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Explore Morocco?</h2>
            <p className="text-xl text-amber-100 mb-8">
              Download our app today and transform your exploration of Morocco's rich cultural heritage with immersive
              audio guides.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-amber-500 hover:bg-amber-600 text-amber-950 h-14 px-8 rounded-full text-lg">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button
                variant="outline"
                className="border-amber-300 text-amber-100 hover:bg-amber-800/50 h-14 px-8 rounded-full text-lg"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Section header component
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto"
    >
      <h2 className="text-4xl font-bold text-amber-900 mb-4">{title}</h2>
      <p className="text-xl text-amber-700">{subtitle}</p>
    </motion.div>
  )
}

// Feature card component
function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-6">
        <feature.icon className="w-7 h-7 text-amber-600" />
      </div>
      <h3 className="text-xl font-bold text-amber-900 mb-3">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  )
}

// FAQ Item component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-amber-200 rounded-lg overflow-hidden">
      <button
        className="w-full text-left p-4 bg-white flex items-center justify-between font-medium text-amber-900 hover:bg-amber-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 text-amber-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 bg-amber-50 border-t border-amber-200">
              <p className="text-gray-700">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Data
const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
  { id: "testimonials", label: "Testimonials" },
  { id: "team", label: "Team" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Get Started" },
]

const features = [
  {
    icon: User,
    title: "User Authentication",
    description:
      "Create a personal profile to save your favorite locations, customize your preferences, and track your exploration history.",
  },
  {
    icon: MapPin,
    title: "Geolocation Services",
    description:
      "Our app automatically detects your location to provide relevant cultural information about nearby attractions and points of interest.",
  },
  {
    icon: Mic,
    title: "Voice Interaction",
    description:
      "Interact with the app using voice commands and listen to high-quality audio narrations about Morocco's cultural heritage.",
  },
  {
    icon: Info,
    title: "Real-time Information",
    description:
      "Access up-to-date information about cultural sites, including historical facts, opening hours, and visitor recommendations.",
  },
  {
    icon: Compass,
    title: "Interactive Map",
    description:
      "Navigate through an interactive map showing points of interest around you, with detailed information just a tap away.",
  },
  {
    icon: Headphones,
    title: "Audio Guides",
    description:
      "Immerse yourself in Morocco's rich history with professionally narrated audio guides for each cultural attraction.",
  },
]

const howItWorks = [
  {
    icon: Smartphone,
    title: "Download the App",
    description:
      "Get our app from the App Store or Google Play Store and create your account in just a few simple steps.",
    tip: "Enable notifications to receive updates about new audio guides and special offers in your area.",
  },
  {
    icon: MapPin,
    title: "Enable Location",
    description:
      "Allow the app to access your location to discover cultural points of interest around you as you explore Morocco.",
    tip: "For the best experience, make sure to enable 'High Accuracy' mode in your location settings.",
  },
  {
    icon: MapIcon,
    title: "Explore the Map",
    description:
      "Browse the interactive map to find historical sites, monuments, markets, and other cultural attractions near you.",
    tip: "Use the filter options to focus on specific types of attractions that interest you most.",
  },
  {
    icon: Headphones,
    title: "Listen & Learn",
    description:
      "Select any point of interest to start an immersive audio guide that reveals the stories and history behind each location.",
    tip: "Download audio guides in advance when you have WiFi to enjoy them offline during your explorations.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 5,
    text: "This app completely transformed my experience in Marrakech. The audio guides were informative, engaging, and helped me discover hidden gems I would have otherwise missed.",
    date: "October 2023",
  },
  {
    name: "Mohammed Al-Farsi",
    location: "Dubai, UAE",
    rating: 5,
    text: "Even as someone familiar with Moroccan culture, I learned so much through these audio guides. The historical context and stories behind each site were fascinating.",
    date: "September 2023",
  },
  {
    name: "Elena Rodriguez",
    location: "Barcelona, Spain",
    rating: 4,
    text: "The geolocation feature worked perfectly, alerting me whenever I was near an interesting site. The audio quality is excellent and the narrators are engaging.",
    date: "November 2023",
  },
  {
    name: "David Chen",
    location: "Toronto, Canada",
    rating: 5,
    text: "I loved being able to explore at my own pace while still getting in-depth information about each location. The offline feature was a lifesaver in areas with poor reception.",
    date: "August 2023",
  },
  {
    name: "Aisha Benali",
    location: "Casablanca, Morocco",
    rating: 5,
    text: "As a local, I was impressed by the accuracy and depth of information. This app helps preserve and share our cultural heritage in an accessible way.",
    date: "December 2023",
  },
  {
    name: "Thomas Mueller",
    location: "Berlin, Germany",
    rating: 4,
    text: "The voice interaction feature was surprisingly good at understanding my questions, even with background noise in busy markets. Highly recommended!",
    date: "July 2023",
  },
]

const team = [
  {
    name: "Yasmine Alaoui",
    role: "Founder & CEO",
    bio: "Cultural historian with a passion for making Morocco's heritage accessible to all.",
    social: [
      { icon: Globe, url: "#" },
      { icon: User, url: "#" },
    ],
  },
  {
    name: "Omar Benjelloun",
    role: "Chief Technology Officer",
    bio: "Tech innovator specializing in location-based services and audio processing.",
    social: [
      { icon: Globe, url: "#" },
      { icon: User, url: "#" },
    ],
  },
  {
    name: "Leila Mansouri",
    role: "Content Director",
    bio: "Storyteller and researcher with expertise in Moroccan history and architecture.",
    social: [
      { icon: Globe, url: "#" },
      { icon: User, url: "#" },
    ],
  },
  {
    name: "Karim Tazi",
    role: "UX Designer",
    bio: "Creating intuitive and beautiful interfaces inspired by Moroccan visual traditions.",
    social: [
      { icon: Globe, url: "#" },
      { icon: User, url: "#" },
    ],
  },
]

const faqs = [
  {
    question: "Is the app available offline?",
    answer:
      "Yes! You can download audio guides and maps for specific areas when you have an internet connection, then use them offline during your explorations. This is especially useful for travelers with limited data plans or when visiting areas with poor reception.",
  },
  {
    question: "In which languages are the audio guides available?",
    answer:
      "Our audio guides are currently available in English, French, Arabic, Spanish, and German. We're continuously adding more languages to make our content accessible to travelers from around the world.",
  },
  {
    question: "How accurate is the geolocation feature?",
    answer:
      "Our geolocation feature is highly accurate in most urban areas, with precision typically within 5-10 meters. In more remote locations, accuracy may vary. The app will notify you when you're approaching points of interest based on your location.",
  },
  {
    question: "Do I need to create an account to use the app?",
    answer:
      "While you can browse the map and see points of interest without an account, creating a free account allows you to save favorite locations, track your history, download content for offline use, and receive personalized recommendations.",
  },
  {
    question: "How often is new content added?",
    answer:
      "We add new audio guides and update existing content regularly. Our team of local experts is constantly researching and developing new material about Morocco's cultural sites, with major updates typically released monthly.",
  },
  {
    question: "Is the app free to use?",
    answer:
      "The app is free to download with access to basic features and sample audio guides. We offer a premium subscription that unlocks all audio guides, offline downloads, and advanced features. We also offer one-time purchases for specific city guides.",
  },
]
