'use client'

import style from './ModalAccountConfigs.module.scss'
import { ModalLayout } from '../../ModalLayout'
import { Avatar } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCancel, faPen } from '@fortawesome/free-solid-svg-icons'
import { CustomTextField } from '../../CustomTextField'
import { useEditUser } from '../hooks/useEditUser'

type Props = {
  open: boolean
  avatarURL: string | undefined
  handleClose: () => void
}

export function ModalAccountConfigs({ open, handleClose, avatarURL }: Props) {
  const {
    editMode,
    errors,
    handleSetImage,
    handleSubmit,
    isSubmitting,
    onUpdateUserInfos,
    register,
    setEditMode,
    userInfo,
  } = useEditUser()

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      title="Configurações da conta"
      loading={isSubmitting}
      submitButtonText={editMode ? 'Salvar' : undefined}
      onSubmit={editMode ? handleSubmit(onUpdateUserInfos) : undefined}
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
            {...register('name', { required: true })}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />
        ) : (
          <h5>Nome: {userInfo?.name || '--'}</h5>
        )}

        {editMode ? (
          <CustomTextField
            required
            label="E-mail"
            placeholder="Digite o e-mail"
            {...register('email', { required: true })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
        ) : (
          <h5>E-mail: {userInfo?.email || '--'}</h5>
        )}
      </section>
    </ModalLayout>
  )
}
