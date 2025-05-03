import { Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "pour toujours",
      description: "Fonctionnalités de base pour tous les musulmans",
      features: [
        "Horaires de prière précis",
        "Coran avec traduction",
        "Tasbeeh digital",
        "Qibla Finder",
        "Duas essentielles",
        "Accès à la communauté",
      ],
      popular: false,
      buttonText: "Commencer gratuitement",
      buttonVariant: "outline",
    },
    {
      name: "Premium",
      price: "9,99€",
      period: "par mois",
      description: "Fonctionnalités avancées pour enrichir votre pratique",
      features: [
        "Tout ce qui est inclus dans le plan gratuit",
        "Coran avec tafsir complet",
        "Récitations audio du Coran par différents récitateurs",
        "Bibliothèque de livres islamiques exclusifs",
        "Anashid premium sans publicité",
        "Consultation avec des savants",
        "Contenu sans publicité",
      ],
      popular: true,
      buttonText: "Essayer Premium",
      buttonVariant: "default",
    },
    {
      name: "Familial",
      price: "19,99€",
      period: "par mois",
      description: "Idéal pour toute la famille",
      features: [
        "Tout ce qui est inclus dans le plan Premium",
        "Jusqu'à 5 profils utilisateurs",
        "Contrôle parental",
        "Contenu adapté aux enfants",
        "Suivi des progrès d'apprentissage",
        "Partage de contenu entre membres",
        "Support prioritaire",
      ],
      popular: false,
      buttonText: "Choisir Familial",
      buttonVariant: "outline",
    },
  ]

  const frequentlyAskedQuestions = [
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer:
        "Oui, vous pouvez annuler votre abonnement à tout moment. L'annulation prendra effet à la fin de votre période de facturation en cours.",
    },
    {
      question: "Comment fonctionne l'essai gratuit ?",
      answer:
        "Nous offrons un essai gratuit de 7 jours pour nos plans Premium et Familial. Vous ne serez pas facturé pendant cette période et vous pouvez annuler à tout moment avant la fin de l'essai.",
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), PayPal, et dans certains pays, le paiement mobile.",
    },
    {
      question: "Puis-je changer de plan à tout moment ?",
      answer:
        "Oui, vous pouvez passer à un plan supérieur à tout moment. Si vous passez à un plan inférieur, le changement prendra effet à la fin de votre période de facturation en cours.",
    },
    {
      question: "Le contenu est-il disponible hors ligne ?",
      answer:
        "Oui, les abonnés Premium et Familial peuvent télécharger du contenu pour un accès hors ligne, y compris le Coran, les récitations audio, et les livres.",
    },
    {
      question: "Comment puis-je obtenir de l'aide si j'ai des problèmes avec mon abonnement ?",
      answer:
        "Notre équipe de support est disponible 24/7. Vous pouvez nous contacter par email, chat en direct, ou via notre formulaire de contact.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Plans et Tarifs</h1>
        <p className="text-xl text-gray-600">
          Choisissez le plan qui correspond le mieux à vos besoins spirituels et éducatifs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {pricingPlans.map((plan, index) => (
          <Card
            key={index}
            className={`${plan.popular ? "border-2 border-[#0F4C75] shadow-lg relative" : "border border-gray-200"}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0F4C75] text-white px-4 py-1 rounded-full text-sm font-bold">
                Le plus populaire
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-gray-500 ml-1">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-[#0F4C75] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  plan.buttonVariant === "default"
                    ? "bg-[#0F4C75] hover:bg-[#1B262C] text-white"
                    : "border-[#0F4C75] text-[#0F4C75] hover:bg-blue-50"
                }`}
                variant={plan.buttonVariant as "default" | "outline"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">Questions fréquemment posées</h2>
        <div className="space-y-6">
          {frequentlyAskedQuestions.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
