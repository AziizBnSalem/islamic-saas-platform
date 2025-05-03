"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function IslamicCalendar() {
  const [currentMonth, setCurrentMonth] = useState("Ramadan")
  const [currentYear, setCurrentYear] = useState(1445)
  const [isChangingMonth, setIsChangingMonth] = useState(false)
  const [direction, setDirection] = useState(0)

  const islamicMonths = [
    "Muharram",
    "Safar",
    "Rabi al-Awwal",
    "Rabi al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah",
  ]

  const importantDates = [
    { day: 1, month: "Muharram", event: "Nouvel An Islamique", description: "Premier jour de l'année islamique" },
    { day: 10, month: "Muharram", event: "Achoura", description: "Jour de jeûne recommandé" },
    { day: 12, month: "Rabi al-Awwal", event: "Mawlid", description: "Commémoration de la naissance du Prophète ﷺ" },
    { day: 27, month: "Rajab", event: "Laylat al-Isra wal Mi'raj", description: "Voyage nocturne du Prophète ﷺ" },
    { day: 15, month: "Sha'ban", event: "Laylat al-Bara'ah", description: "Nuit de l'absolution" },
    { day: 1, month: "Ramadan", event: "Début du Ramadan", description: "Premier jour du mois de jeûne" },
    { day: 27, month: "Ramadan", event: "Laylat al-Qadr", description: "La Nuit du Destin" },
    { day: 1, month: "Shawwal", event: "Aïd al-Fitr", description: "Fête de la rupture du jeûne" },
    { day: 10, month: "Dhu al-Hijjah", event: "Aïd al-Adha", description: "Fête du sacrifice" },
    { day: 9, month: "Dhu al-Hijjah", event: "Jour d'Arafat", description: "Jour le plus sacré de l'année" },
  ]

  const upcomingEvents = importantDates.filter((date) => date.month === currentMonth)

  const nextMonth = () => {
    setDirection(1)
    setIsChangingMonth(true)
    const currentIndex = islamicMonths.indexOf(currentMonth)
    setTimeout(() => {
      if (currentIndex === islamicMonths.length - 1) {
        setCurrentMonth(islamicMonths[0])
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(islamicMonths[currentIndex + 1])
      }
      setIsChangingMonth(false)
    }, 300)
  }

  const prevMonth = () => {
    setDirection(-1)
    setIsChangingMonth(true)
    const currentIndex = islamicMonths.indexOf(currentMonth)
    setTimeout(() => {
      if (currentIndex === 0) {
        setCurrentMonth(islamicMonths[islamicMonths.length - 1])
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(islamicMonths[currentIndex - 1])
      }
      setIsChangingMonth(false)
    }, 300)
  }

  return (
    <Card className="backdrop-blur-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 glass-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMonth}
            className="bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors duration-300 ripple"
            aria-label="Mois précédent"
            disabled={isChangingMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentMonth}-${currentYear}`}
              initial={{ opacity: 0, x: direction * 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{currentMonth}</h3>
              <p className="text-gray-500 dark:text-gray-400">{currentYear} Hijri</p>
            </motion.div>
          </AnimatePresence>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors duration-300 ripple"
            aria-label="Mois suivant"
            disabled={isChangingMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
              Événements Importants
            </h4>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMonth}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={index}
                        className="p-4 bg-emerald-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer ripple"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02, rotateX: 3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => alert(`Détails de l'événement: ${event.event}`)}
                        role="button"
                        aria-label={`Voir détails de ${event.event}`}
                      >
                        <div className="flex items-start">
                          <div className="bg-emerald-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-medium mr-3">
                            {event.day}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white">{event.event}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">Aucun événement majeur ce mois-ci</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-emerald-600" />
              Actes Recommandés
            </h4>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMonth}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {currentMonth === "Ramadan" && (
                  <>
                    <motion.div
                      className="p-4 bg-emerald-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer ripple"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, rotateX: 3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => alert("Détails: Jeûne pendant le Ramadan")}
                      role="button"
                      aria-label="Détails du jeûne"
                    >
                      <h5 className="font-semibold text-gray-900 dark:text-white">Jeûne</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Observe autant que possible le jeûne du lever au coucher du soleil.
                      </p>
                    </motion.div>
                    <motion.div
                      className="p-4 bg-emerald-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer ripple"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, rotateX: 3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => alert("Détails: Prières de Tarawih")}
                      role="button"
                      aria-label="Détails des prières de Tarawih"
                    >
                      <h5 className="font-semibold text-gray-900 dark:text-white">Tarawih</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Prières spéciales effectuées chaque nuit après la prière d'Isha.
                      </p>
                    </motion.div>
                    <motion.div
                      className="p-4 bg-emerald-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer ripple"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, rotateX: 3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => alert("Détails: Lecture du Coran")}
                      role="button"
                      aria-label="Détails de la lecture du Coran"
                    >
                      <h5 className="font-semibold text-gray-900 dark:text-white">Lecture du Coran</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Essayez de compléter la lecture du Coran entier pendant ce mois béni.
                      </p>
                    </motion.div>
                  </>
                )}

                {currentMonth === "Dhu al-Hijjah" && (
                  <>
                    <motion.div
                      className="p-4 bg-emerald-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer ripple"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, rotateX: 3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => alert("Détails: Jeûne des 9 premiers jours")}
                      role="button"
                      aria-label="Détails du jeûne des 9 premiers jours"
                    >
                      <h5 className="font-semibold text-gray-900 dark:text-white">Jeûne des 9 premiers jours</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Il est recommandé de jeûner pendant les 9 premiers jours, surtout le jour d'Arafat.
                      </p>
                    </motion.div>
                    <motion.div
                      className="p-4 bg-emerald-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer ripple"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, rotateX: 3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => alert("Détails: Takbir")}
                      role="button"
                      aria-label="Détails du Takbir"
                    >
                      <h5 className="font-semibold text-gray-900 dark:text-white">Takbir</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Réciter le Takbir (Allahu Akbar) du 1er au 13 Dhul-Hijjah.
                      </p>
                    </motion.div>
                  </>
                )}

                {currentMonth === "Muharram" && (
                  <motion.div
                    className="p-4 bg-emerald-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer ripple"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02, rotateX: 3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert("Détails: Jeûne d'Achoura")}
                    role="button"
                    aria-label="Détails du jeûne d'Achoura"
                  >
                    <h5 className="font-semibold text-gray-900 dark:text-white">Jeûne d'Achoura</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Il est recommandé de jeûner le 9ème et 10ème jour de Muharram.
                    </p>
                  </motion.div>
                )}

                {!["Ramadan", "Dhu al-Hijjah", "Muharram"].includes(currentMonth) && (
                  <motion.div
                    className="p-4 bg-emerald-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer ripple"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02, rotateX: 3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert("Détails: Actes généraux de dévotion")}
                    role="button"
                    aria-label="Détails des actes généraux de dévotion"
                  >
                    <h5 className="font-semibold text-gray-900 dark:text-white">Actes généraux de dévotion</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Récitation du Coran, prières surérogatoires, dhikr et charité sont recommandés tout au long de l'année.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}