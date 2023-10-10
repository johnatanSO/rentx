import { UserContext } from '@/contexts/userContext'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Menu, MenuItem } from '@mui/material'
import { useContext, useState } from 'react'

export function CustomAvatar() {
  const { userInfo } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null)

  const avatarURL = userInfo?.avatar
    ? process.env.NEXT_PUBLIC_END_POINT + userInfo?.avatar
    : ''

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <Avatar onClick={handleClick} alt={userInfo?.name} src={avatarURL} />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
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
        onClose={() => {
          setAnchorEl(null)
        }}
        onClick={() => {
          setAnchorEl(null)
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
          }}
        >
          <Avatar /> Sua conta
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null)
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          Sair
        </MenuItem>
      </Menu>
    </>
  )
}
