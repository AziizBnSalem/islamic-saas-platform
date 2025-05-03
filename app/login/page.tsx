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
import { Eye, EyeOff, LogIn } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formState.email.trim() || !/^\S+@\S+\.\S+$/.test(formState.email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      })
      return
    }

    if (!formState.password.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre mot de passe.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur IslamiC!",
    })

    setIsSubmitting(false)
    // In a real app, you would redirect to dashboard
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Badge className="mb-4 bg-islamic-100 text-islamic-700">Connexion</Badge>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Connectez-vous à votre compte</h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            Accédez à votre compte pour profiter de toutes les fonctionnalités de notre plateforme islamique.
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
                  <h2 className="mb-4 text-xl font-bold">Bienvenue</h2>
                  <p className="text-islamic-100">
                    Connectez-vous pour accéder à votre compte et à toutes les fonctionnalités de notre plateforme.
                  </p>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Se connecter avec</h3>
                    <div className="grid gap-3">
                      <Button
                        variant="outline"
                        className="flex w-full items-center justify-center border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                      >
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button
                        variant="outline"
                        className="flex w-full items-center justify-center border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                      >
                        <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                        </svg>
                        LinkedIn
                      </Button>
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                        ou connectez-vous avec
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="mb-4 text-gray-600 dark:text-gray-300">Vous n'avez pas encore de compte ?</p>
                    <Link href="/signup">
                      <Button
                        variant="outline"
                        className="w-full border-islamic-600 text-islamic-600 hover:bg-islamic-50 dark:border-islamic-400 dark:text-islamic-400 dark:hover:bg-gray-800"
                      >
                        Créer un compte
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
                <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Connexion par email</h2>
                <form onSubmit={handleSubmit}>
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
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="mb-2 block">
                        Mot de passe
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-islamic-600 hover:underline dark:text-islamic-400"
                      >
                        Mot de passe oublié?
                      </Link>
                    </div>
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
                  </div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        checked={formState.rememberMe}
                        onCheckedChange={(checked) =>
                          setFormState((prev) => ({ ...prev, rememberMe: checked === true }))
                        }
                        className="border-gray-300 text-islamic-600 focus:ring-islamic-500 dark:border-gray-600"
                      />
                      <Label htmlFor="rememberMe" className="text-sm text-gray-600 dark:text-gray-300">
                        Se souvenir de moi
                      </Label>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-islamic-600 hover:bg-islamic-700 dark:bg-islamic-600 dark:hover:bg-islamic-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
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
                        Connexion en cours...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Se connecter
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <motion.div
              className="mt-8 rounded-lg bg-islamic-50 p-6 dark:bg-islamic-900/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-start">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-islamic-100 text-islamic-600 dark:bg-islamic-900 dark:text-islamic-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    Besoin d'aide pour vous connecter?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Si vous rencontrez des difficultés pour vous connecter à votre compte, veuillez contacter notre
                    équipe de support à{" "}
                    <a
                      href="mailto:support@IslamiC.com"
                      className="text-islamic-600 hover:underline dark:text-islamic-400"
                    >
                      support@IslamiC.com
                    </a>{" "}
                    ou consultez notre{" "}
                    <Link href="/help" className="text-islamic-600 hover:underline dark:text-islamic-400">
                      centre d'aide
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
