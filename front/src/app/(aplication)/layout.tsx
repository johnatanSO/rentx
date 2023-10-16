import '@/styles/global.scss'
import { Footer } from '@/components/layout/Footer/index'
import { Header } from '@/components/layout/Header/index'
import type { Metadata } from 'next'
import { AlertContextComponent } from '@/contexts/alertContext'
import { UserContextComponent } from '@/contexts/userContext'

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
        <UserContextComponent>
          <AlertContextComponent>
            <Header />

            <main className="main">{children}</main>

            <Footer />
          </AlertContextComponent>
        </UserContextComponent>
      </body>
    </html>
  )
}
