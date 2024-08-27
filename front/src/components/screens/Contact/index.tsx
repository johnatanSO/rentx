'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Loading } from '@/components/_ui/Loading'
import { Divider } from '@mui/material'
import style from './Contact.module.scss'
import { useContact } from './hooks/useContact'

export function Contact() {
  const { errors, handleSubmit, isSubmitting, onSendForm, register } =
    useContact()

  return (
    <section className={style.contactContainer}>
      <header>
        <h2>Contatos</h2>
      </header>

      <section>
        <form onSubmit={handleSubmit(onSendForm)}>
          <CustomTextField
            fullWidth
            label="Nome"
            placeholder="Digite o seu nome"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />

          <CustomTextField
            fullWidth
            label="E-mail"
            placeholder="Digite o seu e-mail"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />

          <CustomTextField
            fullWidth
            label="Mensagem"
            placeholder="Digite aqui a sua mensagem"
            multiline
            rows={5}
            {...register('message')}
            error={!!errors.message}
            helperText={errors.message && errors.message.message}
          />

          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loading size={21} /> : 'Enviar'}
          </button>
        </form>

        <Divider flexItem orientation="vertical" />
        <Divider
          className={style.mobileDivider}
          flexItem
          orientation="horizontal"
        />

        <div className={style.textInfo}>
          <p>
            Ficou alguma dúvida sobre o sistema? Envie este formulário que te
            responderemos por e-mail
          </p>
        </div>
      </section>
    </section>
  )
}
