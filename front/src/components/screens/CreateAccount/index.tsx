'use client'

import style from './CreateAccount.module.scss'
import { useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import Link from 'next/link'
import { Checkbox, FormControlLabel, Popover, Typography } from '@mui/material'
import { Loading } from '@/components/_ui/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useCreateAccount } from './hooks/useCreateAccount'

export function CreateAccount() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const {
    errors,
    handleSubmit,
    isAdmin,
    isSubmitting,
    onRegister,
    register,
    setValue,
  } = useCreateAccount()

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
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loading size={22} /> : 'Criar conta'}
          </button>
          <Link className={style.createAccountLink} href="/authenticate">
            Entrar com conta existente
          </Link>
        </footer>
      </form>
    </section>
  )
}
