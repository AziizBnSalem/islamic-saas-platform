"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function PremiumShowcase() {
  const premiumFeatures = [
    {
      title: "Livres Exclusifs",
      description: "Accédez à une bibliothèque de livres islamiques rares et précieux.",
      icon: "📚",
    },
    {
      title: "Anashid Premium",
      description: "Découvrez des collections exclusives d'anashid et de récitations.",
      icon: "🎵",
    },
    {
      title: "Monuments Islamiques",
      description: "Explorez les lieux saints et monuments islamiques du monde entier.",
      icon: "🕌",
    },
    {
      title: "Consultation avec des Experts",
      description: "Échangez directement avec des spécialistes religieux reconnus.",
      icon: "👨‍🏫",
    },
    {
      title: "Ressources Éducatives Avancées",
      description: "Matériel pédagogique approfondi pour tous les niveaux d'étude.",
      icon: "📝",
    },
    {
      title: "Contenu Sans Publicité",
      description: "Profitez d'une expérience immersive sans interruptions.",
      icon: "🚫",
    },
  ]

  const pricingPlans = [
    {
      name: "Mensuel",
      price: "9,99€",
      period: "par mois",
      description: "Accès complet à toutes les fonctionnalités premium",
      features: [
        "Accès à tous les livres exclusifs",
        "Anashid premium illimités",
        "Consultation avec des experts (2 par mois)",
        "Contenu sans publicité",
        "Support prioritaire",
      ],
      popular: false,
    },
    {
      name: "Annuel",
      price: "89,99€",
      period: "par an",
      description: "Économisez 25% avec l'abonnement annuel",
      features: [
        "Tout ce qui est inclus dans le plan mensuel",
        "2 mois gratuits",
        "Consultation avec des experts (5 par mois)",
        "Téléchargements illimités",
        "Accès anticipé aux nouvelles fonctionnalités",
      ],
      popular: true,
    },
    {
      name: "Familial",
      price: "129,99€",
      period: "par an",
      description: "Parfait pour toute la famille (jusqu'à 5 membres)",
      features: [
        "Tout ce qui est inclus dans le plan annuel",
        "Jusqu'à 5 profils utilisateurs",
        "Contrôle parental",
        "Partage de contenu entre membres",
        "Consultation avec des experts (10 par mois)",
      ],
      popular: false,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="space-y-12">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {premiumFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover-lift"
            variants={item}
          >
            <div className="text-3xl mb-3 animate-bounce-light">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
            <p className="text-islamic-100">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="pt-12 border-t border-white/20">
        <motion.h3
          className="text-2xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Choisissez votre plan
        </motion.h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className={`${
                  plan.popular
                    ? "border-2 border-white relative shadow-xl"
                    : "bg-white/5 border-white/10 backdrop-blur-sm"
                } hover-lift transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-islamic-800 px-4 py-1 rounded-full text-sm font-bold">
                    Plus populaire
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-islamic-200 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-islamic-200 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-white text-islamic-800 hover:bg-islamic-50" : "bg-white/20 hover:bg-white/30"
                    } transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    Choisir ce plan
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
