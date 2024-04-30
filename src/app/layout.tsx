import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] })
const title = 'BlackNeko - Kinoshita, Ryosuke';
const description = "木下亮佑のホームページです";
const url = 'https://blackneko.net'

export const metadata: Metadata = {
  title: title,
  description: description,
  metadataBase: new URL(url),
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: title,
    locale: "ja_JP",
    type: "website",
    images: {
      width: 1200,
      height: 600,
      url: '/me.jpg'
    }
  }
}

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
