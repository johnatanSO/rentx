'use client'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Loading } from '@/components/_ui/Loading'
import { AlertContext } from '@/contexts/alertContext'
import { sendContactService } from '@/services/user/sendContact/SendContactService'
import { Divider } from '@mui/material'
import { FormEvent, useContext, useState } from 'react'
import style from './Contact.module.scss'
import { IFormData } from './interfaces/IFormData'

export function Contact() {
  const defaultValuesFormData = {
    name: '',
    email: '',
    message: '',
  }
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [formData, setFormData] = useState<IFormData>(defaultValuesFormData)
  const [loadingSendForm, setLoadingSendForm] = useState<boolean>(false)

  function onSendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingSendForm(true)
    sendContactService(formData)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Mensagem enviada com sucesso, em breve entraremos em contato',
          type: 'success',
        })
        setFormData(defaultValuesFormData)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar enviar mensagem - ${err?.message}`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingSendForm(false)
      })
  }

  return (
    <section className={style.contactContainer}>
      <header>
        <h2>Contatos</h2>
      </header>

      <section>
        <form onSubmit={onSendForm}>
          <CustomTextField
            fullWidth
            label="Nome"
            placeholder="Digite o seu nome"
            value={formData.name}
            onChange={(event) => {
              setFormData({
                ...formData,
                name: event.target.value,
              })
            }}
          />
          <CustomTextField
            fullWidth
            label="E-mail"
            placeholder="Digite o seu e-mail"
            value={formData.email}
            onChange={(event) => {
              setFormData({
                ...formData,
                email: event.target.value,
              })
            }}
          />
          <CustomTextField
            fullWidth
            label="Mensagem"
            placeholder="Digite aqui a sua mensagem"
            multiline
            rows={5}
            value={formData.message}
            onChange={(event) => {
              setFormData({
                ...formData,
                message: event.target.value,
              })
            }}
          />

          <button disabled={loadingSendForm} type="submit">
            {loadingSendForm ? <Loading size={21} /> : 'Enviar'}
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
