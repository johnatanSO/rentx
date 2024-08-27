'use client'

import { TableComponent } from '@/components/_ui/TableComponent'
import style from './AllRentalsManagement.module.scss'
import { IRental } from '@/models/interfaces/IRental'
import { useColumns } from './hooks/useColumns'
import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { finalizeRentalService } from '@/services/rentals/finalizeRental/FinalizeRentalService'
import { useSearchParams } from 'next/navigation'
import { ModalEditRental } from './partials/ModalEditRental'
import { FilterRentals } from './partials/FilterRentals'
import { ListMobile } from '@/components/_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFields'
import { getAllRentalsService } from '@/services/rentals/getAllRentals/GetAllRentalsService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { IFilters } from './interfaces/IFilters'

export function AllRentalsManagement() {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  const [rentals, setRentals] = useState<IRental[]>([])
  const [loadingRentals, setLoadingRentals] = useState<boolean>(true)

  const searchParams = useSearchParams()

  const [modalEditRentalOpened, setModalEditRentalOpened] =
    useState<boolean>(false)
  const [rentalToEdit, setRentalToEdit] = useState<IRental | null>(null)

  const columns = useColumns({ onFinalizeRental, handleEditRental })
  const itemFields = useFieldsMobile()

  function handleEditRental(rental: IRental) {
    setRentalToEdit(rental)
    setModalEditRentalOpened(true)
  }

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

    const filters: IFilters = {
      carId: searchParams.get('carId'),
      filterEndDate: searchParams.get('filterEndDate'),
      filterStartDate: searchParams.get('filterStartDate'),
      userId: searchParams.get('userId'),
    }

    getAllRentalsService(filters, httpClientProvider)
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
  }, [searchParams])

  return (
    <>
      <header className={style.header}>
        <h2>Todos os alugueis</h2>

        <FilterRentals />
      </header>

      <section className={style.tableSection}>
        <div className={style.viewDesktop}>
          <TableComponent
            columns={columns}
            rows={rentals}
            loading={loadingRentals}
          />
        </div>
        <div className={style.viewMobile}>
          <ListMobile
            loading={loadingRentals}
            items={rentals}
            collapseItems={columns}
            itemFields={itemFields}
          />
        </div>
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
