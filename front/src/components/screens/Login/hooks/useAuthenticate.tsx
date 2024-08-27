import { useContext } from 'react'
import { authenticateUserService } from '@/services/user/authenticateUser/AuthenticateUserService'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'
import { saveTokenService } from '@/services/token/saveToken/SaveTokenService'
import { saveLocalUserService } from '@/services/user/saveLocalUser/SaveLocalUserService'
import { saveRefreshToken } from '@/services/token/saveRefreshToken/SaveRefreshToken'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { formAuthSchema, IFormAuth } from '../interfaces/IFormAuth'
import { zodResolver } from '@hookform/resolvers/zod'

export function useAuthenticate() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormAuth>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formAuthSchema),
  })

  const router = useRouter()

  function onAuthenticate(formAuth: IFormAuth) {
    authenticateUserService(formAuth, httpClientProvider)
      .then((res) => {
        saveTokenService(res.data.token)
        saveRefreshToken(res.data.refreshToken)
        saveLocalUserService({ userData: res.data.user })

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Usuário autenticado com sucesso',
          type: 'success',
        })

        reset()

        router.push('/')
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar realizar autenticação - ${err?.message}`,
          type: 'error',
        })
        console.log(`Erro ao tentar realizar autenticação - ${err?.message}`)
      })
  }

  return {
    onAuthenticate,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  }
}
