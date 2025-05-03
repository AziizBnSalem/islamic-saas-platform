"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, ImageIcon, Paperclip, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type Message = {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
  username?: string
}

interface ChatInterfaceProps {
  initialMessages: Message[]
  botName?: string
  botAvatar?: string
  placeholder?: string
  isCommunity?: boolean
}

export default function ChatInterface({
  initialMessages,
  botName = "Assistant",
  botAvatar = "AI",
  placeholder = "Tapez votre message...",
  isCommunity = false,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [attachments, setAttachments] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim() && attachments.length === 0) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
      username: isCommunity ? "Vous" : undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setAttachments([])

    // Simulate bot response if not in community mode
    if (!isCommunity) {
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

        const newBotMessage: Message = {
          id: messages.length + 2,
          content: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, newBotMessage])
      }, 1000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real implementation, this would start/stop voice recording
  }

  const handleAttachment = () => {
    // Simulate adding an attachment
    setAttachments([...attachments, "/placeholder.svg?height=200&width=200"])
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 mr-2 bg-emerald-100">
                    <div className="text-emerald-700 font-semibold">{botAvatar}</div>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.sender === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.username && (
                    <div
                      className={`text-xs font-medium mb-1 ${message.sender === "user" ? "text-emerald-100" : "text-emerald-600"}`}
                    >
                      {message.username}
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className={`text-xs mt-1 ${message.sender === "user" ? "text-emerald-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-2 bg-emerald-600">
                    <div className="text-white font-semibold">U</div>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="relative">
                <img
                  src={attachment || "/placeholder.svg"}
                  alt="Attachment"
                  className="h-20 w-20 object-cover rounded-md"
                />
                <button
                  onClick={() => removeAttachment(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end gap-2">
          <TooltipProvider>
            <div className="flex space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-emerald-600"
                    onClick={handleAttachment}
                  >
                    <ImageIcon size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ajouter une image</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-emerald-600"
                    onClick={handleAttachment}
                  >
                    <Paperclip size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ajouter un fichier</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>

          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: "40px", maxHeight: "120px" }}
            />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${isRecording ? "text-red-500" : "text-gray-500 hover:text-emerald-600"}`}
                  onClick={toggleRecording}
                >
                  <Mic size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isRecording ? "Arrêter l'enregistrement" : "Enregistrer un message vocal"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            onClick={handleSend}
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={!input.trim() && attachments.length === 0}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}
