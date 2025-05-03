"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Heart, Clock, BookOpen, Share2, Volume2, Copy, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DuasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])
  const [recents, setRecents] = useState<number[]>([1, 3, 5])
  const { toast } = useToast()

  // Mock data for duas categories
  const duasCategories = [
    { id: 1, name: "Matin et Soir", count: 12 },
    { id: 2, name: "Avant et Après les Repas", count: 4 },
    { id: 3, name: "Entrer et Sortir", count: 6 },
    { id: 4, name: "Voyage", count: 8 },
    { id: 5, name: "Sommeil et Réveil", count: 7 },
    { id: 6, name: "Protection", count: 10 },
    { id: 7, name: "Pardon", count: 5 },
    { id: 8, name: "Détresse et Difficulté", count: 9 },
    { id: 9, name: "Prière", count: 11 },
    { id: 10, name: "Famille", count: 6 },
  ]

  // Mock data for duas
  const duas = [
    {
      id: 1,
      category: 1,
      name: "Dua du matin",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
      transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la sharika lah",
      translation:
        "Nous sommes entrés dans le matin et le royaume appartient à Allah. Louange à Allah. Il n'y a de divinité qu'Allah, Unique, sans associé.",
      reference: "Muslim",
      benefits: "À réciter une fois le matin pour commencer la journée avec la bénédiction d'Allah.",
    },
    {
      id: 2,
      category: 1,
      name: "Dua du soir",
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلاَّ اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      transliteration: "Amsayna wa amsal mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la sharika lah",
      translation:
        "Nous sommes entrés dans le soir et le royaume appartient à Allah. Louange à Allah. Il n'y a de divinité qu'Allah, Unique, sans associé.",
      reference: "Muslim",
      benefits: "À réciter une fois le soir pour terminer la journée avec la bénédiction d'Allah.",
    },
    {
      id: 3,
      category: 5,
      name: "Dua avant de dormir",
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      transliteration: "Bismika Allahumma amootu wa ahya",
      translation: "En Ton nom, ô Allah, je meurs et je vis.",
      reference: "Al-Bukhari",
      benefits: "Protège pendant le sommeil et aide à se réveiller en bonne santé.",
    },
    {
      id: 4,
      category: 6,
      name: "Dua de protection",
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "A'udhu bikalimatillahit-tamati min sharri ma khalaq",
      translation: "Je cherche refuge dans les paroles parfaites d'Allah contre le mal de ce qu'Il a créé.",
      reference: "Muslim",
      benefits: "Offre une protection contre tout mal et danger.",
    },
    {
      id: 5,
      category: 2,
      name: "Dua avant de manger",
      arabic: "بِسْمِ اللَّهِ",
      transliteration: "Bismillah",
      translation: "Au nom d'Allah",
      reference: "Abu Dawud",
      benefits: "Bénit la nourriture et protège contre les méfaits de celle-ci.",
    },
  ]

  // Filter duas based on search term
  const filteredDuas = duas.filter(
    (dua) =>
      dua.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dua.translation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get recent duas
  const recentDuas = duas.filter((dua) => recents.includes(dua.id))

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
      toast({
        title: "Retiré des favoris",
        description: "Cette dua a été retirée de vos favoris.",
      })
    } else {
      setFavorites([...favorites, id])
      toast({
        title: "Ajouté aux favoris",
        description: "Cette dua a été ajoutée à vos favoris.",
      })
    }
  }

  // Add to recents
  const addToRecents = (id: number) => {
    if (!recents.includes(id)) {
      const newRecents = [id, ...recents].slice(0, 5) // Keep only 5 most recent
      setRecents(newRecents)
    }
  }

  // Copy dua text
  const copyDua = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copié",
      description: "Le texte a été copié dans le presse-papiers.",
    })
  }

  // Render a single dua card
  const renderDuaCard = (dua: (typeof duas)[0]) => {
    const isFavorite = favorites.includes(dua.id)

    return (
      <Card key={dua.id} className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium">{dua.name}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className={isFavorite ? "text-red-500" : "text-gray-400"}
              onClick={() => toggleFavorite(dua.id)}
            >
              <Heart className={isFavorite ? "fill-current" : ""} size={18} />
            </Button>
          </div>
          <div className="text-xs text-gray-500 flex items-center">
            <BookOpen size={12} className="mr-1" />
            {duasCategories.find((cat) => cat.id === dua.category)?.name} • {dua.reference}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-right">
              <p className="text-2xl font-arabic leading-relaxed mb-2">{dua.arabic}</p>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400" onClick={() => copyDua(dua.arabic)}>
                  <Copy size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Volume2 size={16} />
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 italic mb-1">{dua.transliteration}</p>
              <p className="text-sm text-gray-800">{dua.translation}</p>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                <Star size={12} className="inline mr-1 text-[#0F4C75]" />
                {dua.benefits}
              </p>
            </div>

            <div className="flex justify-end">
              <Button variant="ghost" size="sm" className="text-[#0F4C75]">
                <Share2 size={16} className="mr-1" />
                Partager
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Duas et Invocations</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Rechercher une dua..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Clock size={18} className="mr-2 text-[#0F4C75]" />
                  Récemment consultées
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentDuas.length > 0 ? (
                  <ul className="space-y-2">
                    {recentDuas.map((dua) => (
                      <li key={dua.id} className="text-sm hover:text-[#0F4C75] cursor-pointer">
                        {dua.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">Aucune dua récemment consultée</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Catégories</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {duasCategories.map((category) => (
                    <li
                      key={category.id}
                      className="flex justify-between items-center text-sm hover:text-[#0F4C75] cursor-pointer"
                    >
                      <span>{category.name}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                        {category.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="favorites">Favoris</TabsTrigger>
              <TabsTrigger value="daily">Quotidiennes</TabsTrigger>
            </TabsList>
          </Tabs>

          {searchTerm && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">
                Résultats pour "{searchTerm}" ({filteredDuas.length})
              </h2>
            </div>
          )}

          <div>
            {filteredDuas.length > 0 ? (
              filteredDuas.map((dua) => renderDuaCard(dua))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune dua trouvée pour cette recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
