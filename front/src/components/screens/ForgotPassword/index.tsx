'use client'

import style from './ForgotPassword.module.scss'
import { useContext } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'
import { Loading } from '@/components/_ui/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { sendForgotPasswordService } from '@/services/user/sendForgotPassword/SendForgotPassword'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formForgotSchema, IFormForgot } from './interfaces/IFormForgot'

export function ForgotPassword() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

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

  const router = useRouter()

  function onSendMail({ email }: IFormForgot) {
    sendForgotPasswordService(email, httpClientProvider)
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

  return (
    <section className={style.forgotPasswordContainer}>
      <form onSubmit={handleSubmit(onSendMail)}>
        <header>
          <button
            type="button"
            onClick={router.back}
            className={style.backButton}
          >
            <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
          </button>
          <h4>Recuperar senha</h4>
        </header>

        <main>
          <CustomTextField
            label="E-mail"
            type="email"
            className={style.input}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
        </main>

        <footer>
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loading size={21} /> : 'Enviar'}
          </button>
        </footer>
      </form>
    </section>
  )
}
