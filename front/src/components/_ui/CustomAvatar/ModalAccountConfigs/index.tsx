'use client'

import style from './ModalAccountConfigs.module.scss'
import { FormEvent, useContext, useState } from 'react'
import { ModalLayout } from '../../ModalLayout'
import { updateAvatarService } from '@/services/user/updateAvatar/UpdateAvatarService'
import { Avatar } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCancel, faPen } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '@/contexts/userContext'
import { AlertContext } from '@/contexts/alertContext'
import { updateUserInfosService } from '@/services/user/updateUserInfos/UpdateUserInfosService'
import { CustomTextField } from '../../CustomTextField'
import { NewValuesUserInfos } from './interfaces/NewValuesUserInfos'

type Props = {
  open: boolean
  avatarURL: string | undefined
  handleClose: () => void
}

export function ModalAccountConfigs({ open, handleClose, avatarURL }: Props) {
  const { userInfo, setUserInfo } = useContext(UserContext)

  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [loadingUpdateUserInfos, setLoadingUpdateUserInfos] =
    useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [newValuesUserInfos, setNewValuesUserInfos] =
    useState<NewValuesUserInfos>(userInfo as NewValuesUserInfos)

  function onUpdateUserInfos(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateUserInfosService(newValuesUserInfos)
      .then((res) => {
        setUserInfo({
          ...userInfo,
          ...res.data.user,
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações de usuário - ${err?.message}`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingUpdateUserInfos(false)
        setEditMode(false)
      })
  }

  function onUpdateAvatar(avatarImage: File) {
    updateAvatarService(avatarImage)
      .then((res) => {
        setUserInfo({
          ...userInfo,
          ...res.data.user,
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar avatar - ${err?.message}`,
          type: 'error',
        })
      })
  }

  function handleSetImage() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement

      const file = (target.files || [])[0] as File

      onUpdateAvatar(file)
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
          {editMode ? (
            <button
              onClick={() => {
                setEditMode(false)
              }}
              type="button"
              className={style.cancelButton}
            >
              <FontAwesomeIcon icon={faCancel} className={style.icon} />
              Cancelar
            </button>
          ) : (
            <button
              onClick={() => {
                setEditMode(true)
              }}
              type="button"
              className={style.editButton}
            >
              <FontAwesomeIcon icon={faPen} className={style.icon} />
              Editar
            </button>
          )}
        </header>
        {editMode ? (
          <CustomTextField
            required
            label="Nome"
            placeholder="Digite um nome"
            value={newValuesUserInfos?.name}
            onChange={(event) => {
              setNewValuesUserInfos({
                ...newValuesUserInfos,
                name: event.target.value,
              })
            }}
          />
        ) : (
          <h5>Nome: {userInfo?.name || '--'}</h5>
        )}

        {editMode ? (
          <CustomTextField
            required
            label="E-mail"
            placeholder="Digite o e-mail"
            value={newValuesUserInfos?.email}
            onChange={(event) => {
              setNewValuesUserInfos({
                ...newValuesUserInfos,
                email: event.target.value,
              })
            }}
          />
        ) : (
          <h5>E-mail: {userInfo?.email || '--'}</h5>
        )}
      </section>
    </ModalLayout>
  )
}
