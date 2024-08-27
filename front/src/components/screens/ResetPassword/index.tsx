'use client'

import style from './ResetPassword.module.scss'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Loading } from '@/components/_ui/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useResetPassword } from './hooks/useResetPassword'

type Props = {
  refreshToken: string
}

export function ResetPassword({ refreshToken }: Props) {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    onResetPassword,
    register,
    router,
  } = useResetPassword({ refreshToken })

  return (
    <section className={style.forgotPasswordContainer}>
      <form onSubmit={handleSubmit(onResetPassword)}>
        <header>
          <button
            type="button"
            onClick={router.back}
            className={style.backButton}
          >
            <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
          </button>
          <h4>Recuperar senha</h4>
        </header>

        <main>
          <CustomTextField
            label="Nova senha"
            type="password"
            className={style.input}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
          <CustomTextField
            label="Confirmar nova senha"
            type="password"
            className={style.input}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
        </main>

        <footer>
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loading size={21} /> : 'Enviar'}
          </button>
        </footer>
      </form>
    </section>
  )
}
