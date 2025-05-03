"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

export default function MobileAppShowcase() {
  const [activeScreen, setActiveScreen] = useState(0)

  const screens = [
    {
      id: 1,
      title: "Écran d'accueil",
      image: "/placeholder.svg?height=600&width=300",
    },
    {
      id: 2,
      title: "Prières",
      image: "/placeholder.svg?height=600&width=300",
    },
    {
      id: 3,
      title: "Coran",
      image: "/placeholder.svg?height=600&width=300",
    },
    {
      id: 4,
      title: "Communauté",
      image: "/placeholder.svg?height=600&width=300",
    },
  ]

  return (
    <div className="relative">
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          {/* Phone frame */}
          <motion.div
            className="relative w-[280px] h-[570px] bg-gray-900 rounded-[40px] p-3 shadow-xl"
            animate={{ rotate: [0, 1, 0, -1, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl z-10"></div>
            <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
              {/* Screen content */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeScreen}
                  src={screens[activeScreen].image || "/placeholder.svg"}
                  alt={screens[activeScreen].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Reflection effect */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-white/20 to-transparent rounded-[40px] pointer-events-none"></div>
        </div>
      </motion.div>

      {/* Screen selector */}
      <div className="flex justify-center mt-8 gap-2">
        {screens.map((screen, index) => (
          <Card
            key={screen.id}
            className={`p-2 cursor-pointer transition-all duration-300 hover-lift ${
              activeScreen === index ? "bg-islamic-100 border-islamic-300" : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setActiveScreen(index)}
          >
            <motion.span
              className={`text-sm ${activeScreen === index ? "text-islamic-700 font-medium" : "text-gray-600"}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {screen.title}
            </motion.span>
          </Card>
        ))}
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute -bottom-10 -left-10 w-20 h-20 bg-islamic-100 rounded-full opacity-70"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-5 -right-5 w-16 h-16 bg-islamic-200 rounded-full opacity-60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
    </div>
  )
}
