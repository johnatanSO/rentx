import { usePathname, useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import style from './Header.module.scss'
import { UserContext } from '@/contexts/userContext'
import { LayoutContext } from '@/contexts/layoutContext'

export function useHeader() {
  const { userInfo } = useContext(UserContext)
  const { menuMobileOpened, setMenuMobileOpened } = useContext(LayoutContext)

  const pathname = usePathname()
  const router = useRouter()

  function getDefaultMenu() {
    if (pathname.includes('/rentals')) return 'rentals'
    if (pathname.includes('/favoriteds')) return 'favoriteds'
    if (pathname.includes('/about')) return 'about'
    if (pathname.includes('/contact')) return 'contact'
    if (pathname.includes('/management')) return 'management'
    return ''
  }

  const [activeMenu, setActiveMenu] = useState<string>(getDefaultMenu())

  function getActiveMenu(menuName: string) {
    if (activeMenu === menuName) {
      return style.menuActive
    }

    return undefined
  }

  function handleChangeMenuItem(menuName: string) {
    setActiveMenu(menuName)
    router.push(`/${menuName}`)
  }

  useEffect(() => {
    if (pathname === '/') {
      setActiveMenu('')
      return
    }
    setActiveMenu(getDefaultMenu())
  }, [pathname])

  return {
    userInfo,
    handleChangeMenuItem,
    getActiveMenu,
    menuMobileOpened,
    setMenuMobileOpened,
  }
}
