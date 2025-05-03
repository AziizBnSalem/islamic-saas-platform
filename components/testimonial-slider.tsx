"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    content:
      "Cette plateforme a transformé la façon dont notre école islamique fonctionne. La gestion des élèves et des cours est devenue tellement plus simple et efficace.",
    author: "Ahmed Benali",
    role: "Directeur d'école islamique",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    content:
      "J'utilise l'application tous les jours pour mes prières et pour lire le Coran. L'interface est intuitive et les ressources sont très riches.",
    author: "Fatima Zahra",
    role: "Utilisatrice",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    content:
      "Le chatbot est incroyablement précis dans ses réponses. Il m'a aidé à approfondir ma compréhension de nombreux aspects de l'Islam.",
    author: "Youssef Kadiri",
    role: "Étudiant en théologie",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    content:
      "L'abonnement premium vaut vraiment le coup. Les livres exclusifs et les échanges avec les experts ont enrichi ma pratique spirituelle.",
    author: "Amina Toure",
    role: "Abonnée Premium",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoplay, currentIndex])

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setAutoplay(false)
  }

  const handleSlideInteraction = () => {
    setAutoplay(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <Card className="border-none shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-islamic-200 mb-4" />
                <p className="text-lg text-gray-700 mb-6 italic">"{testimonials[currentIndex].content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-islamic-100">
                    <img
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].author}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonials[currentIndex].author}</h4>
                    <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-islamic-600 w-6" : "bg-gray-300 hover:bg-islamic-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white border-gray-200 shadow-md hidden md:flex hover:bg-islamic-50 hover:text-islamic-600 transition-colors duration-300"
        onClick={() => {
          prevSlide()
          handleSlideInteraction()
        }}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white border-gray-200 shadow-md hidden md:flex hover:bg-islamic-50 hover:text-islamic-600 transition-colors duration-300"
        onClick={() => {
          nextSlide()
          handleSlideInteraction()
        }}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
