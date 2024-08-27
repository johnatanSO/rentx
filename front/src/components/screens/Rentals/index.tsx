'use client'

import style from './Rentals.module.scss'
import { TableComponent } from '@/components/_ui/TableComponent'
import { useColumns } from './hooks/useColumns'
import { ListMobile } from '@/components/_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { useRentalList } from '../../../hooks/useRentalList'
import { useFinalizeRental } from '../../../hooks/useFinalizeRental'

export function Rentals() {
  const itemFields = useFieldsMobile()

  const { rentals, loadingRentals, getRentals, setLoadingRentals } =
    useRentalList()

  const { onFinalizeRental } = useFinalizeRental({
    getRentals,
    setLoadingRentals,
  })

  const columns = useColumns({ onFinalizeRental })

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
