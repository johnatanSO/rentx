import { LayoutContext } from '@/contexts/layoutContext'
import { UserContext } from '@/contexts/userContext'
import { useContext, useState } from 'react'
import style from './MobileMenuDrawer.module.scss'
import { usePathname, useRouter } from 'next/navigation'

export function useMobileMenuDrawer() {
  const { userInfo } = useContext(UserContext)
  const { menuMobileOpened, setMenuMobileOpened } = useContext(LayoutContext)

  const router = useRouter()
  const pathname = usePathname()

  const [activeMenu, setActiveMenu] = useState<string>(getDefaultMenu())

  function getDefaultMenu() {
    if (pathname.includes('/rentals')) return 'rentals'
    if (pathname.includes('/favoriteds')) return 'favoriteds'
    if (pathname.includes('/about')) return 'about'
    if (pathname.includes('/contact')) return 'contact'
    if (pathname.includes('/management')) return 'management'
    return ''
  }

  function getActiveMenu(menuName: string) {
    if (activeMenu === menuName) {
      return style.menuActive
    }

    return undefined
  }

  function handleChangeMenuItem(menuName: string) {
    setActiveMenu(menuName)
    router.push(`/${menuName}`)
    setMenuMobileOpened(false)
  }

  return {
    getActiveMenu,
    handleChangeMenuItem,
    menuMobileOpened,
    userInfo,
    setMenuMobileOpened,
  }
}
