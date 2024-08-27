'use client'

import { TableComponent } from '@/components/_ui/TableComponent'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CarsManagement.module.scss'
import { useColumns } from './hooks/useColumns'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ListMobile } from '@/components/_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFields'
import { useAllCarList } from '@/hooks/useAllCarList'

export function CarsManagement() {
  const router = useRouter()
  const pathname = usePathname()

  const columns = useColumns()
  const itemFields = useFieldsMobile()

  function handleOpenCreateNewCar() {
    router.push(pathname + '/createNew')
  }

  const { cars, loadingCars, searchString, setSearchString } = useAllCarList()

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
          <TableComponent columns={columns} rows={cars} loading={loadingCars} />
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
