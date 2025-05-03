"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const validateStep1 = () => {
    if (!formState.firstName.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre prénom.",
        variant: "destructive",
      })
      return false
    }
    if (!formState.lastName.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre nom.",
        variant: "destructive",
      })
      return false
    }
    if (!formState.email.trim() || !/^\S+@\S+\.\S+$/.test(formState.email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formState.password.trim() || formState.password.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      })
      return false
    }
    if (formState.password !== formState.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      })
      return false
    }
    if (!formState.agreeTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation.",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep2()) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Compte créé avec succès",
      description: "Bienvenue sur IslamiC!",
    })

    setIsSubmitting(false)
    // In a real app, you would redirect to dashboard or login page
  }

  const passwordStrength = () => {
    const password = formState.password
    if (!password) return { strength: 0, text: "", color: "" }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    const strengthMap = [
      { text: "Très faible", color: "bg-red-500" },
      { text: "Faible", color: "bg-orange-500" },
      { text: "Moyen", color: "bg-yellow-500" },
      { text: "Fort", color: "bg-green-500" },
      { text: "Très fort", color: "bg-green-600" },
    ]

    return {
      strength,
      text: strengthMap[strength].text,
      color: strengthMap[strength].color,
    }
  }

  const { strength, text, color } = passwordStrength()

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Badge className="mb-4 bg-islamic-100 text-islamic-700">Inscription</Badge>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Créez votre compte</h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            Rejoignez notre communauté et accédez à toutes les fonctionnalités de notre plateforme islamique.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-5">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">
                <div className="bg-islamic-600 p-6 text-white">
                  <h2 className="mb-4 text-xl font-bold">Bienvenue sur IslamiC</h2>
                  <p className="text-islamic-100">
                    Créez votre compte pour accéder à toutes les fonctionnalités de notre plateforme.
                  </p>
                </div>
                <div className="p-6">
                  <div className="mb-6 space-y-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">Avec votre compte, vous pourrez :</h3>
                    {[
                      "Accéder au Coran et aux hadiths",
                      "Suivre les horaires de prière",
                      "Participer à la communauté",
                      "Utiliser tous nos outils islamiques",
                      "Synchroniser vos données sur tous vos appareils",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-islamic-600" />
                        <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                    <p className="mb-4 text-gray-600 dark:text-gray-300">Vous avez déjà un compte ?</p>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full border-islamic-600 text-islamic-600 hover:bg-islamic-50 dark:border-islamic-400 dark:text-islamic-400 dark:hover:bg-gray-800"
                      >
                        Se connecter
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          step >= 1 ? "bg-islamic-600" : "bg-gray-300"
                        } text-white`}
                      >
                        1
                      </div>
                      <div className={`mx-2 h-1 w-16 ${step >= 2 ? "bg-islamic-600" : "bg-gray-300"}`}></div>
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          step >= 2 ? "bg-islamic-600" : "bg-gray-300"
                        } text-white`}
                      >
                        2
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Étape {step}/2</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {step === 1 ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                        Informations personnelles
                      </h2>
                      <div className="mb-6 grid gap-6 md:grid-cols-2">
                        <div>
                          <Label htmlFor="firstName" className="mb-2 block">
                            Prénom
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleChange}
                            placeholder="Votre prénom"
                            required
                            className="border-gray-300 focus:border-islamic-500 focus:ring-islamic-500 dark:border-gray-600 dark:bg-gray-800"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="mb-2 block">
                            Nom
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            required
                            className="border-gray-300 focus:border-islamic-500 focus:ring-islamic-500 dark:border-gray-600 dark:bg-gray-800"
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <Label htmlFor="email" className="mb-2 block">
                          Email
                        </Label>
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
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          className="bg-islamic-600 hover:bg-islamic-700 dark:bg-islamic-600 dark:hover:bg-islamic-700"
                        >
                          Continuer
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Sécurité du compte</h2>
                      <div className="mb-6">
                        <Label htmlFor="password" className="mb-2 block">
                          Mot de passe
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formState.password}
                            onChange={handleChange}
                            placeholder="Votre mot de passe"
                            required
                            className="border-gray-300 pr-10 focus:border-islamic-500 focus:ring-islamic-500 dark:border-gray-600 dark:bg-gray-800"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {formState.password && (
                          <div className="mt-2">
                            <div className="mb-1 flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                              <div className={`${color} h-full`} style={{ width: `${(strength / 4) * 100}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500">
                              Force du mot de passe: <span className="font-medium">{text}</span>
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="mb-6">
                        <Label htmlFor="confirmPassword" className="mb-2 block">
                          Confirmer le mot de passe
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formState.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirmez votre mot de passe"
                            required
                            className="border-gray-300 pr-10 focus:border-islamic-500 focus:ring-islamic-500 dark:border-gray-600 dark:bg-gray-800"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {formState.password && formState.confirmPassword && (
                          <p
                            className={`mt-1 text-xs ${
                              formState.password === formState.confirmPassword ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {formState.password === formState.confirmPassword
                              ? "Les mots de passe correspondent"
                              : "Les mots de passe ne correspondent pas"}
                          </p>
                        )}
                      </div>
                      <div className="mb-6 flex items-start space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={formState.agreeTerms}
                          onCheckedChange={(checked) =>
                            setFormState((prev) => ({ ...prev, agreeTerms: checked === true }))
                          }
                          className="mt-1 border-gray-300 text-islamic-600 focus:ring-islamic-500 dark:border-gray-600"
                        />
                        <Label htmlFor="agreeTerms" className="text-sm text-gray-600 dark:text-gray-300">
                          J'accepte les{" "}
                          <Link href="/terms" className="text-islamic-600 hover:underline dark:text-islamic-400">
                            conditions d'utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="/privacy" className="text-islamic-600 hover:underline dark:text-islamic-400">
                            politique de confidentialité
                          </Link>
                        </Label>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Retour
                        </Button>
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
                              Création en cours...
                            </div>
                          ) : (
                            "Créer mon compte"
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
