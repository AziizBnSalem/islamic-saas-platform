import ChatInterface from "@/components/chat/chat-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageSquare, Users } from "lucide-react"

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Centre de Discussion</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Tabs defaultValue="chatbot" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="chatbot" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Chatbot Islamique</span>
              </TabsTrigger>
              <TabsTrigger value="scholars" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Savants</span>
              </TabsTrigger>
              
              <TabsTrigger value="community" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Communauté</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chatbot">
              <Card>
                <CardHeader>
                  <CardTitle>Assistant Islamique IA</CardTitle>
                  <CardDescription>
                    Posez vos questions sur l'Islam et recevez des réponses basées sur le Coran et la Sunna
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChatInterface
                    initialMessages={[
                      {
                        id: 1,
                        content:
                          "Assalamu alaikum! Je suis votre assistant islamique. Comment puis-je vous aider aujourd'hui?",
                        sender: "bot",
                        timestamp: new Date(),
                      },
                    ]}
                    botName="Assistant IA"
                    botAvatar="AI"
                    placeholder="Posez une question sur l'Islam..."
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scholars">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation avec des Savants</CardTitle>
                  <CardDescription>
                    Discutez directement avec des savants et des imams qualifiés (fonctionnalité premium)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-amber-100 text-amber-800 p-4 rounded-lg mb-6 max-w-md">
                      Cette fonctionnalité est disponible uniquement pour les abonnés premium.
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium">
                      Passer à l'abonnement Premium
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community">
              <Card>
                <CardHeader>
                  <CardTitle>Forum Communautaire</CardTitle>
                  <CardDescription>
                    Échangez avec d'autres membres de la communauté sur des sujets islamiques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChatInterface
                    initialMessages={[
                      {
                        id: 1,
                        content:
                          "Bienvenue dans le forum communautaire! Ici, vous pouvez discuter avec d'autres membres sur des sujets islamiques.",
                        sender: "bot",
                        timestamp: new Date(),
                      },
                      {
                        id: 2,
                        content:
                          "Assalamu alaikum! Quelqu'un peut-il me recommander des livres sur la vie du Prophète Muhammad (paix et bénédiction sur lui)?",
                        sender: "user",
                        timestamp: new Date(Date.now() - 3600000),
                        username: "Ahmed",
                      },
                      {
                        id: 3,
                        content:
                          "Wa alaikum salam! Je vous recommande 'Le Nectar Cacheté' de Safi-ur-Rahman al-Mubarakpuri, c'est une excellente biographie du Prophète.",
                        sender: "user",
                        timestamp: new Date(Date.now() - 3000000),
                        username: "Fatima",
                      },
                    ]}
                    isCommunity={true}
                    placeholder="Participez à la discussion..."
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Sujets Populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "La prière (Salat)",
                  "Le jeûne du Ramadan",
                  "Le pèlerinage (Hajj)",
                  "La Zakat (aumône)",
                  "L'éducation des enfants",
                  "Le mariage en Islam",
                  "Les droits et devoirs",
                  "L'éthique islamique",
                ].map((topic, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <button className="text-gray-700 hover:text-emerald-600 transition-colors">{topic}</button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Savants en ligne</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Imam Yusuf", status: "online" },
                    { name: "Dr. Aisha", status: "online" },
                    { name: "Sheikh Abdullah", status: "away" },
                    { name: "Ustadh Omar", status: "offline" },
                  ].map((scholar, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          scholar.status === "online"
                            ? "bg-green-500"
                            : scholar.status === "away"
                              ? "bg-amber-500"
                              : "bg-gray-300"
                        }`}
                      ></div>
                      <span className="text-sm">{scholar.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
