'use client'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { TableComponent } from '@/components/_ui/TableComponent'
import style from './AllRentalsManagement.module.scss'
import { Rental } from './interfaces/Rental'
import { useColumns } from './hooks/useColumns'

type Props = {
  rentals: Rental[]
}

export function AllRentalsManagement({ rentals }: Props) {
  console.log('rentals', rentals)
  const columns = useColumns()

  return (
    <>
      <header className={style.header}>
        <h2>Todos os alugueis</h2>

        <CustomTextField
          className={style.searchInput}
          label="Buscar pelo nome"
          placeholder="Digite o nome do usuário"
        />
      </header>
      <section className={style.tableSection}>
        <TableComponent columns={columns} rows={rentals} loading={false} />
      </section>
    </>
  )
}
