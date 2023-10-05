import '@/styles/global.scss'
import { Footer } from '@/layout/Footer'
import { Header } from '@/layout/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RentX',
  description: 'RENTX DESCRIPTION.',
}

type Props = {
  children: React.ReactNode
}

export default function WithLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  )
}
