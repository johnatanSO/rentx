'use client'
import style from './Header.module.scss'
import { CustomAvatar } from './Avatar'
import {
  faHouse,
  faCircleInfo,
  faAddressCard,
  faGears,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '@/contexts/userContext'
import Link from '../../../../node_modules/next/link'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
  const { userInfo } = useContext(UserContext)
  const [activeMenu, setActiveMenu] = useState<string>('')
  const router = useRouter()
  const pathname = usePathname()

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
    if (pathname === '/') setActiveMenu('')
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
            <li
              onClick={() => {
                handleChangeMenuItem('rentals')
              }}
              className={getActiveMenu('rentals')}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
              <span>Alugueis</span>
            </li>
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
        <CustomAvatar />
      ) : (
        <Link className={style.loginButton} href="/authenticate">
          Log in
        </Link>
      )}
    </header>
  )
}
