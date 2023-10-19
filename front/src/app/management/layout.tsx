import { SidebarManagement } from '@/components/layout/SidebarManagement'
import { AlertContextComponent } from '@/contexts/alertContext'
import { UserContextComponent } from '@/contexts/userContext'
import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'
import '@/styles/global.scss'

export const metadata = {
  title: 'Gestão',
  description: 'Seção de gestão do sistema',
}

type Props = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  const serverUserInfo = await getLocalUserService()

  return (
    <html lang="en">
      <body>
        <UserContextComponent serverUserInfo={serverUserInfo}>
          <AlertContextComponent>
            <main className="managementContainer">
              <SidebarManagement />
              <div className="managementSections">{children}</div>
            </main>
          </AlertContextComponent>
        </UserContextComponent>
      </body>
    </html>
  )
}
