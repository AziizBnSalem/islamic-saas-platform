"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Bookmark, Share2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define interfaces for type safety
interface Verse {
  number: number
  arabic: string
  translation: string
  transliteration: string
  tafsir: string
}

interface SurahData {
  surah: string
  surahNumber: number
  totalVerses: number
  verses: Verse[]
}

export default function QuranReader({ surahData }: { surahData: SurahData }) {
  const [fontSize, setFontSize] = useState("text-2xl")
  const [showTranslation, setShowTranslation] = useState(true)
  const [showTransliteration, setShowTransliteration] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  const versesPerPage = 3
  const totalPages = Math.ceil(surahData.verses.length / versesPerPage)
  const currentVerses = surahData.verses.slice(
    currentPage * versesPerPage,
    (currentPage + 1) * versesPerPage
  )

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{surahData.surah}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sourate {surahData.surahNumber} • {surahData.totalVerses} versets
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFontSize("text-xl")}>Petite taille</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFontSize("text-2xl")}>Taille moyenne</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFontSize("text-3xl")}>Grande taille</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowTranslation(!showTranslation)}>
                {showTranslation ? "Masquer" : "Afficher"} la traduction
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowTransliteration(!showTransliteration)}>
                {showTransliteration ? "Masquer" : "Afficher"} la translittération
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <motion.div
        className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: currentPage % 2 === 0 ? 0 : 10 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-white dark:from-gray-700 dark:to-gray-800 opacity-20"
          style={{ transform: "translateZ(-20px)" }}
        />
        <div className="space-y-8">
          {currentVerses.map((verse) => (
            <motion.div
              key={verse.number}
              className="pb-6 border-b border-gray-100 last:border-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: verse.number * 0.1 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="bg-emerald-100 text-emerald-800 rounded-full h-8 w-8 flex items-center justify-center font-medium">
                  {verse.number}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-600">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-600">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className={`text-right font-arabic leading-loose ${fontSize} mb-3`}>{verse.arabic}</div>

              {showTransliteration && (
                <div className="text-gray-600 dark:text-gray-400 italic mb-2">{verse.transliteration}</div>
              )}

              {showTranslation && <div className="text-gray-800 dark:text-gray-200">{verse.translation}</div>}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="gap-2"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Page précédente
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Page suivante
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}