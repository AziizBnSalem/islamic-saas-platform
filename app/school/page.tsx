import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Calendar, GraduationCap, FileText, Clock, CheckCircle } from "lucide-react"
import SchoolDashboard from "@/components/school/school-dashboard"
import StudentsList from "@/components/school/students-list"
import CoursesList from "@/components/school/courses-list"

export default function SchoolPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion de l'École Islamique</h1>
          <p className="text-gray-600 mt-2">Gérez efficacement votre école, vos élèves et vos cours</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Rapports
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Users className="mr-2 h-4 w-4" />
            Ajouter un Élève
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Élèves</p>
                <h3 className="text-2xl font-bold mt-1">248</h3>
                <p className="text-xs text-emerald-600 mt-1">+12% ce mois</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Cours Actifs</p>
                <h3 className="text-2xl font-bold mt-1">24</h3>
                <p className="text-xs text-emerald-600 mt-1">+3 nouveaux cours</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Présence</p>
                <h3 className="text-2xl font-bold mt-1">92%</h3>
                <p className="text-xs text-emerald-600 mt-1">+5% vs dernier mois</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Taux de Réussite</p>
                <h3 className="text-2xl font-bold mt-1">87%</h3>
                <p className="text-xs text-emerald-600 mt-1">+2% vs dernier trimestre</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="dashboard">Tableau de Bord</TabsTrigger>
          <TabsTrigger value="students">Élèves</TabsTrigger>
          <TabsTrigger value="courses">Cours</TabsTrigger>
          <TabsTrigger value="exams">Examens</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <SchoolDashboard />
        </TabsContent>

        <TabsContent value="students">
          <StudentsList />
        </TabsContent>

        <TabsContent value="courses">
          <CoursesList />
        </TabsContent>

        <TabsContent value="exams">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des Examens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Examen de Tajwid",
                    date: "15 Juin 2023",
                    time: "10:00 - 12:00",
                    status: "upcoming",
                  },
                  {
                    title: "Examen de Fiqh",
                    date: "22 Juin 2023",
                    time: "14:00 - 16:00",
                    status: "upcoming",
                  },
                  {
                    title: "Examen d'Histoire Islamique",
                    date: "5 Mai 2023",
                    time: "09:00 - 11:00",
                    status: "completed",
                  },
                  {
                    title: "Examen de Mémorisation du Coran",
                    date: "28 Avril 2023",
                    time: "10:00 - 12:00",
                    status: "completed",
                  },
                ].map((exam, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${
                      exam.status === "upcoming" ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{exam.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{exam.date}</span>
                          <Clock className="h-4 w-4 ml-3 mr-1" />
                          <span>{exam.time}</span>
                        </div>
                      </div>
                      {exam.status === "upcoming" ? (
                        <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200">
                          Détails
                        </Button>
                      ) : (
                        <div className="flex items-center text-gray-500">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm">Terminé</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">Planifier un Nouvel Examen</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
