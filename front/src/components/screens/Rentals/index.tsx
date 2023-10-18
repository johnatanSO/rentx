'use client'
import style from './Rentals.module.scss'
import { useEffect, useState, useContext } from 'react'
import { getRentalsService } from '@/services/rentals/getRentals/GetRentalsService'
import { AlertContext } from '@/contexts/alertContext'
import { Rental } from './interfaces/Rental'
import { TableComponent } from '@/components/_ui/TableComponent'
import { useColumns } from './hooks/useColumns'

export function Rentals() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [rentals, setRentals] = useState<Rental[]>([])
  const [loadingRentals, setLoadingRentals] = useState<boolean>(true)
  const columns = useColumns()

  function getRentals() {
    setLoadingRentals(true)
    getRentalsService()
      .then((res) => {
        setRentals(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao buscar alugueis - ${
            err?.response?.data?.message || err?.message
          }`,
        })
      })
      .finally(() => {
        setLoadingRentals(false)
      })
  }

  useEffect(() => {
    getRentals()
  }, [])

  return (
    <div className={style.rentalsContainer}>
      <TableComponent
        columns={columns}
        rows={rentals}
        loading={loadingRentals}
      />
    </div>
  )
}
