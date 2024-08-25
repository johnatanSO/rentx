'use client'

import style from './Rentals.module.scss'
import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { TableComponent } from '@/components/_ui/TableComponent'
import { useColumns } from './hooks/useColumns'
import { finalizeRentalService } from '@/services/rentals/finalizeRental/FinalizeRentalService'
import { ListMobile } from '@/components/_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { getRentalsService } from '@/services/rentals/getRentals/GetRentalsService'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { IRental } from '@/models/interfaces/IRental'

export function Rentals() {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  const [rentals, setRentals] = useState<IRental[]>([])
  const [loadingRentals, setLoadingRentals] = useState<boolean>(true)

  const columns = useColumns({ onFinalizeRental })
  const itemFields = useFieldsMobile()

  function onFinalizeRental(rentalId: string) {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      onClickAgree: async () => {
        setLoadingRentals(true)
        finalizeRentalService(rentalId, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Aluguel finalizado com sucesso',
              type: 'success',
            })

            getRentals()
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: `Erro ao tentar finalizar o aluguel - ${err?.message}`,
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
    getRentalsService(httpClientProvider)
      .then(({ data: { items } }) => {
        setRentals(items)
      })
      .catch((error) => {
        console.error(error)
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
      <div className={style.viewDesktop}>
        <TableComponent
          columns={columns}
          rows={rentals}
          loading={loadingRentals}
          emptyText="Nenhum aluguel encontrado"
        />
      </div>
      <div className={style.viewMobile}>
        <ListMobile
          itemFields={itemFields}
          collapseItems={columns}
          items={rentals}
          loading={loadingRentals}
        />
      </div>
    </div>
  )
}
