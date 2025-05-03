"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/school/charts"

export default function SchoolDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Aperçu de la Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Répartition des Élèves</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Taux de Réussite par Matière</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Événements à Venir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Réunion des Parents",
                date: "15 Juin 2023",
                description: "Discussion sur les progrès des élèves et les projets futurs.",
              },
              {
                title: "Compétition de Récitation du Coran",
                date: "22 Juin 2023",
                description: "Les élèves démontreront leurs compétences en récitation du Coran.",
              },
              {
                title: "Fin du Trimestre",
                date: "30 Juin 2023",
                description: "Dernier jour du trimestre scolaire actuel.",
              },
            ].map((event, index) => (
              <div key={index} className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
                <div className="bg-emerald-100 text-emerald-800 rounded-md px-3 py-2 text-sm font-medium mr-4 whitespace-nowrap">
                  {event.date}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
