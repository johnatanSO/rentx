import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { sendForgotPasswordService } from '@/services/user/sendForgotPassword/SendForgotPassword'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formForgotSchema, IFormForgot } from '../interfaces/IFormForgot'
import { useRouter } from 'next/navigation'

export function useForgotPassword() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormForgot>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(formForgotSchema),
  })

  async function onSendMail({ email }: IFormForgot) {
    await sendForgotPasswordService(email, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'E-mail de recuperação enviado com sucesso',
          type: 'success',
        })

        reset()

        router.push('/authenticate')
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar recuperar senha - ${err?.message}`,
          type: 'error',
        })
      })
  }

  return {
    onSendMail,
    errors,
    isSubmitting,
    register,
    handleSubmit,
    router,
  }
}
