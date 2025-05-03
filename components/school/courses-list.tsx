"use client"

import { useState } from "react"
import { Search, MoreHorizontal, BookOpen, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Introduction au Coran",
    instructor: "Sheikh Ahmed",
    level: "Débutant",
    students: 32,
    duration: "3 mois",
    schedule: "Lundi, Mercredi 10:00-12:00",
    status: "En cours",
  },
  {
    id: 2,
    title: "Tajwid Avancé",
    instructor: "Ustadh Omar",
    level: "Avancé",
    students: 18,
    duration: "4 mois",
    schedule: "Mardi, Jeudi 14:00-16:00",
    status: "En cours",
  },
  {
    id: 3,
    title: "Fiqh pour Débutants",
    instructor: "Dr. Fatima",
    level: "Débutant",
    students: 25,
    duration: "2 mois",
    schedule: "Samedi 09:00-12:00",
    status: "En cours",
  },
  {
    id: 4,
    title: "Histoire Islamique",
    instructor: "Prof. Youssef",
    level: "Intermédiaire",
    students: 22,
    duration: "3 mois",
    schedule: "Lundi, Vendredi 16:00-18:00",
    status: "À venir",
  },
  {
    id: 5,
    title: "Mémorisation du Coran",
    instructor: "Sheikh Khalid",
    level: "Tous niveaux",
    students: 15,
    duration: "6 mois",
    schedule: "Dimanche 08:00-10:00",
    status: "En cours",
  },
]

export default function CoursesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "active") return matchesSearch && course.status === "En cours"
    if (filter === "upcoming") return matchesSearch && course.status === "À venir"

    return matchesSearch
  })

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un cours..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              className={filter === "all" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              onClick={() => setFilter("all")}
            >
              Tous
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              className={filter === "active" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              onClick={() => setFilter("active")}
            >
              En cours
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              className={filter === "upcoming" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              onClick={() => setFilter("upcoming")}
            >
              À venir
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg text-gray-900">{course.title}</h3>
                <p className="text-gray-600 mt-1">Enseignant: {course.instructor}</p>
              </div>
              <Badge
                variant={course.status === "En cours" ? "default" : "outline"}
                className={course.status === "En cours" ? "bg-emerald-500" : "border-amber-500 text-amber-500"}
              >
                {course.status}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen size={16} className="mr-2 text-emerald-600" />
                Niveau: {course.level}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users size={16} className="mr-2 text-emerald-600" />
                {course.students} élèves
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2 text-emerald-600" />
                Durée: {course.duration}
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600">
              <span className="font-medium">Horaire:</span> {course.schedule}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Button variant="outline" size="sm">
                Détails du cours
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Modifier le cours</DropdownMenuItem>
                  <DropdownMenuItem>Voir les élèves</DropdownMenuItem>
                  <DropdownMenuItem>Gérer les ressources</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Ajouter un Nouveau Cours</Button>
      </div>
    </div>
  )
}
