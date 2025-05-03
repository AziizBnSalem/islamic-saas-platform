import type { ReactNode } from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageTransition } from "@/components/ui/page-transition"
import { SplashScreen } from "@/components/splash-screen"
import TawkToChat from "@/components/TawkToChat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IslamiC Platform",
  icons : {
    icon: "/favicon.ico",
  }, 
  manifest: "/manifest.json", // 👈 PWA manifest
  description:
    "Une plateforme SaaS complète pour les écoles islamiques, les ressources religieuses et la communauté musulmane",
  generator: "IslamiC",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SplashScreen />
          <Header />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
          <TawkToChat />
        </ThemeProvider>
      </body>
    </html>
  )
}