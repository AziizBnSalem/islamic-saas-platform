"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Phone, Star, ExternalLink, Navigation } from "lucide-react"

export default function MosquesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  // Mock data for mosques
  const mosques = [
    {
      id: 1,
      name: "Grande Mosquée de Paris",
      address: "2bis Place du Puits de l'Ermite, 75005 Paris",
      distance: 0.8,
      rating: 4.8,
      prayerTimes: {
        fajr: "05:23",
        dhuhr: "13:05",
        asr: "16:45",
        maghrib: "20:12",
        isha: "21:42",
      },
      phone: "+33 1 45 35 97 33",
      website: "https://www.mosqueedeparis.net",
      facilities: ["Parking", "Wudu", "Women's Section", "Library", "Wheelchair Access"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      name: "Mosquée Omar Ibn Al Khattab",
      address: "85 Boulevard Pasteur, 75015 Paris",
      distance: 1.2,
      rating: 4.6,
      prayerTimes: {
        fajr: "05:25",
        dhuhr: "13:05",
        asr: "16:45",
        maghrib: "20:12",
        isha: "21:42",
      },
      phone: "+33 1 42 50 21 82",
      website: "https://www.mosquee-omar.fr",
      facilities: ["Wudu", "Women's Section", "Quran Classes"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      name: "Mosquée Al Salam",
      address: "13 Rue Georges Auric, 75019 Paris",
      distance: 2.5,
      rating: 4.5,
      prayerTimes: {
        fajr: "05:24",
        dhuhr: "13:05",
        asr: "16:45",
        maghrib: "20:12",
        isha: "21:42",
      },
      phone: "+33 1 40 05 94 22",
      website: "https://www.mosqueealsalam.fr",
      facilities: ["Parking", "Wudu", "Women's Section", "Quran Classes"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      name: "Centre Islamique de Villeneuve-d'Ascq",
      address: "20 Rue des Ormes, 59650 Villeneuve-d'Ascq",
      distance: 3.7,
      rating: 4.7,
      prayerTimes: {
        fajr: "05:22",
        dhuhr: "13:05",
        asr: "16:45",
        maghrib: "20:12",
        isha: "21:42",
      },
      phone: "+33 3 20 91 14 14",
      website: "https://www.mosquee-villeneuve-ascq.com",
      facilities: ["Parking", "Wudu", "Women's Section", "Library", "Quran Classes", "Restaurant"],
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  // Filter mosques based on search term
  const filteredMosques = mosques.filter(
    (mosque) =>
      mosque.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mosque.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get user's location
  const getUserLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      setIsLocating(false)
    }
  }

  // Render stars for ratings
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)
      } else if (i - 0.5 <= rating) {
        stars.push(<Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300" />)
      }
    }
    return stars
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Trouvez une Mosquée</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      placeholder="Rechercher une mosquée..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={getUserLocation}
                    className="w-full bg-[#0F4C75] hover:bg-[#1B262C] flex items-center justify-center"
                    disabled={isLocating}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {isLocating ? "Localisation en cours..." : "Utiliser ma position actuelle"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Distance maximale</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0F4C75] focus:border-transparent">
                      <option value="1">1 km</option>
                      <option value="2">2 km</option>
                      <option value="5" selected>
                        5 km
                      </option>
                      <option value="10">10 km</option>
                      <option value="20">20 km</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Équipements</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="parking"
                          className="h-4 w-4 text-[#0F4C75] focus:ring-[#0F4C75] border-gray-300 rounded"
                        />
                        <label htmlFor="parking" className="ml-2 text-sm text-gray-700">
                          Parking
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="wudu"
                          className="h-4 w-4 text-[#0F4C75] focus:ring-[#0F4C75] border-gray-300 rounded"
                          checked
                        />
                        <label htmlFor="wudu" className="ml-2 text-sm text-gray-700">
                          Espace pour les ablutions
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="women"
                          className="h-4 w-4 text-[#0F4C75] focus:ring-[#0F4C75] border-gray-300 rounded"
                          checked
                        />
                        <label htmlFor="women" className="ml-2 text-sm text-gray-700">
                          Section pour les femmes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="wheelchair"
                          className="h-4 w-4 text-[#0F4C75] focus:ring-[#0F4C75] border-gray-300 rounded"
                        />
                        <label htmlFor="wheelchair" className="ml-2 text-sm text-gray-700">
                          Accès handicapé
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="classes"
                          className="h-4 w-4 text-[#0F4C75] focus:ring-[#0F4C75] border-gray-300 rounded"
                        />
                        <label htmlFor="classes" className="ml-2 text-sm text-gray-700">
                          Cours de Coran
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Appliquer les filtres</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="list" className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="map">Carte</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <div className="space-y-6">
                {filteredMosques.length > 0 ? (
                  filteredMosques.map((mosque) => (
                    <Card key={mosque.id} className="overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img
                            src={mosque.image || "/placeholder.svg"}
                            alt={mosque.name}
                            className="h-48 w-full object-cover md:h-full"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{mosque.name}</h3>
                              <div className="flex items-center mt-1">
                                <div className="flex mr-2">{renderStars(mosque.rating)}</div>
                                <span className="text-sm text-gray-600">{mosque.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center bg-blue-50 text-[#0F4C75] px-2 py-1 rounded-md">
                              <MapPin size={14} className="mr-1" />
                              <span className="text-sm font-medium">{mosque.distance} km</span>
                            </div>
                          </div>

                          <div className="mt-3 flex items-start text-sm text-gray-600">
                            <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0 text-gray-400" />
                            <span>{mosque.address}</span>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Horaires des prières</h4>
                            <div className="grid grid-cols-5 gap-2 text-center">
                              {Object.entries(mosque.prayerTimes).map(([prayer, time]) => (
                                <div key={prayer} className="bg-gray-50 rounded-md px-2 py-1">
                                  <div className="text-xs text-gray-500 capitalize">{prayer}</div>
                                  <div className="text-sm font-medium">{time}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {mosque.facilities.map((facility, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {facility}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex space-x-3">
                              <Button variant="outline" size="sm" className="flex items-center">
                                <Phone size={14} className="mr-1" />
                                Appeler
                              </Button>
                              <Button variant="outline" size="sm" className="flex items-center">
                                <ExternalLink size={14} className="mr-1" />
                                Site web
                              </Button>
                            </div>
                            <Button className="bg-[#0F4C75] hover:bg-[#1B262C] flex items-center">
                              <Navigation size={14} className="mr-1" />
                              Itinéraire
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Aucune mosquée trouvée pour cette recherche.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="map">
              <Card>
                <CardContent className="p-0">
                  <div className="h-[600px] bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-500 mb-2">Carte interactive</p>
                      <p className="text-sm text-gray-400">
                        (Dans une implémentation réelle, une carte Google Maps ou OpenStreetMap serait affichée ici)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
