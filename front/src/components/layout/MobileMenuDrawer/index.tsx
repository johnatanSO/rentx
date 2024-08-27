'use client'

import { Drawer } from '@mui/material'
import style from './MobileMenuDrawer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressCard,
  faBookmark,
  faCircleInfo,
  faGears,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'
import { useMobileMenuDrawer } from './hooks/useMobileMenuDrawer'

export function MobileMenuDrawer() {
  const {
    getActiveMenu,
    setMenuMobileOpened,
    handleChangeMenuItem,
    menuMobileOpened,
    userInfo,
  } = useMobileMenuDrawer()

  return (
    <Drawer
      anchor="left"
      className={style.drawerContainer}
      open={menuMobileOpened}
      onClose={() => {
        setMenuMobileOpened(false)
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
