"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCcw, Save, Plus, Minus, Volume2, VolumeX } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TasbeehPage() {
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState(33)
  const [isMuted, setIsMuted] = useState(true)
  const [savedSessions, setSavedSessions] = useState<{ date: string; count: number; dhikr: string }[]>([])
  const [activeTab, setActiveTab] = useState("subhanallah")
  const { toast } = useToast()

  const dhikrTypes = [
    {
      id: "subhanallah",
      arabic: "سُبْحَانَ اللَّهِ",
      transliteration: "Subhan Allah",
      translation: "Gloire à Allah",
      defaultTarget: 33,
    },
    {
      id: "alhamdulillah",
      arabic: "الْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      translation: "Louange à Allah",
      defaultTarget: 33,
    },
    {
      id: "allahuakbar",
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah est le plus grand",
      defaultTarget: 33,
    },
    {
      id: "lailahaillallah",
      arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
      transliteration: "La ilaha illallah",
      translation: "Il n'y a de dieu qu'Allah",
      defaultTarget: 100,
    },
    {
      id: "istighfar",
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      transliteration: "Astaghfirullah",
      translation: "Je demande pardon à Allah",
      defaultTarget: 100,
    },
  ]

  const activeDhikr = dhikrTypes.find((dhikr) => dhikr.id === activeTab) || dhikrTypes[0]

  useEffect(() => {
    // Reset count when changing dhikr type
    setCount(0)
    setTarget(activeDhikr.defaultTarget)
  }, [activeTab, activeDhikr.defaultTarget])

  useEffect(() => {
    // Load saved sessions from localStorage
    const saved = localStorage.getItem("tasbeehSessions")
    if (saved) {
      setSavedSessions(JSON.parse(saved))
    }
  }, [])

  const increment = () => {
    setCount((prev) => {
      const newCount = prev + 1

      // Play sound if not muted
      if (!isMuted) {
        const audio = new Audio("/click.mp3") // This would be a real click sound in production
        audio.play().catch((e) => console.log("Audio play prevented:", e))
      }

      // Show toast when target is reached
      if (newCount === target) {
        toast({
          title: "Objectif atteint!",
          description: `Vous avez complété ${target} répétitions de ${activeDhikr.transliteration}.`,
        })
      }

      return newCount
    })
  }

  const reset = () => {
    setCount(0)
  }

  const saveSession = () => {
    const newSession = {
      date: new Date().toLocaleString(),
      count: count,
      dhikr: activeDhikr.transliteration,
    }

    const updatedSessions = [newSession, ...savedSessions].slice(0, 10) // Keep only last 10 sessions
    setSavedSessions(updatedSessions)
    localStorage.setItem("tasbeehSessions", JSON.stringify(updatedSessions))

    toast({
      title: "Session sauvegardée",
      description: `${count} répétitions de ${activeDhikr.transliteration} enregistrées.`,
    })
  }

  const increaseTarget = () => {
    setTarget((prev) => prev + 33)
  }

  const decreaseTarget = () => {
    setTarget((prev) => Math.max(33, prev - 33))
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Tasbeeh Digital</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <Tabs defaultValue="subhanallah" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5">
                  {dhikrTypes.map((dhikr) => (
                    <TabsTrigger key={dhikr.id} value={dhikr.id}>
                      {dhikr.transliteration}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-arabic mb-4 text-center">{activeDhikr.arabic}</div>
                <div className="text-lg text-gray-600 mb-8 text-center">
                  <div>{activeDhikr.transliteration}</div>
                  <div className="text-sm italic">{activeDhikr.translation}</div>
                </div>

                <div className="flex items-center justify-center mb-8">
                  <div className="text-sm text-gray-500 mr-4">Objectif: {target}</div>
                  <Button variant="outline" size="icon" onClick={decreaseTarget} disabled={target <= 33}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={increaseTarget} className="ml-2">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#0F4C75"
                        strokeWidth="8"
                        strokeDasharray={`${(count / target) * 283} 283`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <div
                    className="relative flex items-center justify-center w-64 h-64 rounded-full bg-white shadow-inner cursor-pointer"
                    onClick={increment}
                  >
                    <div className="text-5xl font-bold text-[#0F4C75]">{count}</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={reset} className="flex items-center">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Réinitialiser
                  </Button>
                  <Button onClick={saveSession} className="bg-[#0F4C75] hover:bg-[#1B262C] flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline" onClick={toggleMute} className="flex items-center">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Sessions récentes</CardTitle>
            </CardHeader>
            <CardContent>
              {savedSessions.length > 0 ? (
                <div className="space-y-4">
                  {savedSessions.map((session, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium">{session.dhikr}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{session.date}</span>
                        <span className="font-medium text-[#0F4C75]">{session.count} fois</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">Aucune session sauvegardée</div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Bienfaits du Dhikr</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p>
                  Le Prophète Muhammad ﷺ a dit: "Il y a deux expressions qui sont légères sur la langue, lourdes dans la
                  balance et aimées par le Miséricordieux: 'Subhan Allah wa bihamdihi, Subhan Allah al-Azim' (Gloire et
                  louange à Allah, Gloire à Allah le Très Grand)."
                </p>
                <p>
                  Le dhikr (l'évocation d'Allah) apporte la tranquillité au cœur, comme Allah dit dans le Coran: "C'est
                  par le rappel d'Allah que les cœurs se tranquillisent." (Sourate Ar-Ra'd, 13:28)
                </p>
                <p>
                  Pratiquer régulièrement le dhikr aide à purifier l'âme, à renforcer la foi et à se rapprocher d'Allah.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
