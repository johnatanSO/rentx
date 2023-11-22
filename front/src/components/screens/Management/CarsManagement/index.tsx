'use client'
import { useEffect, useState, useContext } from 'react'
import { TableComponent } from '@/components/_ui/TableComponent'
import { getAllCarsService } from '@/services/cars/getAllCars/GetAllCarsService'
import { Car } from './interfaces/Car'
import { AlertContext } from '@/contexts/alertContext'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CarsManagement.module.scss'
import { useColumns } from './hooks/useColumns'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function CarsManagement() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const router = useRouter()
  const pathname = usePathname()
  const [cars, setCars] = useState<Car[]>([])
  const [loadingCars, setLoadingCars] = useState<boolean>(true)
  const columns = useColumns()

  async function getCars() {
    setLoadingCars(true)
    getAllCarsService()
      .then((res) => {
        setCars(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao buscar carros - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingCars(false)
      })
  }

  function handleOpenCreateNewCar() {
    router.push(pathname + '/createNew')
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
      <CustomTextField className={style.searchInput} label="Buscar pelo nome" />
      <section className={style.tableSection}>
        <TableComponent columns={columns} rows={cars} loading={loadingCars} />
      </section>
    </>
  )
}
