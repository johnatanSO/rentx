'use client'

import style from './CreateAccount.module.scss'
import { FormEvent, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import Link from 'next/link'
import { Checkbox, FormControlLabel } from '@mui/material'
import { NewUser } from './interfaces/NewUser'

export function CreateAccount() {
  const defaultValuesNewUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    driverLicense: '',
    isAdmin: false,
  }

  const [newUserData, setNewUserData] = useState<NewUser>(defaultValuesNewUser)

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
          <CustomTextField
            label="Nome"
            required
            className={style.input}
            value={newUserData.name}
            onChange={(event) => {
              setNewUserData({
                ...newUserData,
                name: event?.target.value,
              })
            }}
          />
          <CustomTextField
            label="E-mail"
            required
            className={style.input}
            value={newUserData.email}
            onChange={(event) => {
              setNewUserData({
                ...newUserData,
                email: event?.target.value,
              })
            }}
          />
          <CustomTextField
            label="Senha"
            required
            className={style.input}
            value={newUserData.password}
            onChange={(event) => {
              setNewUserData({
                ...newUserData,
                password: event?.target.value,
              })
            }}
          />
          <CustomTextField
            label="Confirmar senha"
            required
            className={style.input}
            value={newUserData.confirmPassword}
            onChange={(event) => {
              setNewUserData({
                ...newUserData,
                confirmPassword: event?.target.value,
              })
            }}
          />
          <CustomTextField
            label="Nº da carteira"
            required
            className={style.input}
            value={newUserData.driverLicense}
            onChange={(event) => {
              setNewUserData({
                ...newUserData,
                driverLicense: event?.target.value,
              })
            }}
          />
          <FormControlLabel
            label={
              <div className={style.labelCheckboxContainer}>
                <span>Conta de administrador</span>
                <span className={style.helperText}>
                  *Somente para fins de testes
                </span>
              </div>
            }
            onChange={(event: any) => {
              setNewUserData({
                ...newUserData,
                isAdmin: event?.target.checked,
              })
            }}
            control={
              <Checkbox
                sx={{
                  '&.Mui-checked': { color: '#536d88' },
                }}
                checked={newUserData.isAdmin}
              />
            }
          />
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
