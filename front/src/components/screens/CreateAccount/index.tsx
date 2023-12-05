'use client'

import style from './CreateAccount.module.scss'
import { FormEvent, useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import Link from 'next/link'
import { Checkbox, FormControlLabel, Popover, Typography } from '@mui/material'
import { NewUser } from './interfaces/NewUser'
import { createNewUserService } from '@/services/user/createNewUser/CreateNewUserService'
import { AlertContext } from '@/contexts/alertContext'
import { Loading } from '@/components/_ui/Loading'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export function CreateAccount() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultValuesNewUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    driverLicense: '',
    isAdmin: false,
  }

  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [newUserData, setNewUserData] = useState<NewUser>(defaultValuesNewUser)
  const [loadingCreateNewUser, setLoadingCreateNewUser] =
    useState<boolean>(false)

  function onRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoadingCreateNewUser(true)

    createNewUserService(newUserData)
      .then((res) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Usuário cadastrado com sucesso',
          type: 'success',
        })

        router.refresh()
        router.push('/authenticate')
      })
      .catch((err) => {
        console.log(
          `Erro ao tentar realizar cadastro de usuário - ${
            err?.response?.data?.message || err?.message
          }`,
        )
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar realizar cadastro de usuário - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingCreateNewUser(false)
      })
  }

  return (
    <section className={style.loginContainer}>
      <form onSubmit={onRegister}>
        <header>
          <h4>Criar nova conta</h4>
        </header>

        <main>
          <CustomTextField
            fullWidth
            type="text"
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
            fullWidth
            type="email"
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
          <div className={style.passwordContainer}>
            <CustomTextField
              fullWidth
              type="password"
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
              fullWidth
              type="password"
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
          </div>
          <CustomTextField
            fullWidth
            type="text"
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

          <div className={style.handleAdminContainer}>
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
                    marginLeft: '0.7rem',
                    '&.Mui-checked': { color: '#536d88' },
                  }}
                  checked={newUserData.isAdmin}
                />
              }
            />

            <FontAwesomeIcon
              onClick={(event) => {
                setAnchorEl(event?.currentTarget)
              }}
              icon={faInfoCircle}
              className={style.infoIcon}
            />

            <Popover
              id="simple-popover"
              open={!!anchorEl}
              anchorEl={anchorEl}
              onClose={() => {
                setAnchorEl(null)
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{ borderRradius: 4 }}
            >
              <Typography sx={{ p: 2, maxWidth: '300px' }}>
                <p>
                  Usuários com conta de administrador possuem permissão para
                  acessar a aba de gestão do sistema para fazer o controle de
                  carros, categorias e especificações.
                </p>
                <p>*OBS: Isso só está aqui por que é um projeto fictício.</p>
              </Typography>
            </Popover>
          </div>
        </main>

        <footer>
          <button type="submit">
            {loadingCreateNewUser ? <Loading size={22} /> : 'Criar conta'}
          </button>
          <Link className={style.createAccountLink} href="/authenticate">
            Entrar com conta existente
          </Link>
        </footer>
      </form>
    </section>
  )
}
