'use client'

import { FormEvent } from 'react'
import style from './Login.module.scss'

export function Login() {
  async function onAuthenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <section className={style.loginContainer}>
      <form onSubmit={onAuthenticate}>
        <header>Entrar com uma conta existente</header>

        <main></main>

        <footer>
          <button type="submit">Entrar</button>
        </footer>
      </form>
    </section>
  )
}
