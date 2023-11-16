'use client'
import style from './ModalAccountConfigs.module.scss'
import { FormEvent, useContext, useState } from 'react'
import { ModalLayout } from '../../ModalLayout'
import { updateAvatarService } from '@/services/user/updateAvatar/UpdateAvatarService'
import { Avatar } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '@/contexts/userContext'
import { AlertContext } from '@/contexts/alertContext'
import { updateUserInfosService } from '@/services/user/updateUserInfos/UpdateUserInfosService'

type Props = {
  open: boolean
  avatarURL: string
  handleClose: () => void
}

export function ModalAccountConfigs({ open, handleClose, avatarURL }: Props) {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [loadingUpdateUserInfos, setLoadingUpdateUserInfos] =
    useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)

  function onUpdateUserInfos(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateUserInfosService({ name: '', email: '' })
      .then((res) => {
        console.log('res', res)
        setUserInfo({
          ...userInfo,
          ...res.data.user,
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações de usuário - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingUpdateUserInfos(false)
        setEditMode(false)
      })
  }

  function onUpdateAvatar(avatarImage: any) {
    updateAvatarService(avatarImage)
      .then((res) => {
        console.log('RES', res)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar avatar - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
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
      submitButtonText={editMode ? 'Salvar' : undefined}
      onSubmit={editMode ? onUpdateUserInfos : undefined}
    >
      <section className={style.avatarSection}>
        <h3>Avatar</h3>
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

      <section className={style.userInfosSection}>
        <header>
          <h3>Informações do usuário</h3>
          <button
            onClick={() => {
              setEditMode(true)
            }}
            type="button"
          >
            Editar
          </button>
        </header>
        <h5>{userInfo?.name || '--'}</h5>
        <h5>{userInfo?.email || '--'}</h5>
      </section>
    </ModalLayout>
  )
}
