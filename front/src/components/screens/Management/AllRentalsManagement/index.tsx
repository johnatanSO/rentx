'use client'

import { TableComponent } from '@/components/_ui/TableComponent'
import style from './AllRentalsManagement.module.scss'
import { useColumns } from './hooks/useColumns'
import { ModalEditRental } from './partials/ModalEditRental'
import { FilterRentals } from './partials/FilterRentals'
import { ListMobile } from '@/components/_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFields'
import { useFinalizeRental } from '../../../../hooks/useFinalizeRental'
import { useAllRentalList } from '../../../../hooks/useAllRentalList'

export function AllRentalsManagement() {
  const { getRentals, loadingRentals, rentals, setLoadingRentals } =
    useAllRentalList()

  const { onFinalizeRental } = useFinalizeRental({
    setLoadingRentals,
    getRentals,
  })

  const itemFields = useFieldsMobile()

  const {
    columns,
    modalEditRentalOpened,
    rentalToEdit,
    setModalEditRentalOpened,
    setRentalToEdit,
  } = useColumns({ onFinalizeRental })

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
