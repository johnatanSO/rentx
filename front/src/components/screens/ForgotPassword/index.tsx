'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './ForgotPassword.module.scss'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Loading } from '@/components/_ui/Loading'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useForgotPassword } from './hooks/useForgotPassword'

export function ForgotPassword() {
  const { errors, handleSubmit, isSubmitting, onSendMail, register, router } =
    useForgotPassword()

  return (
    <section className={style.forgotPasswordContainer}>
      <form onSubmit={handleSubmit(onSendMail)}>
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
            label="E-mail"
            type="email"
            className={style.input}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
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
