"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Bookmark, PlayCircle } from "lucide-react"
import QuranReader from "@/components/quran/quran-reader"
import SurahList from "@/components/quran/surah-list"
import { useRouter, useParams } from "next/navigation"

// Define interfaces for type safety
interface Verse {
  number: number
  arabic: string
  translation: string
  transliteration: string
  tafsir: string
}

interface Audio {
  reciter: string
  url: string
}

interface Surah {
  surah: string
  surahNumber: number
  totalVerses: number
  type: string
  arabicName: string
  verses: Verse[]
  audio: Audio
}

interface SurahsData {
  [key: number]: Surah
}

// Mock data for surahs (using Surah Al-Ikhlas)
const surahsData: SurahsData = {
  112: {
    surah: "Al-Ikhlas",
    surahNumber: 112,
    totalVerses: 4,
    type: "Mecquoise",
    arabicName: "الإخلاص",
    verses: [
      {
        number: 1,
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        translation: "Dis : Il est Allah, Unique.",
        transliteration: "Qul huwa Allahu ahad",
        tafsir: "Affirme l'unicité absolue d'Allah, rejetant toute association."
      },
      {
        number: 2,
        arabic: "اللَّهُ الصَّمَدُ",
        translation: "Allah, le Seul à être imploré pour ce que nous désirons.",
        transliteration: "Allahu as-samad",
        tafsir: "Décrit Allah comme l'Éternel, sur qui tous dépendent."
      },
      {
        number: 3,
        arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        translation: "Il n’a jamais engendré, n’a pas été engendré non plus.",
        transliteration: "Lam yalid walam yulad",
        tafsir: "Négation de toute idée de filiation ou d'origine pour Allah."
      },
      {
        number: 4,
        arabic: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
        translation: "Et nul n’est égal à Lui.",
        transliteration: "Walam yakun lahu kufuwan ahad",
        tafsir: "Confirme qu'Allah n'a aucun égal ou semblable."
      },
    ],
    audio: {
      reciter: "Sheikh Mishary Rashid Alafasy",
      url: "/audio/al-ikhlas.mp3"
    }
  }
}

export default function QuranSlugPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [selectedSurah, setSelectedSurah] = useState<Surah>(surahsData[112])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7])

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    const surahNumber = typeof slug === 'string' ? parseInt(slug) : NaN
    console.log('Slug:', slug, 'Parsed Surah Number:', surahNumber)
    if (!isNaN(surahNumber) && surahsData[surahNumber]) {
      setSelectedSurah(surahsData[surahNumber])
      console.log('Selected Surah:', surahsData[surahNumber].surah)
    } else {
      setSelectedSurah(surahsData[112]) // Default to Al-Ikhlas
      setError('Sourate non trouvée. Affichage d’Al-Ikhlas par défaut.')
      router.push('/quran/112')
      console.log('Defaulted to Al-Ikhlas')
    }
    setIsLoading(false)
  }, [slug, router])

  return (
    <motion.div
      style={{ scale, opacity }}
      className="container mx-auto px-4 py-8 bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center"
      >
        Le Saint Coran
      </motion.h1>

      {isLoading ? (
        <div className="text-center text-gray-600 dark:text-gray-400">Chargement...</div>
      ) : error ? (
        <div className="text-center text-red-600 dark:text-red-400">{error}</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/4"
          >
            <Card className="mb-6 shadow-lg">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Rechercher dans le Coran..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 shadow-lg">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Dernières lectures</h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between hover:bg-emerald-50 p-2 rounded-md transition-colors">
                    <div className="flex items-center">
                      <BookOpen size={16} className="text-emerald-600 mr-2" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Al-Ikhlas</div>
                        <div className="text-xs text-gray-500">Versets 1-4</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Aujourd'hui</div>
                  </li>
                </ul>
                <Button variant="ghost" className="w-full mt-3 text-emerald-600 hover:text-emerald-700">
                  Voir tout l'historique
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Signets</h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between hover:bg-emerald-50 p-2 rounded-md transition-colors">
                    <div className="flex items-center">
                      <Bookmark size={16} className="text-emerald-600 mr-2" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Al-Ikhlas</div>
                        <div className="text-xs text-gray-500">Versets 1-4</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Favori</div>
                  </li>
                </ul>
                <Button variant="ghost" className="w-full mt-3 text-emerald-600 hover:text-emerald-700">
                  Gérer les signets
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-3/4"
          >
            <Tabs defaultValue="read" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-emerald-100 rounded-lg p-1">
                <TabsTrigger value="read" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md">Lire</TabsTrigger>
                <TabsTrigger value="listen" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md">Écouter</TabsTrigger>
                <TabsTrigger value="tafsir" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md">Tafsir</TabsTrigger>
              </TabsList>

              <TabsContent value="read">
                <Card className="shadow-xl">
                  <CardContent className="p-6">
                    <QuranReader surahData={selectedSurah} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="listen">
                <Card className="shadow-xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Récitations du Coran</h2>
                    <div className="flex items-center p-3 border rounded-md hover:bg-emerald-50 transition-colors">
                      <PlayCircle size={40} className="text-emerald-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{selectedSurah.surah}</div>
                        <div className="text-sm text-gray-500">{selectedSurah.audio.reciter}</div>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                      Voir toutes les récitations
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tafsir">
                <Card className="shadow-xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tafsir (Exégèse du Coran)</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Exégèse de {selectedSurah.surah} par des savants reconnus.
                    </p>
                    <div className="space-y-4">
                      {selectedSurah.verses.map((verse) => (
                        <div key={verse.number} className="p-4 border rounded-md hover:bg-emerald-50 transition-colors">
                          <h3 className="font-medium text-gray-900 dark:text-white">Verset {verse.number}</h3>
                          <p className="text-sm text-gray-500">{verse.tafsir}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <h3 className="font-medium text-amber-800 mb-2">Fonctionnalité Premium</h3>
                      <p className="text-sm text-amber-700 mb-3">
                        Accédez à des tafsirs complets avec un abonnement premium.
                      </p>
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white">Débloquer le Tafsir Premium</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Toutes les Sourates</h2>
        <SurahList onSelectSurah={(surahNumber) => {
          console.log('Selecting Surah:', surahNumber)
          setSelectedSurah(surahsData[surahNumber] || surahsData[112])
          router.push(`/quran/${surahNumber}`)
        }} />
      </div>
    </motion.div>
  )
}