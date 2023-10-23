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

export function CarsManagement() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const router = useRouter()
  const pathname = usePathname()
  const [cars, setCars] = useState<Car[]>([])
  const [loadingCars, setLoadingCars] = useState<boolean>(false)
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
          text: `Erro ao tentar realizar login - ${
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
    router.push(pathname + '/createNewCar')
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
          Cadastrar novo
        </button>
        <CustomTextField
          className={style.searchInput}
          label="Buscar pelo nome"
        />
      </header>
      <section className={style.tableSection}>
        <TableComponent columns={columns} rows={cars} loading={loadingCars} />
      </section>
    </>
  )
}
