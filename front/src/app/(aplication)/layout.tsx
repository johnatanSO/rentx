import '@/styles/global.scss'
import { Footer } from '@/components/layout/Footer/index'
import { Header } from '@/components/layout/Header/index'
import type { Metadata } from 'next'
import { AlertContextComponent } from '@/contexts/alertContext'
import { UserContextComponent } from '@/contexts/userContext'
import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'

export const metadata: Metadata = {
  title: 'RentX',
  description: 'RENTX DESCRIPTION.',
}

type Props = {
  children: React.ReactNode
}

export default async function WithLayout({ children }: Props) {
  const serverUserInfo = await getLocalUserService()

  return (
    <html lang="en">
      <body>
        <UserContextComponent serverUserInfo={serverUserInfo}>
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
