'use client'
import { useEffect, useState, useContext } from 'react'
import { TableComponent } from '@/components/_ui/TableComponent'
import { getAllCarsService } from '@/services/cars/getAllCars/GetAllCarsService'
import { Car } from './interfaces/Car'
import { AlertContext } from '@/contexts/alertContext'
import { useColumns } from './hooks/useColumns'

export function CarsManagement() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [cars, setCars] = useState<Car[]>([])
  const [loadingCars, setLoadingCars] = useState<boolean>(false)
  const columns = useColumns()

  async function getCars() {
    setLoadingCars(true)
    getAllCarsService()
      .then((res) => {
        setCars(res.data.item)
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

  useEffect(() => {
    getCars()
  }, [])

  return (
    <>
      <TableComponent columns={columns} rows={cars} loading={loadingCars} />
    </>
  )
}
