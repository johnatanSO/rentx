'use client'

import { TableComponent } from '@/components/_ui/TableComponent'
import style from './AllRentalsManagement.module.scss'
import { Rental } from './interfaces/Rental'
import { useColumns } from './hooks/useColumns'
import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { finalizeRentalService } from '@/services/rentals/finalizeRental/FinalizeRentalService'
import { useRouter } from 'next/navigation'
import { ModalEditRental } from './partials/ModalEditRental'
import { Filters } from './partials/Filters'
import { ListMobile } from '@/components/_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFields'
import { getAllRentalsService } from '@/services/rentals/getAllRentals/GetAllRentalsService'
import { IFilters } from './interfaces/IFilters'

export function AllRentalsManagement() {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  const [rentals, setRentals] = useState<Rental[]>([])
  const [loadingRentals, setLoadingRentals] = useState<boolean>(true)

  const defaultValuesFilter = {
    filterStartDate: null,
    filterEndDate: null,
    userId: null,
    carId: null,
  }

  const [filters, setFilters] = useState<IFilters>(defaultValuesFilter)

  const [modalEditRentalOpened, setModalEditRentalOpened] =
    useState<boolean>(false)
  const [rentalToEdit, setRentalToEdit] = useState<Rental | null>(null)

  const router = useRouter()

  const columns = useColumns({ onFinalizeRental, handleEditRental })
  const itemFields = useFieldsMobile()

  function handleEditRental(rental: Rental) {
    setRentalToEdit(rental)
    setModalEditRentalOpened(true)
  }

  function onFinalizeRental(rentalId: string) {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      onClickAgree: async () => {
        setLoadingRentals(true)
        finalizeRentalService(rentalId)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Aluguel finalizado com sucesso',
              type: 'success',
            })
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
    getAllRentalsService(filters)
      .then(({ data: { items } }) => {
        setRentals(items)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoadingRentals(false)
      })
  }

  useEffect(() => {
    getRentals()
  }, [])

  return (
    <>
      <header className={style.header}>
        <h2>Todos os alugueis</h2>

        <Filters filters={filters} setFilters={setFilters} />
      </header>

      <section className={style.tableSection}>
        <TableComponent
          columns={columns}
          rows={rentals}
          loading={loadingRentals}
        />
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
