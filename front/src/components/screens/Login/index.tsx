'use client'

import style from './Login.module.scss'
import { FormEvent, useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import Link from 'next/link'
import { AuthData } from './interfaces/AuthData'
import { authenticateUserService } from '@/services/user/authenticateUser/AuthenticateUserService'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'
import { saveTokenService } from '@/services/token/saveToken/SaveTokenService'
import { saveLocalUserService } from '@/services/user/saveLocalUser/SaveLocalUserService'
import { Loading } from '@/components/_ui/Loading'
import { UserContext } from '@/contexts/userContext'

export function Login() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const defaultValuesAuthData = {
    email: '',
    password: '',
  }

  const router = useRouter()
  const [authData, setAuthData] = useState<AuthData>(defaultValuesAuthData)
  const [loadingAuthUser, setLoadingAuthUser] = useState<boolean>(false)

  function onAuthenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingAuthUser(true)

    authenticateUserService(authData)
      .then((res) => {
        saveTokenService(res.data.token)
        saveLocalUserService({ userData: res.data.user })
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Usuário autenticado com sucesso',
          type: 'success',
        })
        router.push('/')
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar realizar autenticação - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
        console.log('err', err)
      })
      .finally(() => {
        setLoadingAuthUser(false)
      })
  }

  return (
    <section className={style.loginContainer}>
      <form onSubmit={onAuthenticate}>
        <header>
          <h4>Entrar</h4>
        </header>

        <main>
          <CustomTextField
            label="E-mail"
            className={style.input}
            value={authData.email}
            onChange={(event) => {
              setAuthData({
                ...authData,
                email: event.target.value,
              })
            }}
          />
          <CustomTextField
            label="Senha"
            className={style.input}
            value={authData.password}
            onChange={(event) => {
              setAuthData({
                ...authData,
                password: event.target.value,
              })
            }}
          />
        </main>

        <footer>
          <button disabled={loadingAuthUser} type="submit">
            {loadingAuthUser ? <Loading size={22} /> : 'Entrar'}
          </button>
          <Link className={style.createAccountLink} href="/register">
            Criar conta
          </Link>
        </footer>
      </form>
    </section>
  )
}
