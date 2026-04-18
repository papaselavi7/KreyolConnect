import './globals.css'
import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'KreyolConnect',
  description: 'Your Companion in America',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ht">
      <body className={`${inter.variable} ${nunito.variable} font-sans antialiased bg-brand-bg max-w-md mx-auto min-h-screen relative shadow-2xl overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
