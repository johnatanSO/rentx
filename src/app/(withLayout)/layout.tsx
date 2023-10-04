import { Footer } from '@/layout/Footer'
import { Header } from '@/layout/Header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RentX',
  description: 'Alugue o seu carro.',
}

type Props = {
  children: React.ReactNode
}

export default function WithLayout({
  children,
}: Props) {
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
