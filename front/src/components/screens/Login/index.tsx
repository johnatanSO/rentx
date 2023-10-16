'use client'

import style from './Login.module.scss'
import { FormEvent } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import Link from 'next/link'

export function Login() {
  async function onAuthenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <section className={style.loginContainer}>
      <form onSubmit={onAuthenticate}>
        <header>
          <h4>Entrar</h4>
        </header>

        <main>
          <CustomTextField className={style.input} label="E-mail" />
          <CustomTextField className={style.input} label="Senha" />
        </main>

        <footer>
          <button type="submit">Entrar</button>
          <Link className={style.createAccountLink} href="/register">
            Criar conta
          </Link>
        </footer>
      </form>
    </section>
  )
}
