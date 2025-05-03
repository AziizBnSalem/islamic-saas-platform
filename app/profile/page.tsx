import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import {
  User,
  BookOpen,
  Clock,
  Heart,
  Award,
  Edit,
  Calendar,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Play,
  GraduationCap,
  FileText,
  Book,
  MoreHorizontal,
  SwitchCameraIcon as Switch,
  Badge,
} from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <img src="/placeholder.svg?height=100&width=100" alt="Photo de profil" />
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1 rounded-full">
                    <Edit size={14} />
                  </button>
                </div>

                <h2 className="text-xl font-bold mt-4">Ahmed Benali</h2>
                <p className="text-gray-500">Membre depuis Janvier 2023</p>

                <div className="mt-6 w-full">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Modifier le Profil</Button>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 mr-3" />
                  <span className="text-gray-700">Paris, France</span>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-500 mr-3" />
                  <span className="text-gray-700">ahmed.benali@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="text-gray-500 mr-3" />
                  <span className="text-gray-700">+33 6 12 34 56 78</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 mr-3" />
                  <span className="text-gray-700">Né le 15 Mai 1985</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Abonnement</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-amber-800">Plan Gratuit</span>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      Passer au Premium
                    </Button>
                  </div>
                  <p className="text-sm text-amber-700">
                    Passez au plan Premium pour accéder à toutes les fonctionnalités exclusives.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Badges et Réalisations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Lecteur Assidu", icon: <BookOpen size={24} className="text-emerald-600" /> },
                  { name: "Participant Actif", icon: <User size={24} className="text-blue-600" /> },
                  { name: "Mémorisateur", icon: <Award size={24} className="text-amber-600" /> },
                  { name: "Contributeur", icon: <Heart size={24} className="text-red-600" /> },
                  { name: "Ponctuel", icon: <Clock size={24} className="text-purple-600" /> },
                  { name: "Explorateur", icon: <MapPin size={24} className="text-indigo-600" /> },
                ].map((badge, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="bg-gray-100 p-3 rounded-full mb-2">{badge.icon}</div>
                    <span className="text-xs font-medium">{badge.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="activity">Activité</TabsTrigger>
              <TabsTrigger value="bookmarks">Signets</TabsTrigger>
              <TabsTrigger value="progress">Progrès</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activité Récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        type: "read",
                        title: "A lu la sourate Al-Fatiha",
                        time: "Aujourd'hui, 10:23",
                        icon: <BookOpen size={16} className="text-emerald-600" />,
                      },
                      {
                        type: "comment",
                        title: "A commenté sur une vidéo: 'MashaAllah, très inspirant!'",
                        time: "Hier, 15:45",
                        icon: <MessageSquare size={16} className="text-blue-600" />,
                      },
                      {
                        type: "like",
                        title: "A aimé un article sur le Ramadan",
                        time: "Il y a 2 jours",
                        icon: <Heart size={16} className="text-red-600" />,
                      },
                      {
                        type: "course",
                        title: "A terminé le cours 'Introduction au Tajwid'",
                        time: "Il y a 1 semaine",
                        icon: <Award size={16} className="text-amber-600" />,
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex-shrink-0">
                          <div className="bg-gray-100 p-2 rounded-full">{activity.icon}</div>
                        </div>
                        <div>
                          <p className="text-gray-800">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6">
                    Voir toute l'activité
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        label: "Jours Consécutifs",
                        value: "15",
                        icon: <Calendar size={20} className="text-emerald-600" />,
                      },
                      { label: "Pages Lues", value: "127", icon: <BookOpen size={20} className="text-blue-600" /> },
                      { label: "Vidéos Regardées", value: "43", icon: <Play size={20} className="text-red-600" /> },
                      {
                        label: "Cours Suivis",
                        value: "5",
                        icon: <GraduationCap size={20} className="text-amber-600" />,
                      },
                    ].map((stat, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="flex justify-center mb-2">{stat.icon}</div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookmarks">
              <Card>
                <CardHeader>
                  <CardTitle>Vos Signets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: "quran",
                        title: "Sourate Al-Kahf (La Caverne)",
                        desc: "Versets 1-10",
                        date: "Ajouté le 12 Mai 2023",
                      },
                      {
                        type: "article",
                        title: "L'importance de la prière dans l'Islam",
                        desc: "Article par Sheikh Abdullah",
                        date: "Ajouté le 5 Mai 2023",
                      },
                      {
                        type: "video",
                        title: "Comment améliorer sa récitation du Coran",
                        desc: "Vidéo de 15 minutes",
                        date: "Ajouté le 28 Avril 2023",
                      },
                      {
                        type: "hadith",
                        title: "Les 40 Hadiths de l'Imam An-Nawawi",
                        desc: "Collection de hadiths authentiques",
                        date: "Ajouté le 20 Avril 2023",
                      },
                    ].map((bookmark, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-start">
                          <div
                            className={`p-2 rounded-md mr-4 ${
                              bookmark.type === "quran"
                                ? "bg-emerald-100 text-emerald-600"
                                : bookmark.type === "article"
                                  ? "bg-blue-100 text-blue-600"
                                  : bookmark.type === "video"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            {bookmark.type === "quran" ? (
                              <BookOpen size={20} />
                            ) : bookmark.type === "article" ? (
                              <FileText size={20} />
                            ) : bookmark.type === "video" ? (
                              <Play size={20} />
                            ) : (
                              <Book size={20} />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{bookmark.title}</h3>
                            <p className="text-sm text-gray-600">{bookmark.desc}</p>
                            <p className="text-xs text-gray-500 mt-1">{bookmark.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={18} />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6">
                    Voir tous les signets
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Progrès de Lecture du Coran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progression globale</span>
                      <span className="text-sm font-medium text-emerald-600">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { surah: "Al-Fatiha", progress: 100 },
                      { surah: "Al-Baqarah", progress: 65 },
                      { surah: "Al-Imran", progress: 40 },
                      { surah: "An-Nisa", progress: 20 },
                      { surah: "Al-Ma'idah", progress: 10 },
                    ].map((item, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{item.surah}</span>
                          <span className="text-sm text-emerald-600">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">Continuer la Lecture</Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Cours et Formations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Introduction au Tajwid",
                        progress: 100,
                        status: "Terminé",
                        instructor: "Sheikh Ahmed",
                      },
                      {
                        title: "Les Bases du Fiqh",
                        progress: 75,
                        status: "En cours",
                        instructor: "Dr. Fatima",
                      },
                      {
                        title: "Histoire Islamique",
                        progress: 30,
                        status: "En cours",
                        instructor: "Prof. Youssef",
                      },
                    ].map((course, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{course.title}</h3>
                            <p className="text-sm text-gray-600">Instructeur: {course.instructor}</p>
                          </div>
                          <Badge
                            variant={course.status === "Terminé" ? "default" : "outline"}
                            className={
                              course.status === "Terminé" ? "bg-emerald-500" : "border-amber-500 text-amber-500"
                            }
                          >
                            {course.status}
                          </Badge>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Progression</span>
                            <span className="text-sm font-medium text-emerald-600">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {course.status !== "Terminé" && (
                          <Button variant="outline" className="w-full mt-4">
                            Continuer
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres du Compte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Informations Personnelles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                          <input
                            type="text"
                            defaultValue="Ahmed"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                          <input
                            type="text"
                            defaultValue="Benali"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            defaultValue="ahmed.benali@example.com"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                          <input
                            type="tel"
                            defaultValue="+33 6 12 34 56 78"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium mb-4">Préférences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Notifications par email</h4>
                            <p className="text-sm text-gray-500">Recevoir des emails sur les nouveaux contenus</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Notifications push</h4>
                            <p className="text-sm text-gray-500">Recevoir des notifications sur votre appareil</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Mode sombre</h4>
                            <p className="text-sm text-gray-500">Activer le thème sombre pour l'application</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium mb-4">Sécurité</h3>
                      <Button variant="outline" className="w-full mb-3">
                        Changer le mot de passe
                      </Button>
                      <Button variant="outline" className="w-full">
                        Activer l'authentification à deux facteurs
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                    <Button variant="outline" className="mr-3">
                      Annuler
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Enregistrer les modifications</Button>
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
