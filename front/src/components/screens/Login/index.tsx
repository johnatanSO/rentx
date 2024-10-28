'use client'

import style from './Login.module.scss'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import Link from 'next/link'
import { Loading } from '@/components/_ui/Loading'
import { useAuthenticate } from './hooks/useAuthenticate'

export function Login() {
  const { errors, handleSubmit, isSubmitting, onAuthenticate, register } =
    useAuthenticate()

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
            {...register('password', { required: true })}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
        </main>

        <footer>
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loading size={21} /> : 'Entrar'}
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
