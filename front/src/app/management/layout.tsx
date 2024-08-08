import { SidebarManagement } from '@/components/layout/SidebarManagement'
import { AlertContextComponent } from '@/contexts/alertContext'
import { UserContextComponent } from '@/contexts/userContext'
import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@/styles/global.scss'
import { MobileManagementMenu } from '@/components/layout/MobileManagementMenu'

config.autoAddCss = false

export const metadata = {
  title: 'Gestão',
  description: 'Área para gestão do sistema',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  const serverUserInfo = getLocalUserService()

  return (
    <html lang="en">
      <body>
        <UserContextComponent serverUserInfo={serverUserInfo}>
          <AlertContextComponent>
            <main className="managementContainer">
              <SidebarManagement />
              <div className="managementSections">{children}</div>
              <MobileManagementMenu />
            </main>
          </AlertContextComponent>
        </UserContextComponent>
      </body>
    </html>
  )
}
