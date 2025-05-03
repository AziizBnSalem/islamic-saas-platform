"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IslamicHero } from "@/components/islamic-hero"
import { ChevronRight } from "lucide-react"
import PrayerTimesWidget from "@/components/prayer-times-widget"
import IslamicCalendar from "@/components/islamic-calendar"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      title: "Gestion d'École",
      description: "Gérez facilement les étudiants, les cours, les présences et les paiements.",
      icon: "🏫",
      href: "/school",
    },
    {
      title: "Ressources Religieuses",
      description: "Accédez au Coran, aux hadiths et à d'autres ressources islamiques.",
      icon: "📚",
      href: "/quran",
    },
    {
      title: "Chatbot Islamique",
      description: "Posez des questions sur l'Islam et obtenez des réponses instantanées.",
      icon: "💬",
      href: "/chat",
    },
    {
      title: "Communauté",
      description: "Connectez-vous avec d'autres musulmans et partagez vos connaissances.",
      icon: "👥",
      href: "/social",
    },
    {
      title: "Outils de Prière",
      description: "Horaires de prière, qibla, tasbeeh et plus encore.",
      icon: "🕌",
      href: "/qibla",
    },
    {
      title: "Zakat & Charité",
      description: "Calculez votre zakat et gérez vos dons caritatifs.",
      icon: "💰",
      href: "/zakat",
    },
  ]

  const stats = [
    { value: "500+", label: "Écoles" },
    { value: "50k+", label: "Utilisateurs" },
    { value: "100+", label: "Pays" },
    { value: "1M+", label: "Prières suivies" },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <motion.div style={{ scale, opacity }} className="relative z-10">
        <IslamicHero />
        <motion.div
          className="absolute inset-0 bg-islamic-pattern opacity-5 pointer-events-none"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:scale-105 transition-transform cursor-default">
              Fonctionnalités
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Votre Plateforme Islamique Tout-en-Un
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Découvrez une suite complète d'outils conçus pour enrichir votre foi et connecter la communauté musulmane mondiale.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={feature.href} className="block h-full">
                  <Card
                    className="h-full bg-white/80 dark:bg-gray-800/80 glass-card shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ripple"
                    aria-label={`Naviguer vers ${feature.title}`}
                    role="link"
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl dark:bg-emerald-900">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300 flex-grow">{feature.description}</p>
                      <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-400 group">
                        <span className="mr-2 text-sm font-medium group-hover:underline">Découvrir</span>
                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-700 dark:to-emerald-900">
        <motion.div
          className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-white">{stat.value}</div>
                <div className="mt-2 text-emerald-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Times & Calendar Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 shadow-lg hover:scale-105 transition-transform cursor-default">
              Outils Spirituels
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Restez Connecté à Votre Foi
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Accédez à des outils précis pour la prière et le calendrier islamique, conçus pour enrichir votre pratique quotidienne.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.8 }}
            >
              <PrayerTimesWidget />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.8 }}
            >
              <IslamicCalendar />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-emerald-700 dark:to-emerald-900">
        <motion.div
          className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Rejoignez la Communauté Islamique Mondiale
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-emerald-100">
              Transformez votre pratique religieuse avec notre plateforme intuitive et connectez-vous avec des millions d'utilisateurs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg hover:scale-105 transition-transform min-w-[200px] py-3 ripple glow"
                  aria-label="Commencer gratuitement"
                  role="button"
                >
                  Commencer Gratuitement
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-emerald-700 shadow-lg hover:scale-105 transition-transform min-w-[200px] py-3 ripple glow"
                  aria-label="Contacter l'équipe"
                  role="button"
                >
                  Contacter l'Équipe
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}