import { ModalLayout } from '@/components/_ui/ModalLayout'
import { Specification } from '../../interfaces/Specification'
import { FormEvent, useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { usePathname, useRouter } from 'next/navigation'
import { updateSpecificationService } from '@/services/specifications/updateSpecificationService/UpdateSpecificationService'

interface Props {
  specificationToEdit: Specification
  open: boolean
  handleClose: () => void
}

export function ModalEditSpecification({
  specificationToEdit,
  open,
  handleClose,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [loadingUpdateSpecification, setLoadingUpdateSpecification] =
    useState<boolean>(false)
  const [specificationData, setSpecificationData] =
    useState<Specification>(specificationToEdit)
  const router = useRouter()
  const pathname = usePathname()

  function onUpdateSpecification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingUpdateSpecification(true)

    updateSpecificationService(specificationData)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Informações da especificação atualizadas com sucesso',
          type: 'success',
        })

        handleClose()
        router.refresh()
        router.push(pathname)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações da especificação - ${
            err?.response?.data?.message || err?.message
          }`,
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
      <>
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
      </>
    </ModalLayout>
  )
}
