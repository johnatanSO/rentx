'use client'
import { Drawer } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import style from './MobileMenuDrawer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressCard,
  faBookmark,
  faCircleInfo,
  faGears,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '@/contexts/userContext'

export function MobileMenuDrawer() {
  const { userInfo } = useContext(UserContext)

  const router = useRouter()
  const pathname = usePathname()

  const [activeMenu, setActiveMenu] = useState<string>(getDefaultMenu())
  const [menuOpened, setMenuOpened] = useState<boolean>(true)

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
  }

  return (
    <Drawer
      anchor="left"
      open={menuOpened}
      onClose={() => {
        setMenuOpened(false)
      }}
    >
      <nav>
        <ul>
          <li
            onClick={() => {
              handleChangeMenuItem('')
            }}
            className={getActiveMenu('')}
          >
            <FontAwesomeIcon icon={faHouse} />
            <span>Home</span>
          </li>
          {userInfo && (
            <>
              <li
                onClick={() => {
                  handleChangeMenuItem('rentals')
                }}
                className={getActiveMenu('rentals')}
              >
                <FontAwesomeIcon icon={faCircleInfo} />
                <span>Meus alugueis</span>
              </li>
              <li
                onClick={() => {
                  handleChangeMenuItem('favoriteds')
                }}
                className={getActiveMenu('favoriteds')}
              >
                <FontAwesomeIcon icon={faBookmark} />
                <span>Carros favoritos</span>
              </li>
            </>
          )}
          <li
            onClick={() => {
              handleChangeMenuItem('about')
            }}
            className={getActiveMenu('about')}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            <span>Sobre</span>
          </li>
          <li
            onClick={() => {
              handleChangeMenuItem('contact')
            }}
            className={getActiveMenu('contact')}
          >
            <FontAwesomeIcon icon={faAddressCard} />
            <span>Contato</span>
          </li>

          {userInfo?.isAdmin && (
            <li
              onClick={() => {
                handleChangeMenuItem('management/cars')
              }}
              className={style.managementMenuItem}
            >
              <FontAwesomeIcon icon={faGears} />
              <span>Gestão</span>
            </li>
          )}
        </ul>
      </nav>
    </Drawer>
  )
}
