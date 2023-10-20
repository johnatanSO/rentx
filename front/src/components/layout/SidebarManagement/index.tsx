'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './SidebarManagement.module.scss'
import {
  faCar,
  faHouse,
  faTag,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CustomAvatar } from '@/components/_ui/CustomAvatar'

export function SidebarManagement() {
  const [activeMenu, setActiveMenu] = useState<string>('')
  const router = useRouter()

  function handleChangeMenuItem(menuName: string) {
    setActiveMenu(menuName)
    router.push(`/management/${menuName}`)
  }

  function getActiveMenu(menuName: string) {
    if (activeMenu === menuName) {
      console.log('aaa')
      return style.menuActive
    }

    return undefined
  }

  console.log(activeMenu)

  return (
    <aside className={style.asideContainer}>
      <Link
        href="/"
        title="Voltar para a aplicação"
        className={style.returnSysLink}
      >
        <FontAwesomeIcon className={style.homeIcon} icon={faHouse} />
      </Link>

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
      </ul>

      <CustomAvatar />
    </aside>
  )
}
