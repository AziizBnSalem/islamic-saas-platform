"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function Header() {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { label: "Accueil", href: "/" },
    {
      label: "Fonctionnalités",
      children: [
        { label: "Gestion d'École", href: "/school" },
        { label: "Ressources Religieuses", href: "/quran" },
        { label: "Chatbot Islamique", href: "/chat" },
        { label: "Communauté", href: "/social" },
        { label: "Tasbeeh", href: "/tasbeeh" },
        { label: "Qibla", href: "/qibla" },
        { label: "Zakat", href: "/zakat" },
        { label: "Duas", href: "/duas" },
        { label: "Mosquées", href: "/mosques" },
      ],
    },
    { label: "Tarifs", href: "/pricing" },
    { label: "À Propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  // Helper to check if the current route is a subpage of Fonctionnalités
  const isFonctionnalitesActive = () =>
    ["/school", "/quran", "/chat", "/social", "/tasbeeh", "/qibla", "/zakat", "/duas", "/mosques"].some(path =>
      pathname?.startsWith(path)
    )

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
      } border-b border-gray-200`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 rounded-full bg-islamic-600 flex items-center justify-center text-white font-bold text-xl mr-2 transition-transform group-hover:scale-110 duration-300">
                I
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-islamic-600 transition-colors duration-300">
                Islamic
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <motion.nav
              className="mx-6 flex items-center space-x-4 lg:space-x-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.children ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`group flex items-center px-2 py-1 text-gray-700 hover:text-islamic-600 transition-colors duration-300 ${
                            isFonctionnalitesActive() ? "text-islamic-600 font-medium" : ""
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:text-islamic-600 group-data-[state=open]:rotate-180" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-48 animate-scale-in">
                        {item.children.map((child, childIndex) => (
                          <DropdownMenuItem key={childIndex} asChild>
                            <Link
                              href={child.href}
                              className={`flex w-full items-center px-3 py-2 hover:bg-islamic-50 hover:text-islamic-600 transition-colors duration-300 ${
                                pathname === child.href ? "bg-islamic-50 text-islamic-600 font-medium" : ""
                              }`}
                            >
                              {child.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-gray-700 hover:text-islamic-600 transition-colors duration-300 relative ${
                        pathname === item.href ? "text-islamic-600 font-medium" : ""
                      }`}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <motion.div
                          className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-islamic-500 rounded-full"
                          layoutId="underline"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </motion.nav>
          )}

          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Theme toggle */}
      

            {/* Call to action button (optional example) */}
            <Button className="bg-islamic-600 text-white hover:bg-islamic-700 transition-all duration-300">
              S'inscrire
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
