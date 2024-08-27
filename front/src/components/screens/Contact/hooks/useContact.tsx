import { AlertContext } from '@/contexts/alertContext'
import { sendContactService } from '@/services/user/sendContact/SendContactService'
import { useContext } from 'react'
import { formContactSchema, IFormContact } from '../interfaces/IFormContact'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function useContact() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IFormContact>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    resolver: zodResolver(formContactSchema),
  })

  function onSendForm(formContact: IFormContact) {
    sendContactService(formContact, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Mensagem enviada com sucesso, em breve entraremos em contato',
          type: 'success',
        })

        reset()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar enviar mensagem - ${err?.message}`,
          type: 'error',
        })
      })
  }

  return {
    onSendForm,
    register,
    handleSubmit,
    isSubmitting,
    errors,
  }
}
