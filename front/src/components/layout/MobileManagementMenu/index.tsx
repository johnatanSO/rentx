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
import Link from 'next/link'
import { CustomAvatar } from '@/components/_ui/CustomAvatar'
import { useMobileManagementMenu } from './hooks/useMobileManagementMenu'

export function MobileManagementMenu() {
  const { getActiveMenu, handleChangeMenuItem } = useMobileManagementMenu()

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
