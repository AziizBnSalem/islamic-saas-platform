"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1.25, 100))
    }, 100)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  if (!isLoading || !mounted) return null

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="relative w-full max-w-md px-4 z-10">
        {/* Mosque Icon with Enhanced Animation */}
        <motion.div 
          className="mb-12 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-300" />
            <svg
              width="140"
              height="140"
              viewBox="0 0 200 200"
              className="relative text-emerald-600 dark:text-emerald-400 transform-gpu"
            >
              <path d="M100 10L130 40H70L100 10Z" fill="currentColor" className="animate-pulse" />
              <path d="M50 40H150V60H50V40Z" fill="currentColor" />
              <path d="M40 60H160V160H140V120C140 115.858 136.642 112.5 132.5 112.5H67.5C63.358 112.5 60 115.858 60 120V160H40V60Z" fill="currentColor" />
              <path d="M60 160H140V180H60V160Z" fill="currentColor" />
              <circle cx="100" cy="85" r="18" fill="currentColor" className="animate-pulse" />
            </svg>
          </div>
        </motion.div>

        {/* Text Content with Staggered Animation */}
        <motion.div 
          className="text-center space-y-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            IslamiC
          </h1>
          <div className="space-y-3">
            <p className="text-2xl font-arabic text-emerald-700 dark:text-emerald-300">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
            <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80">
              Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux
            </p>
          </div>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="h-2 w-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-4 text-center text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {progress < 100 ? `Chargement... ${Math.round(progress)}%` : 'بارك الله فيك'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
