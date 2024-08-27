'use client'
import style from './Header.module.scss'
import { CustomAvatar } from '@/components/_ui/CustomAvatar'
import {
  faHouse,
  faCircleInfo,
  faAddressCard,
  faGears,
  faBookmark,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from '../../../../node_modules/next/link'
import { useHeader } from './hooks/useHeader'

export function Header() {
  const {
    getActiveMenu,
    handleChangeMenuItem,
    menuMobileOpened,
    setMenuMobileOpened,
    userInfo,
  } = useHeader()

  return (
    <header className={style.headerContainer}>
      <button
        onClick={() => {
          setMenuMobileOpened(!menuMobileOpened)
        }}
        type="button"
        className={style.mobileMenuButton}
      >
        <FontAwesomeIcon className={style.icon} icon={faBars} />
        Menu
      </button>

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
