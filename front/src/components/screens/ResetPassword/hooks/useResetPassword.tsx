import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'
import { resetPasswordService } from '@/services/user/resetPassword/ResetPasswordService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  formResetPasswordSchema,
  IFormResetPassword,
} from '../interfaces/IFormResetPassword'

type Props = {
  refreshToken: string
}

export function useResetPassword({ refreshToken }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormResetPassword>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(formResetPasswordSchema),
  })

  const router = useRouter()

  function onResetPassword({ password, confirmPassword }: IFormResetPassword) {
    resetPasswordService(
      { password, confirmPassword, refreshToken },
      httpClientProvider,
    )
      .then(() => {
        reset()

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Senha alterada com sucesso',
          type: 'success',
        })

        router.push('/authenticate')
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar alterar a senha - ${err?.message}`,
          type: 'error',
        })
      })
  }

  return {
    onResetPassword,
    handleSubmit,
    register,
    errors,
    router,
    isSubmitting,
  }
}
