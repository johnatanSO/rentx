import { useContext } from 'react'
import { INewUser, newUserSchema } from '../interfaces/INewUser'
import { createNewUserService } from '@/services/user/createNewUser/CreateNewUserService'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function useCreateAccount() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<INewUser>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      driverLicense: '',
      isAdmin: false,
    },
    resolver: zodResolver(newUserSchema),
  })

  const isAdmin = watch('isAdmin')

  async function onRegister(newUser: INewUser) {
    await createNewUserService(newUser, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Usuário cadastrado com sucesso',
          type: 'success',
        })

        reset()

        router.refresh()
        router.push('/authenticate')
      })
      .catch((err) => {
        console.log(
          `Erro ao tentar realizar cadastro de usuário - ${err?.message}`,
        )
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar realizar cadastro de usuário - ${err?.message}`,
          type: 'error',
        })
      })
  }

  return {
    register,
    handleSubmit,
    onRegister,
    isAdmin,
    isSubmitting,
    setValue,
    errors,
  }
}
