"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronRight } from "lucide-react"

export default function AboutPage() {
  // Company values
  const values = [
    {
      title: "Excellence",
      description: "Nous nous efforçons d'offrir des services et des produits de la plus haute qualité.",
      icon: "🌟",
    },
    {
      title: "Intégrité",
      description: "Nous agissons avec honnêteté, transparence et respect des principes islamiques.",
      icon: "🤲",
    },
    {
      title: "Innovation",
      description: "Nous recherchons constamment de nouvelles façons d'améliorer nos services.",
      icon: "💡",
    },
    {
      title: "Communauté",
      description: "Nous valorisons la création de liens solides au sein de la communauté musulmane.",
      icon: "🕌",
    },
  ]
  // Timeline events
  const timeline = [
    {
      year: "2018",
      title: "Fondation",
      description: "Création de l'entreprise avec une vision claire: rendre l'éducation islamique accessible à tous.",
    },
    {
      year: "2019",
      title: "Premier Produit",
      description: "Lancement de notre première application de gestion pour les écoles islamiques.",
    },
    {
      year: "2020",
      title: "Expansion",
      description: "Développement de nouvelles fonctionnalités et expansion dans plusieurs pays.",
    },
    {
      year: "2021",
      title: "Reconnaissance",
      description: "Récompensés comme l'une des meilleures solutions SaaS pour les institutions religieuses.",
    },
    {
      year: "2022",
      title: "Croissance",
      description: "Atteinte de plus de 50 000 utilisateurs actifs et 500 écoles partenaires.",
    },
    {
      year: "2023",
      title: "Innovation",
      description: "Lancement de notre plateforme complète avec IA et outils communautaires avancés.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <Badge className="mb-4 bg-islamic-100 text-islamic-700">À Propos</Badge>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Notre Histoire</h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          IslamiC est née de la vision de créer une plateforme technologique complète qui répond aux besoins
          spécifiques de la communauté musulmane, des écoles islamiques et des institutions religieuses.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="mb-20 grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="bg-islamic-600 p-6 text-white">
                <h2 className="mb-2 text-2xl font-bold">Notre Mission</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Notre mission est de fournir des solutions technologiques innovantes qui facilitent l'éducation
                  islamique, renforcent la communauté musulmane et permettent aux institutions religieuses de prospérer
                  à l'ère numérique.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Faciliter l'accès au savoir islamique",
                    "Connecter la communauté musulmane mondiale",
                    "Soutenir les écoles et institutions islamiques",
                    "Promouvoir l'excellence dans l'éducation religieuse",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-islamic-600" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="bg-islamic-700 p-6 text-white">
                <h2 className="mb-2 text-2xl font-bold">Notre Vision</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Nous envisageons un monde où la technologie sert de pont entre la tradition islamique et les besoins
                  modernes, où chaque musulman a accès à des ressources éducatives de qualité, et où les communautés
                  sont unies par des outils numériques respectueux des valeurs islamiques.
                </p>
                <div className="mt-6">
                  <div className="relative mt-8 pl-8">
                    <div className="absolute left-0 top-0 h-full w-1 bg-islamic-100 dark:bg-islamic-900"></div>
                    <blockquote className="italic text-gray-700 dark:text-gray-300">
                      "Notre objectif est de créer une technologie qui honore notre héritage tout en répondant aux défis
                      du présent et en préparant notre communauté pour l'avenir."
                      <footer className="mt-2 text-right font-medium text-islamic-600 dark:text-islamic-400">
                        — Ahmed Benali, Fondateur
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Values */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Nos Valeurs</h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            Ces principes fondamentaux guident toutes nos actions et décisions.
          </p>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full overflow-hidden border-none shadow-lg transition-transform duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="mb-4 text-4xl">{value.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Notre Parcours</h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            Découvrez les moments clés qui ont façonné notre entreprise depuis sa création.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 transform bg-islamic-100 dark:bg-islamic-900"></div>

          <div className="space-y-12">
            {timeline.map((event, index) => (
              <motion.div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="w-1/2"></div>
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-islamic-600 text-white">
                  {event.year.substring(2)}
                </div>
                <div className="w-1/2 p-4">
                  <Card className="overflow-hidden border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-2 text-sm font-bold text-islamic-600 dark:text-islamic-400">{event.year}</div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        </motion.div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="rounded-xl bg-islamic-50 p-8 dark:bg-islamic-900/30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Rejoignez-nous dans cette aventure</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
            Découvrez comment notre plateforme peut transformer votre expérience islamique et renforcer votre
            communauté.
          </p>
          <Button
            className="bg-islamic-600 hover:bg-islamic-700 dark:bg-islamic-600 dark:hover:bg-islamic-700"
            size="lg"
            onClick={() => window.location.href = '/login'}
          >
            Commencer Gratuitement
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
