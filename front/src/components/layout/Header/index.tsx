'use client'
import style from './Header.module.scss'
import { CustomAvatar } from '@/components/_ui/CustomAvatar'
import {
  faHouse,
  faCircleInfo,
  faAddressCard,
  faGears,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '@/contexts/userContext'
import Link from '../../../../node_modules/next/link'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
  const { userInfo } = useContext(UserContext)
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<string>(getDefaultMenu())
  const router = useRouter()

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

  useEffect(() => {
    if (pathname === '/') {
      setActiveMenu('')
      return
    }
    setActiveMenu(getDefaultMenu())
  }, [pathname])

  return (
    <header className={style.headerContainer}>
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
                handleChangeMenuItem('management')
              }}
              className={style.managementMenuItem}
            >
              <FontAwesomeIcon icon={faGears} />
              <span>Gestão</span>
            </li>
          )}
        </ul>
      </nav>

      {userInfo ? (
        <CustomAvatar
          direction={{
            position: {
              horizontal: 'left',
              vertical: 'bottom',
            },
            origin: {
              horizontal: 'right',
              vertical: 'top',
            },
          }}
        />
      ) : (
        <Link className={style.loginButton} href="/authenticate">
          Log in
        </Link>
      )}
    </header>
  )
}
