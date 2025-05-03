"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for students
const students = [
  {
    id: 1,
    name: "Ahmed Benali",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 12,
    level: "Débutant",
    class: "6A",
    attendance: "95%",
    performance: "Excellent",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 11,
    level: "Intermédiaire",
    class: "5B",
    attendance: "98%",
    performance: "Très Bien",
  },
  {
    id: 3,
    name: "Youssef Kadiri",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 13,
    level: "Avancé",
    class: "7C",
    attendance: "92%",
    performance: "Bien",
  },
  {
    id: 4,
    name: "Amina Toure",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 10,
    level: "Débutant",
    class: "4A",
    attendance: "90%",
    performance: "Satisfaisant",
  },
  {
    id: 5,
    name: "Omar Bensouda",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 14,
    level: "Avancé",
    class: "8B",
    attendance: "97%",
    performance: "Excellent",
  },
]

export default function StudentsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    // @ts-ignore - Dynamic property access
    const aValue = a[sortField]
    // @ts-ignore - Dynamic property access
    const bValue = b[sortField]

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un élève..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filtrer
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                  Nom
                  {sortField === "name" &&
                    (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("age")}>
                  Âge
                  {sortField === "age" &&
                    (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("level")}>
                  Niveau
                  {sortField === "level" &&
                    (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("class")}>
                  Classe
                  {sortField === "class" &&
                    (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("attendance")}>
                  Présence
                  {sortField === "attendance" &&
                    (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("performance")}>
                  Performance
                  {sortField === "performance" &&
                    (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <img src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    </Avatar>
                    <span className="font-medium text-gray-900">{student.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{student.age} ans</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      student.level === "Débutant"
                        ? "bg-blue-100 text-blue-800"
                        : student.level === "Intermédiaire"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {student.level}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{student.class}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{student.attendance}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      student.performance === "Excellent"
                        ? "bg-emerald-100 text-emerald-800"
                        : student.performance === "Très Bien"
                          ? "bg-green-100 text-green-800"
                          : student.performance === "Bien"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {student.performance}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuItem>Envoyer un message</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Affichage de {sortedStudents.length} élèves sur {students.length}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Précédent
          </Button>
          <Button variant="outline" size="sm" disabled>
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}
