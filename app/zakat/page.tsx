"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, HelpCircle, Info, ArrowRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ZakatPage() {
  const [moneyAmount, setMoneyAmount] = useState<number>(0)
  const [goldAmount, setGoldAmount] = useState<number>(0)
  const [goldType, setGoldType] = useState<"24k" | "22k" | "18k">("24k")
  const [silverAmount, setSilverAmount] = useState<number>(0)
  const [otherAssets, setOtherAssets] = useState<number>(0)
  const [liabilities, setLiabilities] = useState<number>(0)
  const [currency, setCurrency] = useState<string>("EUR")

  // Current gold and silver prices (would be fetched from an API in a real implementation)
  const goldPrices = {
    "24k": 65, // price per gram in EUR
    "22k": 60,
    "18k": 48,
  }
  const silverPrice = 0.75 // price per gram in EUR

  // Nisab thresholds (minimum amount for Zakat to be due)
  const goldNisabGrams = 85 // 85 grams of gold
  const silverNisabGrams = 595 // 595 grams of silver

  // Calculate Nisab values in the selected currency
  const goldNisabValue = goldNisabGrams * goldPrices["24k"]
  const silverNisabValue = silverNisabGrams * silverPrice

  // Use the lower of the two Nisab values (typically silver)
  const nisabValue = Math.min(goldNisabValue, silverNisabValue)

  // Calculate total assets
  const calculateTotalAssets = () => {
    const goldValue = goldAmount * goldPrices[goldType]
    const silverValue = silverAmount * silverPrice
    return moneyAmount + goldValue + silverValue + otherAssets
  }

  // Calculate total wealth
  const calculateTotalWealth = () => {
    return calculateTotalAssets() - liabilities
  }

  // Calculate Zakat amount (2.5% of total wealth if above Nisab)
  const calculateZakat = () => {
    const totalWealth = calculateTotalWealth()
    return totalWealth > nisabValue ? totalWealth * 0.025 : 0
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: currency }).format(amount)
  }

  // Check if Zakat is due
  const isZakatDue = calculateTotalWealth() >= nisabValue

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Calculateur de Zakat</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Calculez votre Zakat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="simple" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="simple">Calcul Simple</TabsTrigger>
                  <TabsTrigger value="detailed">Calcul Détaillé</TabsTrigger>
                </TabsList>

                <TabsContent value="simple">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0F4C75] focus:border-transparent"
                      >
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dollar US ($)</option>
                        <option value="GBP">Livre Sterling (£)</option>
                        <option value="MAD">Dirham Marocain (DH)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Total de vos avoirs (argent, or, argent, etc.)
                        </label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Incluez l'argent liquide, les comptes bancaires, l'or, l'argent, les investissements et
                                autres actifs que vous possédez depuis un an lunaire complet.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          min="0"
                          value={moneyAmount || ""}
                          onChange={(e) => setMoneyAmount(Number.parseFloat(e.target.value) || 0)}
                          className="pl-8"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">
                            {currency === "EUR" ? "€" : currency === "USD" ? "$" : currency === "GBP" ? "£" : "DH"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Total de vos dettes et obligations
                        </label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Incluez les dettes que vous devez payer immédiatement ou à court terme.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          min="0"
                          value={liabilities || ""}
                          onChange={(e) => setLiabilities(Number.parseFloat(e.target.value) || 0)}
                          className="pl-8"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">
                            {currency === "EUR" ? "€" : currency === "USD" ? "$" : currency === "GBP" ? "£" : "DH"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Richesse totale:</span>
                        <span className="font-medium">{formatCurrency(calculateTotalWealth())}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Seuil de Nisab:</span>
                        <span>{formatCurrency(nisabValue)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Zakat due:</span>
                        <span className={isZakatDue ? "text-[#0F4C75] font-bold" : "text-gray-500"}>
                          {isZakatDue ? "Oui" : "Non"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold mt-4">
                        <span>Montant de la Zakat (2.5%):</span>
                        <span className="text-[#0F4C75]">{formatCurrency(calculateZakat())}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="detailed">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0F4C75] focus:border-transparent"
                      >
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dollar US ($)</option>
                        <option value="GBP">Livre Sterling (£)</option>
                        <option value="MAD">Dirham Marocain (DH)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Argent liquide et comptes bancaires
                        </label>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          min="0"
                          value={moneyAmount || ""}
                          onChange={(e) => setMoneyAmount(Number.parseFloat(e.target.value) || 0)}
                          className="pl-8"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">
                            {currency === "EUR" ? "€" : currency === "USD" ? "$" : currency === "GBP" ? "£" : "DH"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">Or (en grammes)</label>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Input
                            type="number"
                            min="0"
                            value={goldAmount || ""}
                            onChange={(e) => setGoldAmount(Number.parseFloat(e.target.value) || 0)}
                            placeholder="Quantité"
                          />
                        </div>
                        <div className="w-24">
                          <select
                            value={goldType}
                            onChange={(e) => setGoldType(e.target.value as "24k" | "22k" | "18k")}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0F4C75] focus:border-transparent"
                          >
                            <option value="24k">24K</option>
                            <option value="22k">22K</option>
                            <option value="18k">18K</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Valeur: {formatCurrency(goldAmount * goldPrices[goldType])}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">Argent (en grammes)</label>
                      </div>
                      <Input
                        type="number"
                        min="0"
                        value={silverAmount || ""}
                        onChange={(e) => setSilverAmount(Number.parseFloat(e.target.value) || 0)}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Valeur: {formatCurrency(silverAmount * silverPrice)}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Autres actifs (investissements, marchandises, etc.)
                        </label>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          min="0"
                          value={otherAssets || ""}
                          onChange={(e) => setOtherAssets(Number.parseFloat(e.target.value) || 0)}
                          className="pl-8"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">
                            {currency === "EUR" ? "€" : currency === "USD" ? "$" : currency === "GBP" ? "£" : "DH"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">Dettes et obligations</label>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          min="0"
                          value={liabilities || ""}
                          onChange={(e) => setLiabilities(Number.parseFloat(e.target.value) || 0)}
                          className="pl-8"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">
                            {currency === "EUR" ? "€" : currency === "USD" ? "$" : currency === "GBP" ? "£" : "DH"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span>Total des actifs:</span>
                        <span>{formatCurrency(calculateTotalAssets())}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Moins les dettes:</span>
                        <span>- {formatCurrency(liabilities)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Richesse totale:</span>
                        <span className="font-medium">{formatCurrency(calculateTotalWealth())}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Seuil de Nisab:</span>
                        <span>{formatCurrency(nisabValue)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Zakat due:</span>
                        <span className={isZakatDue ? "text-[#0F4C75] font-bold" : "text-gray-500"}>
                          {isZakatDue ? "Oui" : "Non"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold mt-4">
                        <span>Montant de la Zakat (2.5%):</span>
                        <span className="text-[#0F4C75]">{formatCurrency(calculateZakat())}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5" />À propos de la Zakat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p>
                  La Zakat est l'un des cinq piliers de l'Islam. C'est une obligation pour tout musulman dont la
                  richesse dépasse un certain seuil (Nisab) de donner 2,5% de cette richesse aux personnes éligibles.
                </p>
                <p>
                  Allah dit dans le Coran: "Et accomplissez la Salat et acquittez la Zakat, et inclinez-vous avec ceux
                  qui s'inclinent." (Sourate Al-Baqarah, 2:43)
                </p>
                <p className="font-medium">Qui doit payer la Zakat?</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Tout musulman adulte et sain d'esprit</li>
                  <li>Possédant une richesse supérieure au Nisab</li>
                  <li>Ayant possédé cette richesse pendant une année lunaire complète</li>
                </ul>
                <p className="font-medium">Qui peut recevoir la Zakat?</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Les pauvres et les nécessiteux</li>
                  <li>Ceux qui collectent et administrent la Zakat</li>
                  <li>Les nouveaux convertis à l'Islam</li>
                  <li>Les esclaves (pour leur libération)</li>
                  <li>Les personnes endettées</li>
                  <li>Dans la voie d'Allah</li>
                  <li>Les voyageurs dans le besoin</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Organisations de Zakat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Vous pouvez verser votre Zakat à des organisations caritatives islamiques fiables qui s'assurent que
                votre contribution atteint les bénéficiaires éligibles.
              </p>
              <Button className="w-full bg-[#0F4C75] hover:bg-[#1B262C] flex items-center justify-center">
                Voir les organisations recommandées
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
