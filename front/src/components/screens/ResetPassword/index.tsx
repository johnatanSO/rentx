'use client'

import style from './ResetPassword.module.scss'
import { FormEvent, useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'
import { Loading } from '@/components/_ui/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { sendForgotPasswordService } from '@/services/user/sendForgotPassword/SendForgotPassword'
import { resetPasswordService } from '@/services/user/resetPassword/ResetPasswordService'

type Props = {
  refreshToken: string
}

export function ResetPassword({ refreshToken }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const router = useRouter()
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loadingResetPassword, setLoadingResetPassword] =
    useState<boolean>(false)

  function onResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingResetPassword(true)

    resetPasswordService({ password, confirmPassword, refreshToken })
      .then(() => {
        router.push('/authenticate')
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Senha alterada com sucesso',
          type: 'success',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar alterar a senha - ${err?.response?.data?.message || err?.message}`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingResetPassword(false)
      })
  }

  return (
    <section className={style.forgotPasswordContainer}>
      <form onSubmit={onResetPassword}>
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
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          <CustomTextField
            label="Confirmar nova senha"
            type="password"
            className={style.input}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value)
            }}
          />
        </main>

        <footer>
          <button disabled={loadingResetPassword} type="submit">
            {loadingResetPassword ? <Loading size={21} /> : 'Enviar'}
          </button>
        </footer>
      </form>
    </section>
  )
}
