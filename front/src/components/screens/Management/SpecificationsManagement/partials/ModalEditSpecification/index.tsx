import { ModalLayout } from '@/components/_ui/ModalLayout'
import { Specification } from '../../interfaces/Specification'
import { FormEvent, useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { updateSpecificationService } from '@/services/specifications/updateSpecificationService/UpdateSpecificationService'
import style from './ModalEditSpecification.module.scss'
import { httpClientProvider } from '@/providers/httpClientProvider'

interface Props {
  specificationToEdit: Specification
  open: boolean
  handleClose: () => void
  getSpecifications: () => void
}

export function ModalEditSpecification({
  specificationToEdit,
  open,
  handleClose,
  getSpecifications,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [loadingUpdateSpecification, setLoadingUpdateSpecification] =
    useState<boolean>(false)
  const [specificationData, setSpecificationData] =
    useState<Specification>(specificationToEdit)

  function onUpdateSpecification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingUpdateSpecification(true)

    updateSpecificationService(specificationData, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Informações da especificação atualizadas com sucesso',
          type: 'success',
        })

        getSpecifications()
        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações da especificação - ${err?.message}`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingUpdateSpecification(false)
      })
  }

  return (
    <ModalLayout
      handleClose={handleClose}
      open={open}
      title="Atualizar especificação"
      loading={loadingUpdateSpecification}
      submitButtonText="Salvar"
      onSubmit={onUpdateSpecification}
      buttonStyle={{
        backgroundColor: '#3264ff',
      }}
    >
      <div className={style.fields}>
        <CustomTextField
          label="Nome"
          size="small"
          value={specificationData.name}
          onChange={(event) => {
            setSpecificationData({
              ...specificationData,
              name: event?.target.value,
            })
          }}
        />
        <CustomTextField
          label="Descrição"
          multiline
          rows={3}
          value={specificationData.description}
          onChange={(event) => {
            setSpecificationData({
              ...specificationData,
              description: event?.target.value,
            })
          }}
        />
      </div>
    </ModalLayout>
  )
}
