'use client'

import style from './ModalSpecifications.module.scss'
import { ModalLayout } from '@/components/_ui/ModalLayout'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { Specification } from '../../../interfaces/Specification'
import { listAllSpecificationsService } from '@/services/specifications/listAllSpecifications/ListAllSpecificationsService'
import { AlertContext } from '@/contexts/alertContext'
import { createCarSpecificationService } from '@/services/cars/createCarSpecification/CreateCarSpecificationService'
import { Car } from '../../../interfaces/Car'
import { Loading } from '@/components/_ui/Loading'
import { Checkbox, FormControlLabel } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  car: Car
  open: boolean
  handleClose: () => void
}

export function ModalSpecifications({ open, handleClose, car }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const router = useRouter()
  const pathname = usePathname()

  const [loadingAddSpecifications, setLoadingAddSpecifications] =
    useState<boolean>(false)
  const [loadingSpecifications, setLoadingSpecifications] =
    useState<boolean>(true)
  const [specifications, setSpecifications] = useState<Specification[]>([])
  const [selectedSpecificationsIds, setSelectedSpecificationsIds] = useState<
    string[]
  >(car.specifications.map((specification) => specification._id))

  function onAddSpecifications(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoadingAddSpecifications(true)

    createCarSpecificationService({
      carId: car._id,
      specificationsIds: selectedSpecificationsIds,
    })
      .then(({ data }) => {
        console.log('Data:', data)
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Especificações adicionadas com sucesso`,
          type: 'success',
        })
        router.push(pathname)
        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar adicionar especificações - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingAddSpecifications(false)
      })
  }

  function handleSelectSpecification(specificationId: string) {
    if (selectedSpecificationsIds?.includes(specificationId)) {
      const filteredSpecifications = selectedSpecificationsIds.filter(
        (selectedSpecificationId) =>
          selectedSpecificationId !== specificationId,
      )

      setSelectedSpecificationsIds(filteredSpecifications)
      return
    }

    setSelectedSpecificationsIds([
      ...(selectedSpecificationsIds as string[]),
      specificationId,
    ])
  }

  function getSpecifications() {
    setLoadingSpecifications(true)
    listAllSpecificationsService()
      .then(({ data }) => {
        setSpecifications(data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao buscar especificações - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
        console.log(
          `Erro ao buscar especificações - ${
            err?.response?.data?.message || err?.message
          }`,
        )
      })
      .finally(() => {
        setLoadingSpecifications(false)
      })
  }

  useEffect(() => {
    getSpecifications()
  }, [])

  return (
    <ModalLayout
      title="Selecione as especificações"
      handleClose={handleClose}
      open={open}
      loading={loadingAddSpecifications}
      submitButtonText="Confirmar"
      onSubmit={onAddSpecifications}
    >
      {loadingSpecifications ? (
        <Loading color="#536d88" size={21} />
      ) : (
        <ul className={style.listSpecifications}>
          {specifications.map((specification) => {
            return (
              <li key={specification._id}>
                <FormControlLabel
                  label={specification?.name}
                  onChange={() => {
                    handleSelectSpecification(specification._id)
                  }}
                  control={
                    <Checkbox
                      checked={selectedSpecificationsIds?.includes(
                        specification._id,
                      )}
                      sx={{
                        '&.Mui-checked': { color: '#19274e' },
                      }}
                    />
                  }
                />
              </li>
            )
          })}
        </ul>
      )}
    </ModalLayout>
  )
}
