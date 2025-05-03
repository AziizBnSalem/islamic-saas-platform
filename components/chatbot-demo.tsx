"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

type Message = {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Assalamu alaikum! Je suis votre assistant islamique. Comment puis-je vous aider aujourd'hui?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      let botResponse = ""

      if (input.toLowerCase().includes("prière") || input.toLowerCase().includes("salat")) {
        botResponse =
          "Les cinq prières quotidiennes (Salat) sont: Fajr, Dhuhr, Asr, Maghrib et Isha. Chacune a son temps spécifique basé sur la position du soleil."
      } else if (input.toLowerCase().includes("ramadan")) {
        botResponse =
          "Le Ramadan est le neuvième mois du calendrier islamique, durant lequel les musulmans jeûnent du lever au coucher du soleil. C'est un mois de spiritualité, de charité et de communion."
      } else if (input.toLowerCase().includes("coran") || input.toLowerCase().includes("quran")) {
        botResponse =
          "Le Coran est le livre sacré de l'Islam, considéré par les musulmans comme la parole d'Allah révélée au prophète Muhammad (paix et bénédiction sur lui) par l'intermédiaire de l'ange Gabriel."
      } else {
        botResponse =
          "Je serais heureux de vous aider avec vos questions sur l'Islam. N'hésitez pas à me demander sur des sujets comme la prière, le Ramadan, le Hajj, ou tout autre aspect de la foi islamique."
      }

      setIsTyping(false)
      const newBotMessage: Message = {
        id: messages.length + 2,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newBotMessage])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-4 h-[400px] overflow-y-auto">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 mr-2 bg-islamic-100">
                      <div className="text-islamic-700 font-semibold">AI</div>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === "user" ? "bg-islamic-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{message.content}</p>
                    <div className={`text-xs mt-1 ${message.sender === "user" ? "text-islamic-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 ml-2 bg-islamic-600">
                      <div className="text-white font-semibold">U</div>
                    </Avatar>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex max-w-[80%] flex-row">
                <Avatar className="h-8 w-8 mr-2 bg-islamic-100">
                  <div className="text-islamic-700 font-semibold">AI</div>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-gray-100 text-gray-800">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-islamic-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-islamic-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-islamic-400 animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Posez une question sur l'Islam..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 focus:ring-islamic-500 focus:border-islamic-500"
          />
          <Button
            onClick={handleSend}
            className="bg-islamic-600 hover:bg-islamic-700 transition-colors duration-300"
            disabled={!input.trim() || isTyping}
          >
            {isTyping ? <LoadingSpinner size="sm" variant="secondary" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
