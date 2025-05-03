"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Bookmark, PlayCircle } from "lucide-react"
import QuranReader from "@/components/quran/quran-reader"
import SurahList from "@/components/quran/surah-list"
import { useRouter } from "next/navigation"

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

// Mock data for surahs
const surahsData: SurahsData = {
  1: {
    surah: "Al-Fatiha",
    surahNumber: 1,
    totalVerses: 7,
    type: "Mecquoise",
    arabicName: "الفاتحة",
    verses: [
      {
        number: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux.",
        transliteration: "Bismillahi r-rahmani r-raheem",
        tafsir: "Cette ouverture invoque la miséricorde divine, établissant le ton de la sourate."
      },
      {
        number: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "Louange à Allah, Seigneur de l'univers.",
        transliteration: "Al hamdu lillahi rabbil 'alamin",
        tafsir: "Exprime la gratitude envers Allah, Créateur de tous les mondes."
      },
      {
        number: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "Le Tout Miséricordieux, le Très Miséricordieux,",
        transliteration: "Ar-Rahman ar-Raheem",
        tafsir: "Met en avant les attributs de miséricorde d'Allah."
      },
      {
        number: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Maître du Jour de la rétribution.",
        transliteration: "Maliki yawmid-din",
        tafsir: "Affirme la souveraineté d'Allah sur le Jour du Jugement."
      },
      {
        number: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "C'est Toi [Seul] que nous adorons, et c'est Toi [Seul] dont nous implorons secours.",
        transliteration: "Iyyaka na'budu wa iyyaka nasta'in",
        tafsir: "Déclare l'adoration exclusive d'Allah et la dépendance envers Lui."
      },
      {
        number: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translation: "Guide-nous dans le droit chemin,",
        transliteration: "Ihdinas-siratal mustaqim",
        tafsir: "Une supplication pour la guidance divine."
      },
      {
        number: 7,
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translation: "Le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.",
        transliteration: "Siratal-ladhina an'amta 'alayhim, ghayril-maghdubi 'alayhim wa lad-dallin",
        tafsir: "Précise le chemin des bénis, distinct des égarés."
      },
    ],
    audio: {
      reciter: "Sheikh Mishary Rashid Alafasy",
      url: "/audio/al-fatiha.mp3"
    }
  }
}

export default function QuranHomePage() {
  const router = useRouter()
  const [selectedSurah, setSelectedSurah] = useState<Surah>(surahsData[1])
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7])

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
                      <div className="font-medium text-gray-900 dark:text-white">Al-Fatiha</div>
                      <div className="text-xs text-gray-500">Versets 1-7</div>
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
                      <div className="font-medium text-gray-900 dark:text-white">Al-Fatiha</div>
                      <div className="text-xs text-gray-500">Versets 1-7</div>
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

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Toutes les Sourates</h2>
        <SurahList onSelectSurah={(surahNumber) => {
          setSelectedSurah(surahsData[surahNumber] || surahsData[1])
          router.push(`/quran/${surahNumber}`)
        }} />
      </div>
    </motion.div>
  )
}