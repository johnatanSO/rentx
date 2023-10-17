import { SidebarManagement } from '@/components/layout/SidebarManagement'
import { AlertContextComponent } from '@/contexts/alertContext'
import { UserContextComponent } from '@/contexts/userContext'
import '@/styles/global.scss'

export const metadata = {
  title: 'Gestão',
  description: 'Seção de gestão do sistema',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserContextComponent>
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
