"use client"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-islamic-100/50 border-islamic-100 hover:border-islamic-200 group hover-lift">
      <CardContent className="p-6">
        <div className="mb-4 text-islamic-600 transition-transform duration-300 group-hover:scale-110">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-islamic-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
