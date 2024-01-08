'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './MobileManagementMenu.module.scss'
import {
  faCar,
  faCode,
  faHandHoldingDollar,
  faHouse,
  faTag,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CustomAvatar } from '@/components/_ui/CustomAvatar'

export function MobileManagementMenu() {
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

  return (
    <footer className={style.menuContainer}>
      <Link
        href="/"
        title="Voltar para a aplicação"
        className={style.returnSysLink}
      >
        <FontAwesomeIcon className={style.homeIcon} icon={faHouse} />
      </Link>

      <nav>
        <ul>
          <li
            className={getActiveMenu('cars')}
            onClick={() => {
              handleChangeMenuItem('cars')
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faCar} />
          </li>
          <li
            className={getActiveMenu('categories')}
            onClick={() => {
              handleChangeMenuItem('categories')
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faTag} />
          </li>
          <li
            className={getActiveMenu('specifications')}
            onClick={() => {
              handleChangeMenuItem('specifications')
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faToolbox} />
          </li>
          <li
            className={getActiveMenu('rentals')}
            onClick={() => {
              handleChangeMenuItem('rentals')
            }}
          >
            <FontAwesomeIcon
              className={style.icon}
              icon={faHandHoldingDollar}
            />
          </li>
          <li
            className={getActiveMenu('dev')}
            onClick={() => {
              handleChangeMenuItem('dev')
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faCode} />
          </li>
        </ul>
      </nav>

      <CustomAvatar
        direction={{
          position: {
            horizontal: 'right',
            vertical: 'center',
          },
          origin: {
            horizontal: 'left',
            vertical: 'center',
          },
        }}
      />
    </footer>
  )
}
