'use client'

import style from './ResetPassword.module.scss'
import { useContext } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'
import { Loading } from '@/components/_ui/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { resetPasswordService } from '@/services/user/resetPassword/ResetPasswordService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  formResetPasswordSchema,
  IFormResetPassword,
} from './interfaces/IFormResetPassword'

type Props = {
  refreshToken: string
}

export function ResetPassword({ refreshToken }: Props) {
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

  return (
    <section className={style.forgotPasswordContainer}>
      <form onSubmit={handleSubmit(onResetPassword)}>
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
            label="Nova senha"
            type="password"
            className={style.input}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
          <CustomTextField
            label="Confirmar nova senha"
            type="password"
            className={style.input}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword && errors.confirmPassword.message
            }
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
