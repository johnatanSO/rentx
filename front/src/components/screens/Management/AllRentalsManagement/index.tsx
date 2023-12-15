'use client'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { TableComponent } from '@/components/_ui/TableComponent'
import style from './AllRentalsManagement.module.scss'
import { Rental } from './interfaces/Rental'
import { useColumns } from './hooks/useColumns'
import { FormEvent, useCallback, useContext, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { finalizeRentalService } from '@/services/rentals/finalizeRental/FinalizeRentalService'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormGroup } from '@mui/material'
import { ModalEditRental } from './partials/ModalEditRental'
import { Filters } from './interfaces/Filters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
  const defaultValuesFilter = {
    filterStartDate: null,
    filterEndDate: null,
    userId: null,
  }
  const [filters, setFilters] = useState<Filters>(defaultValuesFilter)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
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
          .then((res) => {
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

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  function onFilterRentals(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const currentFilterStartDate = searchParams.get('filterStartDate')
    if (currentFilterStartDate !== filters.filterStartDate) {
      router.push(
        `${pathname}?${createQueryString(
          'filterStartDate',
          filters.filterStartDate || '',
        )}`,
      )
    }

    const currentFilterEndDate = searchParams.get('filterEndDate')
    if (currentFilterEndDate !== filters.filterEndDate) {
      router.push(
        `${pathname}?${createQueryString(
          'filterEndDate',
          filters.filterEndDate || '',
        )}`,
      )
    }
  }

  return (
    <>
      <header className={style.header}>
        <h2>Todos os alugueis</h2>

        <form className={style.filterDateContainer} onSubmit={onFilterRentals}>
          <CustomTextField
            className={style.input}
            label="Data do aluguel (Inicial)"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.filterStartDate}
            onChange={(event) => {
              setFilters({
                ...filters,
                filterStartDate: event?.target.value,
              })
            }}
          />

          <CustomTextField
            className={style.input}
            label="Data do aluguel (Final)"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.filterEndDate}
            onChange={(event) => {
              setFilters({
                ...filters,
                filterEndDate: event?.target.value,
              })
            }}
          />

          <button type="submit">
            Buscar
            <FontAwesomeIcon className={style.icon} icon={faSearch} />
          </button>
        </form>
      </header>

      <section className={style.tableSection}>
        <TableComponent columns={columns} rows={rentals} loading={false} />
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
