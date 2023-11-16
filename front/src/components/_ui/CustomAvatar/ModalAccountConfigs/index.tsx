'use client'
import style from './ModalAccountConfigs.module.scss'
import { FormEvent, useState } from 'react'
import { ModalLayout } from '../../ModalLayout'
import { updateAvatarService } from '@/services/user/updateAvatar/UpdateAvatarService'
import { Avatar } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

type Props = {
  open: boolean
  avatarURL: string
  handleClose: () => void
}

export function ModalAccountConfigs({ open, handleClose, avatarURL }: Props) {
  const [loadingUpdateUserInfos, setLoadingUpdateUserInfos] =
    useState<boolean>(false)
  function onUpdateUserInfos(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function onUpdateAvatar(avatarImage: any) {
    updateAvatarService(avatarImage)
  }

  function handleSetImage() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.onchange = (event: any) => {
      onUpdateAvatar(event.target.files[0])
    }

    inputFile.click()
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      title="Configurações da conta"
      loading={loadingUpdateUserInfos}
      submitButtonText="Salvar"
      onSubmit={onUpdateUserInfos}
    >
      <section className={style.avatarSection}>
        <Avatar className={style.avatar} alt="Avatar" src={avatarURL} />
        <button
          className={style.updateAvatarButton}
          type="button"
          onClick={handleSetImage}
        >
          <FontAwesomeIcon className={style.icon} icon={faCamera} />
          Editar avatar
        </button>
      </section>
    </ModalLayout>
  )
}
