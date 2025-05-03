"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for surahs
const surahs = [
  { number: 1, name: "Al-Ikhlas", arabicName: "الإخلاص", verses: 4, type: "Mecquoise" },
]

interface SurahListProps {
  onSelectSurah: (surahNumber: number) => void
}

export default function SurahList({ onSelectSurah }: SurahListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredSurahs = surahs.filter((surah) => {
    const matchesSearch =
      surah.name.toLowerCase().includes(searchTerm.toLowerCase()) || surah.number.toString().includes(searchTerm)

    if (filter === "all") return matchesSearch
    return matchesSearch && surah.type.toLowerCase() === filter.toLowerCase()
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher une sourate par nom ou numéro..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            className={filter === "all" ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-50"}
            onClick={() => setFilter("all")}
          >
            Toutes
          </Button>
          <Button
            variant={filter === "mecquoise" ? "default" : "outline"}
            className={filter === "mecquoise" ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-50"}
            onClick={() => setFilter("mecquoise")}
          >
            Mecquoises
          </Button>
          <Button
            variant={filter === "médinoise" ? "default" : "outline"}
            className={filter === "médinoise" ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-50"}
            onClick={() => setFilter("médinoise")}
          >
            Médinoises
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map((surah) => (
          <Button
            key={surah.number}
            variant="ghost"
            className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 hover:bg-emerald-50 transition-all shadow-sm hover:shadow-md text-left w-full"
            onClick={() => {
              console.log('Clicked Surah:', surah.number, surah.name)
              onSelectSurah(surah.number)
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="bg-emerald-100 text-emerald-800 rounded-full h-10 w-10 flex items-center justify-center font-medium mr-3">
                  {surah.number}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{surah.name}</h3>
                  <p className="text-sm text-gray-500">
                    {surah.verses} versets • {surah.type}
                  </p>
                </div>
              </div>
              <div className="text-xl text-gray-700 dark:text-gray-300 font-arabic">{surah.arabicName}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}