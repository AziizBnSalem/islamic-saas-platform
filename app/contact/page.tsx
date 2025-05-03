"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    })

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-islamic-600" />,
      title: "Adresse",
      content: "123 Rue de l'Islam, 75001 Paris, France",
    },
    {
      icon: <Phone className="h-5 w-5 text-islamic-600" />,
      title: "Téléphone",
      content: "+33 1 23 45 67 89",
    },
    {
      icon: <Mail className="h-5 w-5 text-islamic-600" />,
      title: "Email",
      content: "contact@IslamiC.com",
    },
    {
      icon: <Clock className="h-5 w-5 text-islamic-600" />,
      title: "Heures d'ouverture",
      content: "Lun - Ven: 9h - 18h",
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <Badge className="mb-4 bg-islamic-100 text-islamic-700">Contact</Badge>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Contactez-nous</h1>
        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
          Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou suggestion concernant
          notre plateforme.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="bg-islamic-600 p-6 text-white">
                <h2 className="mb-4 text-xl font-bold">Informations de contact</h2>
                <p className="text-islamic-100">
                  N'hésitez pas à nous contacter par téléphone, email ou en utilisant le formulaire de contact.
                </p>
              </div>
              <div className="p-6">
                <motion.ul
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {contactInfo.map((item, index) => (
                    <motion.li key={index} className="flex items-start" variants={itemVariants}>
                      <div className="mr-4 rounded-full bg-islamic-100 p-3">{item.icon}</div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Suivez-nous</h3>
                  <div className="flex space-x-4">
                    {["facebook", "twitter", "instagram", "linkedin"].map((social, index) => (
                      <motion.a
                        key={social}
                        href={`#${social}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-islamic-100 text-islamic-600 transition-colors hover:bg-islamic-200 dark:bg-islamic-900 dark:text-islamic-400 dark:hover:bg-islamic-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <span className="sr-only">{social}</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10z" />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Envoyez-nous un message</h2>

              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center rounded-lg bg-islamic-50 py-12 text-center dark:bg-islamic-900/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 rounded-full bg-islamic-100 p-3 dark:bg-islamic-900">
                    <CheckCircle className="h-8 w-8 text-islamic-600 dark:text-islamic-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Message envoyé</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                        className="border-gray-300 focus:border-islamic-500 focus:ring-islamic-500 dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                        className="border-gray-300 focus:border-islamic-500 focus:ring-islamic-500 dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Sujet
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Comment pouvons-nous vous aider?"
                      required
                      className="border-gray-300 focus:border-islamic-500 focus:ring-islamic-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      rows={6}
                      required
                      className="border-gray-300 focus:border-islamic-500 focus:ring-islamic-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-islamic-600 hover:bg-islamic-700 dark:bg-islamic-600 dark:hover:bg-islamic-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Envoi en cours...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer le message
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">
                <div className="h-[300px] w-full bg-gray-200">
                  {/* This would be a Google Map in a real implementation */}
                  <div className="flex h-full w-full items-center justify-center bg-islamic-50 dark:bg-islamic-900/30">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-2 h-8 w-8 text-islamic-600" />
                      <p className="text-gray-600 dark:text-gray-300">
                        Carte interactive - 123 Rue de l'Islam, 75001 Paris, France
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="mt-16 rounded-xl bg-islamic-50 p-8 dark:bg-islamic-900/30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Questions fréquemment posées</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
            Consultez notre FAQ pour trouver rapidement des réponses à vos questions.
          </p>
          <Button
            className="bg-islamic-600 hover:bg-islamic-700 dark:bg-islamic-600 dark:hover:bg-islamic-700"
            size="lg"
          >
            Voir la FAQ
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
