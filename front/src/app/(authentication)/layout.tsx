import { AlertContextComponent } from '@/contexts/alertContext'
import { UserContextComponent } from '@/contexts/userContext'
import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@/styles/global.scss'

config.autoAddCss = false

export const metadata = {
  title: 'Autenticação',
  description: 'Entre com sua conta ou crie uma nova',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const serverUserInfo = await getLocalUserService()
  return (
    <html lang="en">
      <body>
        <UserContextComponent serverUserInfo={serverUserInfo}>
          <AlertContextComponent>
            <main className="authContainerPage">{children}</main>
          </AlertContextComponent>
        </UserContextComponent>
      </body>
    </html>
  )
}
