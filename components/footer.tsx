import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Produit",
      links: [
        { label: "Fonctionnalités", href: "/features" },
        { label: "Tarifs", href: "/pricing" },
        { label: "Témoignages", href: "/testimonials" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Tutoriels", href: "/tutorials" },
        { label: "Documentation", href: "/docs" },
        { label: "Communauté", href: "/community" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { label: "À Propos", href: "/about" },
        { label: "Équipe", href: "/team" },
        { label: "Carrières", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "Conditions d'utilisation", href: "/terms" },
        { label: "Politique de confidentialité", href: "/privacy" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Youtube className="h-5 w-5" />, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 islamic-bg opacity-30"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6 group">
              <div className="w-10 h-10 rounded-full bg-islamic-600 flex items-center justify-center text-white font-bold text-xl mr-2 transition-transform group-hover:scale-110 duration-300">
                I
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-islamic-600 transition-colors duration-300">
                IslamiC
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Une plateforme SaaS complète pour les écoles islamiques, les ressources religieuses et la communauté
              musulmane.
            </p>
            <div className="space-y-4">
              <div className="flex items-start group hover-lift">
                <MapPin className="h-5 w-5 text-islamic-600 mr-3 mt-0.5 group-hover:text-islamic-700 transition-colors duration-300" />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                  123 Rue de l'Islam, 75001 Paris, France
                </span>
              </div>
              <div className="flex items-center group hover-lift">
                <Phone className="h-5 w-5 text-islamic-600 mr-3 group-hover:text-islamic-700 transition-colors duration-300" />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                  +33 1 23 45 67 89
                </span>
              </div>
              <div className="flex items-center group hover-lift">
                <Mail className="h-5 w-5 text-islamic-600 mr-3 group-hover:text-islamic-700 transition-colors duration-300" />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                  contact@IslamiC.com
                </span>
              </div>
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="font-semibold text-gray-900 mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="transform transition-transform duration-300 hover:translate-x-1">
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-islamic-600 transition-colors duration-300 flex items-center"
                    >
                      <span className="h-1 w-1 bg-islamic-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-gray-900 mb-3">Abonnez-vous à notre newsletter</h3>
              <div className="flex max-w-md">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="rounded-r-none focus:ring-islamic-500 focus:border-islamic-500"
                />
                <Button className="rounded-l-none bg-islamic-600 hover:bg-islamic-700 transition-all duration-300">
                  S'abonner
                </Button>
              </div>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="h-10 w-10 rounded-full bg-gray-200 hover:bg-islamic-100 flex items-center justify-center text-gray-600 hover:text-islamic-600 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>&copy; {currentYear} IslamiC. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
