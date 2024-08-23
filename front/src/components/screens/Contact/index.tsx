'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Loading } from '@/components/_ui/Loading'
import { AlertContext } from '@/contexts/alertContext'
import { sendContactService } from '@/services/user/sendContact/SendContactService'
import { Divider } from '@mui/material'
import { useContext } from 'react'
import style from './Contact.module.scss'
import { IFormContact } from './interfaces/IFormContact'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { useForm } from 'react-hook-form'

export function Contact() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading, errors },
  } = useForm<IFormContact>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  function onSendForm(formContact: IFormContact) {
    sendContactService(formContact, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Mensagem enviada com sucesso, em breve entraremos em contato',
          type: 'success',
        })

        reset()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar enviar mensagem - ${err?.message}`,
          type: 'error',
        })
      })
  }

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

          <button disabled={isLoading} type="submit">
            {isLoading ? <Loading size={21} /> : 'Enviar'}
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
