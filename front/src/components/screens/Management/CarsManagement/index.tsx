'use client'

import { TableComponent } from '@/components/_ui/TableComponent'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CarsManagement.module.scss'
import { useColumns } from './hooks/useColumns'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { ListMobile } from '@/components/_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFields'
import { getAllCarsService } from '@/services/cars/getAllCars/GetAllCarsService'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { ICar } from '@/models/interfaces/ICar'

export function CarsManagement() {
  const router = useRouter()
  const pathname = usePathname()

  const [searchString, setSearchString] = useState<string>('')
  const [cars, setCars] = useState<ICar[]>([])
  const [loadingCars, setLoadingCars] = useState<boolean>(true)

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchString.toLowerCase()),
  )

  const columns = useColumns()
  const itemFields = useFieldsMobile()

  function handleOpenCreateNewCar() {
    router.push(pathname + '/createNew')
  }

  function getCars() {
    setLoadingCars(true)
    getAllCarsService(httpClientProvider)
      .then(({ data: { items } }) => {
        setCars(items)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoadingCars(false)
      })
  }

  useEffect(() => {
    getCars()
  }, [])

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
        <div className={style.viewDesktop}>
          <TableComponent
            columns={columns}
            rows={filteredCars}
            loading={loadingCars}
          />
        </div>
        <div className={style.viewMobile}>
          <ListMobile
            loading={loadingCars}
            collapseItems={columns}
            items={cars}
            itemFields={itemFields}
          />
        </div>
      </section>
    </>
  )
}
