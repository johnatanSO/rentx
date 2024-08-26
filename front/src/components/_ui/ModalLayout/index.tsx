/* eslint-disable @typescript-eslint/no-explicit-any */
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Box } from '@mui/material'
import { CSSProperties, ReactNode } from 'react'
import style from './ModalLayout.module.scss'
import { Loading } from '@/components/_ui/Loading'

interface Props {
  title: string
  open: boolean
  submitButtonText?: string
  children: ReactNode
  handleClose: () => void
  onSubmit?: (data: any) => void | Promise<void>
  loading?: boolean
  customStyle?: CSSProperties
  buttonStyle?: CSSProperties
}

export function ModalLayout({
  title,
  open,
  submitButtonText,
  handleClose,
  children,
  onSubmit,
  loading,
  customStyle,
  buttonStyle,
}: Props) {
  return (
    <Modal className={style.overlay} open={open} onClose={handleClose}>
      <Box
        style={customStyle ?? customStyle}
        className={style.container}
        onSubmit={onSubmit || (() => undefined)}
        component="form"
      >
        <Box className={style.header} component="header">
          <h3>{title || 'Modal'}</h3>
          <FontAwesomeIcon
            onClick={handleClose}
            className={style.closeButton}
            icon={faXmark}
          />
        </Box>

        <Box className={style.mainContent} component="main">
          {children}
        </Box>
        {onSubmit && (
          <Box className={style.footer} component="footer">
            <button
              style={buttonStyle ?? buttonStyle}
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <Loading size={19} />
              ) : (
                submitButtonText || 'Confirmar'
              )}
            </button>
          </Box>
        )}
      </Box>
    </Modal>
  )
}
