"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function IslamicHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="absolute inset-0 bg-islamic-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-300 opacity-20 blur-3xl dark:bg-emerald-700 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300 opacity-20 blur-3xl dark:bg-emerald-700 pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 shadow-lg hover:scale-105 transition-transform cursor-default">
              Nouvelle Version
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              La Plateforme <span className="text-emerald-600 dark:text-emerald-400">Islamique</span> Ultime
            </h1>
            <p className="mb-8 max-w-lg text-lg text-gray-600 dark:text-gray-300">
              Une solution tout-en-un pour les écoles, mosquées et individus. Connectez-vous, apprenez et gérez avec aisance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:scale-105 transition-transform min-w-[180px] py-3 ripple glow"
                  aria-label="Commencer gratuitement"
                  role="button"
                >
                  Commencer Gratuitement
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-gray-800 shadow-lg hover:scale-105 transition-transform min-w-[180px] py-3 ripple glow"
                  aria-label="Voir la démo"
                  role="button"
                >
                  Voir la Démo
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-full h-full text-emerald-600 dark:text-emerald-400 opacity-20" viewBox="0 0 100 100">
                <path d="M50,20 A30,30 0 0,1 80,50 A30,30 0 0,1 50,80 A30,30 0 0,1 20,50 A30,30 0 0,1 50,20 M50,30 A20,20 0 0,0 30,50 A20,20 0 0,0 50,70 A20,20 0 0,0 70,50 A20,20 0 0,0 50,30" fill="currentColor" />
              </svg>
            </motion.div>
            <img
              src="images/1.png"
              alt="Plateforme Islamique"
              className="relative z-10 w-full rounded-xl pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}