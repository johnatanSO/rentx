'use client'

import style from './CreateAccount.module.scss'
import { useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import Link from 'next/link'
import { Checkbox, FormControlLabel, Popover, Typography } from '@mui/material'
import { INewUser, newUserSchema } from './interfaces/INewUser'
import { createNewUserService } from '@/services/user/createNewUser/CreateNewUserService'
import { AlertContext } from '@/contexts/alertContext'
import { Loading } from '@/components/_ui/Loading'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function CreateAccount() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isLoading },
  } = useForm<INewUser>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      driverLicense: '',
      isAdmin: false,
    },
    resolver: zodResolver(newUserSchema),
  })

  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const [password, confirmPassword, isAdmin] = watch([
    'password',
    'confirmPassword',
    'isAdmin',
  ])

  function onRegister(newUser: INewUser) {
    createNewUserService(newUser, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Usuário cadastrado com sucesso',
          type: 'success',
        })

        reset()

        router.refresh()
        router.push('/authenticate')
      })
      .catch((err) => {
        console.log(
          `Erro ao tentar realizar cadastro de usuário - ${err?.message}`,
        )
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar realizar cadastro de usuário - ${err?.message}`,
          type: 'error',
        })
      })
  }

  function getConfirmPasswordErrorMessage() {
    if (errors.confirmPassword) return errors.confirmPassword.message

    if (password !== confirmPassword) return 'Senhas são diferentes'

    return undefined
  }

  return (
    <section className={style.createAccountContainer}>
      <form onSubmit={handleSubmit(onRegister)}>
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
            {...register('name', { required: true })}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />

          <CustomTextField
            fullWidth
            type="email"
            label="E-mail"
            required
            className={style.input}
            {...register('email', { required: true })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
          <div className={style.passwordContainer}>
            <CustomTextField
              fullWidth
              type="password"
              label="Senha"
              required
              className={style.input}
              {...register('password', { required: true })}
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
            />

            <CustomTextField
              fullWidth
              type="password"
              label="Confirmar senha"
              required
              className={style.input}
              {...register('confirmPassword', { required: true })}
              error={!!errors.confirmPassword || password !== confirmPassword}
              helperText={getConfirmPasswordErrorMessage()}
            />
          </div>
          <CustomTextField
            fullWidth
            type="text"
            label="Nº da carteira"
            required
            className={style.input}
            {...register('driverLicense', { required: true })}
            error={!!errors.driverLicense}
            helperText={errors.driverLicense && errors.driverLicense.message}
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
              onChange={(event) => {
                const target = event.target as unknown
                const isAdminValue = (target as { checked: boolean }).checked

                setValue('isAdmin', isAdminValue)
              }}
              control={
                <Checkbox
                  sx={{
                    marginLeft: '0.7rem',
                    '&.Mui-checked': { color: '#536d88' },
                  }}
                  checked={isAdmin}
                />
              }
            />

            <FontAwesomeIcon
              onClick={(event) => {
                const eventTyped = event as unknown
                const currentTarget = (
                  eventTyped as { currentTarget: HTMLElement }
                ).currentTarget

                setAnchorEl(currentTarget)
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
              sx={{ borderRadius: 4 }}
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? <Loading size={22} /> : 'Criar conta'}
          </button>
          <Link className={style.createAccountLink} href="/authenticate">
            Entrar com conta existente
          </Link>
        </footer>
      </form>
    </section>
  )
}
