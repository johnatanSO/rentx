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

type Props = {
  direction?: string
}

export function CustomAvatar({ direction }: Props) {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const avatarURL = userInfo?.avatar
    ? process.env.NEXT_PUBLIC_END_POINT + userInfo?.avatar
    : ''

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget)
  }

  function logout() {
    deleteTokenService()
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
        src={avatarURL}
      />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
            router.push('/management/account')
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
    </>
  )
}
