'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './Sidebar.module.scss'
import {
  faAngleLeft,
  faCar,
  faTag,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function SidebarManagement() {
  const [activeMenu, setActiveMenu] = useState<string>('')
  const router = useRouter()

  function handleChangeMenuItem(menuName: string) {
    setActiveMenu(menuName)
    router.push(`/management/${menuName}`)
  }

  return (
    <aside className={style.asideContainer}>
      <Avatar
        sx={{ width: '1.5rem', height: '1.5rem' }}
        className={style.avatar}
      />

      <Link
        href="/"
        title="Voltar para a aplicação"
        className={style.returnSysLink}
      >
        <FontAwesomeIcon className={style.angleIcon} icon={faAngleLeft} />
      </Link>

      <ul>
        <li
          onClick={() => {
            handleChangeMenuItem('cars')
          }}
        >
          <FontAwesomeIcon className={style.icon} icon={faCar} />
        </li>
        <li
          onClick={() => {
            handleChangeMenuItem('categories')
          }}
        >
          <FontAwesomeIcon className={style.icon} icon={faTag} />
        </li>
        <li
          onClick={() => {
            handleChangeMenuItem('specifications')
          }}
        >
          <FontAwesomeIcon className={style.icon} icon={faToolbox} />
        </li>
      </ul>
    </aside>
  )
}
