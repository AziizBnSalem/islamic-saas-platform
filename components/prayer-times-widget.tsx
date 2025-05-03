"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, ChevronDown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"

export default function PrayerTimesWidget() {
  const [location, setLocation] = useState("Paris, France")
  const [date, setDate] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [activeTab, setActiveTab] = useState("today")
  const [isLoading, setIsLoading] = useState(true)

  const prayerTimes = [
    { name: "Fajr", time: "05:23", status: "passed" },
    { name: "Sunrise", time: "06:52", status: "passed" },
    { name: "Dhuhr", time: "12:30", status: "current" },
    { name: "Asr", time: "15:45", status: "upcoming" },
    { name: "Maghrib", time: "18:12", status: "upcoming" },
    { name: "Isha", time: "19:42", status: "upcoming" },
  ]

  const weeklyPrayerTimes = [
    {
      day: "Lundi",
      date: "3 Juin",
      times: [
        { name: "Fajr", time: "05:22" },
        { name: "Sunrise", time: "06:51" },
        { name: "Dhuhr", time: "12:30" },
        { name: "Asr", time: "15:45" },
        { name: "Maghrib", time: "18:12" },
        { name: "Isha", time: "19:42" },
      ],
    },
    {
      day: "Mardi",
      date: "4 Juin",
      times: [
        { name: "Fajr", time: "05:21" },
        { name: "Sunrise", time: "06:50" },
        { name: "Dhuhr", time: "12:30" },
        { name: "Asr", time: "15:46" },
        { name: "Maghrib", time: "18:13" },
        { name: "Isha", time: "19:43" },
      ],
    },
    {
      day: "Mercredi",
      date: "5 Juin",
      times: [
        { name: "Fajr", time: "05:20" },
        { name: "Sunrise", time: "06:49" },
        { name: "Dhuhr", time: "12:30" },
        { name: "Asr", time: "15:46" },
        { name: "Maghrib", time: "18:14" },
        { name: "Isha", time: "19:44" },
      ],
    },
    {
      day: "Jeudi",
      date: "6 Juin",
      times: [
        { name: "Fajr", time: "05:19" },
        { name: "Sunrise", time: "06:48" },
        { name: "Dhuhr", time: "12:30" },
        { name: "Asr", time: "15:47" },
        { name: "Maghrib", time: "18:15" },
        { name: "Isha", time: "19:45" },
      ],
    },
    {
      day: "Vendredi",
      date: "7 Juin",
      times: [
        { name: "Fajr", time: "05:18" },
        { name: "Sunrise", time: "06:47" },
        { name: "Dhuhr", time: "12:30" },
        { name: "Asr", time: "15:47" },
        { name: "Maghrib", time: "18:16" },
        { name: "Isha", time: "19:46" },
      ],
    },
    {
      day: "Samedi",
      date: "8 Juin",
      times: [
        { name: "Fajr", time: "05:17" },
        { name: "Sunrise", time: "06:46" },
        { name: "Dhuhr", time: "12:30" },
        { name: "Asr", time: "15:48" },
        { name: "Maghrib", time: "18:17" },
        { name: "Isha", time: "19:47" },
      ],
    },
    {
      day: "Dimanche",
      date: "9 Juin",
      times: [
        { name: "Fajr", time: "05:16" },
        { name: "Sunrise", time: "06:45" },
        { name: "Dhuhr", time: "12:30" },
        { name: "Asr", time: "15:48" },
        { name: "Maghrib", time: "18:18" },
        { name: "Isha", time: "19:48" },
      ],
    },
  ]

  useEffect(() => {
    const now = new Date()
    setDate(
      now.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    )
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    setTimeout(() => setIsLoading(false), 1000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <Card className="backdrop-blur-lg shadow-xl">
        <CardContent className="p-0">
          <div className="bg-emerald-600 text-white p-4 animate-pulse">
            <div className="h-6 w-48 bg-white/20 rounded mb-2"></div>
            <div className="h-4 w-32 bg-white/20 rounded"></div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 glass-card">
      <CardContent className="p-0">
        <motion.div
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <Select
                defaultValue={location}
                onValueChange={setLocation}
              >
                <SelectTrigger className="border-none bg-transparent text-white w-auto p-0 h-auto ripple">
                  <SelectValue placeholder={location} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paris, France">Paris, France</SelectItem>
                  <SelectItem value="Lyon, France">Lyon, France</SelectItem>
                  <SelectItem value="Marseille, France">Marseille, France</SelectItem>
                  <SelectItem value="Casablanca, Maroc">Casablanca, Maroc</SelectItem>
                  <SelectItem value="Alger, Algérie">Alger, Algérie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{currentTime}</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-emerald-100 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {date}
          </div>
        </motion.div>

        <Tabs defaultValue="today" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-emerald-100">
            <TabsTrigger
              value="today"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm ripple"
            >
              Aujourd'hui
            </TabsTrigger>
            <TabsTrigger
              value="week"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm ripple"
            >
              Cette Semaine
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              < TabsContent value="today">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 p-4">
                  {prayerTimes.map((prayer, index) => (
                    <motion.div
                      key={prayer.name}
                      className={`p-4 rounded-lg text-center ${
                        prayer.status === "current"
                          ? "bg-emerald-100 text-emerald-600 shadow-inner prayer-active"
                          : "bg-white dark:bg-gray-800"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, rotateX: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="text-sm font-medium">{prayer.name}</div>
                      <div className="text-lg font-semibold mt-1">{prayer.time}</div>
                      {prayer.status === "current" && (
                        <div className="text-xs mt-1 text-emerald-700 font-medium">En cours</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="week">
                <div className="overflow-x-auto p-4">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="bg-emerald-50 dark:bg-gray-700">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Jour</th>
                        {prayerTimes.map((prayer) => (
                          <th key={prayer.name} className="py-3 px-4 text-center text-sm font-medium text-gray-500 dark:text-gray-300">
                            {prayer.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {weeklyPrayerTimes.map((day, index) => (
                        <motion.tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900 dark:text-white">{day.day}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{day.date}</div>
                          </td>
                          {day.times.map((prayer, pIndex) => (
                            <td key={pIndex} className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">
                              {prayer.time}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <div className="p-3 bg-emerald-50 dark:bg-gray-800 flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Méthode de calcul: MWL</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 ripple"
            onClick={() => alert("Paramètres de calcul à venir")}
            aria-label="Ouvrir les paramètres"
          >
            Paramètres <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}