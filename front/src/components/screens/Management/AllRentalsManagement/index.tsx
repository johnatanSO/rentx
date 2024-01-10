'use client'

import { TableComponent } from '@/components/_ui/TableComponent'
import style from './AllRentalsManagement.module.scss'
import { Rental } from './interfaces/Rental'
import { useColumns } from './hooks/useColumns'
import { useContext, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { finalizeRentalService } from '@/services/rentals/finalizeRental/FinalizeRentalService'
import { useRouter } from 'next/navigation'
import { ModalEditRental } from './partials/ModalEditRental'
import { Filters } from './partials/Filters'
import { ListMobile } from '@/components/_ui/ListMobile'
import { formatCurrency } from '@/utils/format'

type Props = {
  rentals: Rental[]
}

export function AllRentalsManagement({ rentals }: Props) {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  const [modalEditRentalOpened, setModalEditRentalOpened] =
    useState<boolean>(false)
  const [rentalToEdit, setRentalToEdit] = useState<Rental | null>(null)

  const router = useRouter()

  const columns = useColumns({ onFinalizeRental, handleEditRental })

  function handleEditRental(rental: Rental) {
    setRentalToEdit(rental)
    setModalEditRentalOpened(true)
  }

  function onFinalizeRental(rentalId: string) {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      onClickAgree: async () => {
        finalizeRentalService(rentalId)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Aluguel finalizado com sucesso',
              type: 'success',
            })

            router.refresh()
            router.push('/management/rentals')
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

  const itemFields = [
    {
      field: 'car',
      cellRenderer: (params: any) => {
        return `${params.value.name} - ${params.value.licensePlate}`
      },
    },
    {
      field: 'totalValue',
      valueFormatter: (params: any) =>
        params.value ? formatCurrency(params.value) : '--',
    },
  ]

  return (
    <>
      <header className={style.header}>
        <h2>Todos os alugueis</h2>

        <Filters />
      </header>

      <section className={style.tableSection}>
        <TableComponent columns={columns} rows={rentals} loading={false} />
        <ListMobile
          items={rentals}
          collapseItems={columns}
          itemFields={itemFields}
        />
      </section>

      {modalEditRentalOpened && rentalToEdit && (
        <ModalEditRental
          open={modalEditRentalOpened}
          rentalToEdit={rentalToEdit}
          handleClose={() => {
            setModalEditRentalOpened(false)
            setRentalToEdit(null)
          }}
        />
      )}
    </>
  )
}
