'use client'

import style from './ForgotPassword.module.scss'
import { FormEvent, useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'

import { Loading } from '@/components/_ui/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { sendForgotPasswordService } from '@/services/user/sendForgotPassword/SendForgotPassword'

export function ForgotPassword() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [loadingSendMail, setLoadingSendMail] = useState<boolean>(false)

  function onSendMail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingSendMail(true)

    sendForgotPasswordService(email)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'E-mail de recuperação enviado com sucesso',
          type: 'success',
        })
        router.push('/authenticate')
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar recuperar senha - ${err?.response?.data?.message || err?.message}`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingSendMail(false)
      })
  }

  return (
    <section className={style.forgotPasswordContainer}>
      <form onSubmit={onSendMail}>
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
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
        </main>

        <footer>
          <button disabled={loadingSendMail} type="submit">
            {loadingSendMail ? <Loading size={21} /> : 'Enviar'}
          </button>
        </footer>
      </form>
    </section>
  )
}
