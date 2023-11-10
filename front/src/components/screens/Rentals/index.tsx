'use client'
import style from './Rentals.module.scss'
import { useEffect, useState, useContext } from 'react'
import { getRentalsService } from '@/services/rentals/getRentals/GetRentalsService'
import { AlertContext } from '@/contexts/alertContext'
import { Rental } from './interfaces/Rental'
import { TableComponent } from '@/components/_ui/TableComponent'
import { useColumns } from './hooks/useColumns'
import { finalizeRentalService } from '@/services/rentals/finalizeRental/FinalizeRentalService'
import { useRouter } from 'next/navigation'

export function Rentals() {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  const [rentals, setRentals] = useState<Rental[]>([])
  const [loadingRentals, setLoadingRentals] = useState<boolean>(true)
  const columns = useColumns({ onFinalizeRental })
  const router = useRouter()

  function onFinalizeRental(rentalId: string) {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      onClickAgree: async () => {
        finalizeRentalService(rentalId)
          .then((res) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Aluguel finalizado com sucesso',
              type: 'success',
            })

            router.push('/rentals')
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: `Erro ao tentar finalizar o aluguel - ${
                err?.response?.data?.message || err?.message
              }`,
              type: 'error',
            })
          })
      },
      text: 'Tem certeza que deseja finalizar este aluguel?',
      title: 'Alerta de confirmação',
    })
  }

  function getRentals() {
    setLoadingRentals(true)
    getRentalsService()
      .then((res) => {
        setRentals(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao buscar alugueis - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingRentals(false)
      })
  }

  useEffect(() => {
    getRentals()
  }, [])

  return (
    <div className={style.rentalsContainer}>
      <TableComponent
        columns={columns}
        rows={rentals}
        loading={loadingRentals}
      />
    </div>
  )
}
