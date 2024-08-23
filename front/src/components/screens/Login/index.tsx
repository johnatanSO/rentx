'use client'

import style from './Login.module.scss'
import { FormEvent, useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import Link from 'next/link'

import { authenticateUserService } from '@/services/user/authenticateUser/AuthenticateUserService'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'
import { saveTokenService } from '@/services/token/saveToken/SaveTokenService'
import { Loading } from '@/components/_ui/Loading'
import { saveLocalUserService } from '@/services/user/saveLocalUser/SaveLocalUserService'
import { saveRefreshToken } from '@/services/token/saveRefreshToken/SaveRefreshToken'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { useForm } from 'react-hook-form'
import { IFormAuth } from './interfaces/IFormAuth'

export function Login() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<IFormAuth>({
    defaultValues: {
      email: '',
      password: '',
    },
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

  return (
    <section className={style.loginContainer}>
      <form onSubmit={handleSubmit(onAuthenticate)}>
        <header>
          <h4>Entrar</h4>
        </header>

        <main>
          <CustomTextField
            label="E-mail"
            type="email"
            className={style.input}
            {...register('email', { required: true })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
          <CustomTextField
            label="Senha"
            type="password"
            className={style.input}
            {...register('email', { required: true })}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
        </main>

        <footer>
          <button disabled={isLoading} type="submit">
            {isLoading ? <Loading size={21} /> : 'Entrar'}
          </button>

          <Link className={style.link} href="/register">
            Criar conta
          </Link>

          <Link className={style.link} href="/forgotPassword">
            Esqueceu a senha?
          </Link>
        </footer>
      </form>
    </section>
  )
}
