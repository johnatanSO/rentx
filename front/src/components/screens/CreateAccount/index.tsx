'use client'

import style from './CreateAccount.module.scss'
import { FormEvent } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import Link from 'next/link'

export function CreateAccount() {
  async function onRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <section className={style.loginContainer}>
      <form onSubmit={onRegister}>
        <header>
          <h4>Criar nova conta</h4>
        </header>

        <main>
          <CustomTextField className={style.input} label="E-mail" />
          <CustomTextField className={style.input} label="Nome" />
          <CustomTextField className={style.input} label="Senha" />
          <CustomTextField className={style.input} label="Confirmar senha" />
        </main>

        <footer>
          <button type="submit">Entrar</button>
          <Link className={style.createAccountLink} href="/authenticate">
            Entrar com conta existente
          </Link>
        </footer>
      </form>
    </section>
  )
}
