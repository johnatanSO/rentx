import { useContext, useState } from 'react'
import { updateAvatarService } from '@/services/user/updateAvatar/UpdateAvatarService'
import { UserContext } from '@/contexts/userContext'
import { AlertContext } from '@/contexts/alertContext'
import { updateUserInfosService } from '@/services/user/updateUserInfos/UpdateUserInfosService'
import {
  INewValuesUserInfo,
  newValuesUserInfoSchema,
} from '../interfaces/INewValuesUserInfo'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function useEditUser() {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<INewValuesUserInfo>({
    defaultValues: userInfo as INewValuesUserInfo,
    resolver: zodResolver(newValuesUserInfoSchema),
  })

  const [editMode, setEditMode] = useState<boolean>(false)

  function onUpdateUserInfos(newValuesUserInfo: INewValuesUserInfo) {
    updateUserInfosService(newValuesUserInfo, httpClientProvider)
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
        setEditMode(false)
      })
  }

  function onUpdateAvatar(avatarImage: File) {
    updateAvatarService(avatarImage, httpClientProvider)
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

  return {
    handleSetImage,
    onUpdateUserInfos,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    editMode,
    setEditMode,
    userInfo,
  }
}
