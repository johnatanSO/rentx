import '@/styles/global.scss'
import { Footer } from '@/components/layout/Footer/index'
import { Header } from '@/components/layout/Header/index'
import type { Metadata } from 'next'
import { AlertContextComponent } from '@/contexts/alertContext'
import { UserContextComponent } from '@/contexts/userContext'
import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { MobileMenuDrawer } from '@/components/layout/MobileMenuDrawer'
import { LayoutContextComponent } from '@/contexts/layoutContext'

config.autoAddCss = false

export const metadata: Metadata = {
  title: 'RentX',
  description: 'Alugue o seu carro aqui',
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
            <LayoutContextComponent>
              <Header />
              <MobileMenuDrawer />

              <main className="main">{children}</main>

              <Footer />
            </LayoutContextComponent>
          </AlertContextComponent>
        </UserContextComponent>
      </body>
    </html>
  )
}
