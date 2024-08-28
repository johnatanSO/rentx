import { usePathname, useRouter } from 'next/navigation'
import style from '../MobileManagementMenu.module.scss'
import { useState } from 'react'

export function useMobileManagementMenu() {
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<string>(getDefaultMenu())
  const router = useRouter()

  function getDefaultMenu() {
    if (pathname.includes('/cars')) return 'cars'
    if (pathname.includes('/categories')) return 'categories'
    if (pathname.includes('/specifications')) return 'specifications'
    if (pathname.includes('/rentals')) return 'rentals'
    if (pathname.includes('/dev')) return 'dev'
    return ''
  }

  function handleChangeMenuItem(menuName: string) {
    setActiveMenu(menuName)
    router.push(`/management/${menuName}`)
  }

  function getActiveMenu(menuName: string) {
    if (activeMenu === menuName) return style.menuActive

    return undefined
  }

  return {
    handleChangeMenuItem,
    getActiveMenu,
  }
}
