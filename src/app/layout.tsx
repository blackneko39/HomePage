import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BlackNeko - Kinoshita, Ryosuke',
  description: '🐈‍⬛Welcome to my homepage...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  )
}
