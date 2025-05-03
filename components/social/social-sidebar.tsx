import { Home, Compass, Bell, Bookmark, User, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SocialSidebar() {
  const menuItems = [
    { icon: <Home size={24} />, label: "Accueil", href: "/social" },
    { icon: <Compass size={24} />, label: "Découvrir", href: "/social/discover" },
    { icon: <Bell size={24} />, label: "Notifications", href: "/social/notifications" },
    { icon: <Bookmark size={24} />, label: "Sauvegardés", href: "/social/saved" },
    { icon: <User size={24} />, label: "Profil", href: "/social/profile" },
  ]

  const secondaryItems = [
    { icon: <Settings size={20} />, label: "Paramètres", href: "/settings" },
    { icon: <HelpCircle size={20} />, label: "Aide", href: "/help" },
  ]

  return (
    <div className="hidden md:flex flex-col w-64 border-r border-gray-200 h-screen sticky top-16 pt-6">
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-emerald-600">IslamicSocial</h2>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2 px-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 py-6 border-t border-gray-200">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mb-4">Créer</Button>

        <ul className="space-y-2">
          {secondaryItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
