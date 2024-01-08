'use client'

import { TableComponent } from '@/components/_ui/TableComponent'
import { Car } from './interfaces/Car'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CarsManagement.module.scss'
import { useColumns } from './hooks/useColumns'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { ListMobile } from '@/components/_ui/ListMobile'
import { formatCurrency } from '@/utils/format'

type Props = {
  allCars: Car[]
}

export function CarsManagement({ allCars }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const [searchString, setSearchString] = useState<string>('')
  const [cars, setCars] = useState<Car[]>(allCars)

  const columns = useColumns()

  function handleOpenCreateNewCar() {
    router.push(pathname + '/createNew')
  }

  function filterByName() {
    const filteredCars = allCars.filter((car) =>
      car.name.toLowerCase().trim().includes(searchString.toLowerCase().trim()),
    )
    setCars(filteredCars)
  }

  useEffect(() => {
    filterByName()
  }, [searchString])

  const itemFields = [
    {
      field: 'name',
      cellRenderer: (params: any) => {
        return `${params.value} - ${params.data.licensePlate}`
      },
    },
    {
      field: 'dailyRate',
      valueFormatter: (params: any) => formatCurrency(params.value || 0),
    },
  ]

  const collapseItems = columns.filter((column) => column.field !== 'actions')

  return (
    <>
      <header className={style.header}>
        <h2>Carros</h2>
        <button
          onClick={handleOpenCreateNewCar}
          className={style.createNewButton}
          type="button"
        >
          <FontAwesomeIcon className={style.icon} icon={faPlus} />
          Cadastrar novo
        </button>
      </header>
      <CustomTextField
        className={style.searchInput}
        label="Buscar pelo nome"
        value={searchString}
        onChange={(event) => {
          setSearchString(event?.target.value)
        }}
      />
      <section className={style.tableSection}>
        <TableComponent columns={columns} rows={cars} loading={false} />
        <ListMobile
          collapseItems={collapseItems}
          items={cars}
          itemFields={itemFields}
        />
      </section>
    </>
  )
}
