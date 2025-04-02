"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Crown, X, Check, Brain, Volume2, FileText, Users, Star, HelpCircle } from "lucide-react"

interface PremiumFeaturesProps {
  onClose: () => void
}

export default function PremiumFeatures({ onClose }: PremiumFeaturesProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly")

  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"

    // Reset scroll position of the modal
    window.scrollTo(0, 0)

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    // Add event listener
    window.addEventListener("keydown", handleEscKey)

    // Remove event listener on cleanup and restore body scrolling
    return () => {
      window.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const plans = {
    monthly: {
      basic: {
        price: "₹299",
        period: "month",
      },
      pro: {
        price: "₹499",
        period: "month",
      },
    },
    yearly: {
      basic: {
        price: "₹2,499",
        period: "year",
        savings: "Save ₹1,089",
      },
      pro: {
        price: "₹4,499",
        period: "year",
        savings: "Save ₹1,489",
      },
    },
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
      style={{ top: 0, left: 0 }}
      onClick={(e) => {
        // Close when clicking the backdrop, but not when clicking the card
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <Card className="w-full max-w-3xl bg-gray-800/90 border-gray-700 text-white overflow-hidden max-h-[90vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-yellow-600/30 to-amber-600/30 pb-4 sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-yellow-600 flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Upgrade to Premium</CardTitle>
                <CardDescription className="text-gray-300">
                  Unlock powerful AI features and exclusive content
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-300 hover:text-white"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 overflow-y-auto">
          <Tabs
            defaultValue="monthly"
            className="w-full"
            onValueChange={(value) => setSelectedPlan(value as "monthly" | "yearly")}
          >
            <div className="flex justify-center mb-6">
              <TabsList className="bg-gray-700/50">
                <TabsTrigger value="monthly" className="data-[state=active]:bg-yellow-600">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="yearly" className="data-[state=active]:bg-yellow-600">
                  Yearly
                  <Badge className="ml-2 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Save 25%</Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly" className="mt-0">
              <div className="grid md:grid-cols-2 gap-4">
                <PricingCard
                  title="Basic"
                  price={plans.monthly.basic.price}
                  period={plans.monthly.basic.period}
                  features={[
                    { name: "AI Note Summarization", included: true },
                    { name: "Handwritten Notes Scanner", included: true },
                    { name: "Audio Notes (Text-to-Speech)", included: true },
                    { name: "Ad-Free Experience", included: true },
                    { name: "AI Quiz Generator", included: false },
                    { name: "Study Group Creation", included: false },
                    { name: "AI Doubt Solver (24/7)", included: false },
                    { name: "Personalized Study Planner", included: false },
                    { name: "Exclusive Premium Notes", included: false },
                  ]}
                  buttonText="Get Basic"
                  highlighted={false}
                />

                <PricingCard
                  title="Pro"
                  price={plans.monthly.pro.price}
                  period={plans.monthly.pro.period}
                  features={[
                    { name: "AI Note Summarization", included: true },
                    { name: "Handwritten Notes Scanner", included: true },
                    { name: "Audio Notes (Text-to-Speech)", included: true },
                    { name: "Ad-Free Experience", included: true },
                    { name: "AI Quiz Generator", included: true },
                    { name: "Study Group Creation", included: true },
                    { name: "AI Doubt Solver (24/7)", included: true },
                    { name: "Personalized Study Planner", included: true },
                    { name: "Exclusive Premium Notes", included: true },
                  ]}
                  buttonText="Get Pro"
                  highlighted={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="yearly" className="mt-0">
              <div className="grid md:grid-cols-2 gap-4">
                <PricingCard
                  title="Basic"
                  price={plans.yearly.basic.price}
                  period={plans.yearly.basic.period}
                  savings={plans.yearly.basic.savings}
                  features={[
                    { name: "AI Note Summarization", included: true },
                    { name: "Handwritten Notes Scanner", included: true },
                    { name: "Audio Notes (Text-to-Speech)", included: true },
                    { name: "Ad-Free Experience", included: true },
                    { name: "AI Quiz Generator", included: false },
                    { name: "Study Group Creation", included: false },
                    { name: "AI Doubt Solver (24/7)", included: false },
                    { name: "Personalized Study Planner", included: false },
                    { name: "Exclusive Premium Notes", included: false },
                  ]}
                  buttonText="Get Basic"
                  highlighted={false}
                />

                <PricingCard
                  title="Pro"
                  price={plans.yearly.pro.price}
                  period={plans.yearly.pro.period}
                  savings={plans.yearly.pro.savings}
                  features={[
                    { name: "AI Note Summarization", included: true },
                    { name: "Handwritten Notes Scanner", included: true },
                    { name: "Audio Notes (Text-to-Speech)", included: true },
                    { name: "Ad-Free Experience", included: true },
                    { name: "AI Quiz Generator", included: true },
                    { name: "Study Group Creation", included: true },
                    { name: "AI Doubt Solver (24/7)", included: true },
                    { name: "Personalized Study Planner", included: true },
                    { name: "Exclusive Premium Notes", included: true },
                  ]}
                  buttonText="Get Pro"
                  highlighted={true}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 bg-gray-700/30 rounded-lg p-3">
            <h3 className="text-base font-medium mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Premium Features Showcase
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <FeatureCard icon={<Brain className="h-5 w-5 text-purple-400" />} title="AI Summarization" />
              <FeatureCard icon={<Volume2 className="h-5 w-5 text-blue-400" />} title="Audio Notes" />
              <FeatureCard icon={<FileText className="h-5 w-5 text-green-400" />} title="Handwritten Scanner" />
              <FeatureCard icon={<Users className="h-5 w-5 text-pink-400" />} title="Study Groups" />
              <FeatureCard icon={<HelpCircle className="h-5 w-5 text-yellow-400" />} title="Quiz Generator" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-700 bg-gray-800/50 flex justify-between p-4 sticky bottom-0 z-10">
          <div className="text-sm text-gray-400">
            <p>7-day money-back guarantee</p>
            <p>Cancel anytime</p>
          </div>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={onClose}>
            Maybe Later
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

interface PricingCardProps {
  title: string
  price: string
  period: string
  savings?: string
  features: { name: string; included: boolean }[]
  buttonText: string
  highlighted: boolean
}

function PricingCard({ title, price, period, savings, features, buttonText, highlighted }: PricingCardProps) {
  return (
    <div
      className={`rounded-xl border ${
        highlighted
          ? "border-yellow-500/50 bg-gradient-to-b from-yellow-900/20 to-transparent"
          : "border-gray-700 bg-gray-800/40"
      } p-4 relative overflow-hidden`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <div className="bg-yellow-600 text-xs font-medium px-3 py-1 rounded-bl-lg text-white">Most Popular</div>
        </div>
      )}

      <h3 className="text-xl font-bold mb-2">{title}</h3>

      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-gray-400 ml-1">/{period}</span>
        </div>
        {savings && <div className="text-yellow-400 text-sm mt-1">{savings}</div>}
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <div
              className={`mt-0.5 rounded-full p-1 ${
                feature.included ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-500"
              }`}
            >
              {feature.included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
            </div>
            <span className={feature.included ? "text-gray-200" : "text-gray-500"}>{feature.name}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full ${
          highlighted ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
        }`}
      >
        {buttonText}
      </Button>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
}

function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-2 flex flex-col items-center text-center">
      <div className="h-10 w-10 rounded-full bg-gray-700/50 flex items-center justify-center mb-2">{icon}</div>
      <h4 className="text-sm font-medium">{title}</h4>
    </div>
  )
}

