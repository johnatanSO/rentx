'use client'

import style from './CustomAvatar.module.scss'
import { UserContext } from '@/contexts/userContext'
import { deleteTokenService } from '@/services/token/deleteToken/DeleteTokenService'
import { deleteLocalUserService } from '@/services/user/deleteLocalUser/DeleteLocalUserService'
import { faAngleLeft, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { ModalAccountConfigs } from './ModalAccountConfigs'
import { deleteRefreshTokenService } from '@/services/token/deleteRefreshToken/DeleteRefreshTokenService'

type Props = {
  direction?: {
    position: {
      horizontal: number | 'center' | 'right' | 'left'
      vertical: number | 'center' | 'top' | 'bottom'
    }
    origin: {
      horizontal: number | 'center' | 'right' | 'left'
      vertical: number | 'center' | 'top' | 'bottom'
    }
  }
}

export function CustomAvatar({ direction }: Props) {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [modalAccountConfigsOpened, setModalAccountConfigsOpened] =
    useState<boolean>(false)

  function handleClick(event: { currentTarget: HTMLElement }) {
    setAnchorEl(event.currentTarget)
  }

  function logout() {
    deleteTokenService()
    deleteRefreshTokenService()
    deleteLocalUserService()
    setUserInfo(null)

    handleCloseMenu()

    router.push('/')
  }

  function handleCloseMenu() {
    setAnchorEl(null)
  }

  return (
    <>
      <Avatar
        className={style.avatar}
        onClick={handleClick}
        alt={userInfo?.name}
        src={userInfo?.avatarURL}
      />

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        transformOrigin={
          direction
            ? direction.position
            : { horizontal: 'right', vertical: 'top' }
        }
        anchorOrigin={
          direction
            ? direction.origin
            : { horizontal: 'right', vertical: 'bottom' }
        }
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(1px 3px 8px rgba(0 0 0 / 0.2))',
            mt: 1.5,
            borderRadius: 4,
            '& .MuiAvatar-root': {
              width: 27,
              height: 27,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            setModalAccountConfigsOpened(true)
            handleCloseMenu()
          }}
          className={style.menuItem}
        >
          <FontAwesomeIcon className={style.icon} icon={faUser} />
          <span>{userInfo?.name || 'Sua conta'}</span>
        </MenuItem>

        <MenuItem onClick={logout} className={style.menuItem}>
          <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
          <span>Sair</span>
        </MenuItem>
      </Menu>

      <ModalAccountConfigs
        open={modalAccountConfigsOpened}
        avatarURL={userInfo?.avatarURL}
        handleClose={() => {
          setModalAccountConfigsOpened(false)
        }}
      />
    </>
  )
}
