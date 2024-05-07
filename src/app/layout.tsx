import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

import Header from '@/components/header';
import Footer from '@/components/footer';
import { defaultMeta } from '@/lib/metadata';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = defaultMeta;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  )
}
