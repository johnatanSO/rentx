import { useEffect, useState, useContext } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { TableComponent } from '@/components/_ui/TableComponent'
import style from './AllRentalsManagement.module.scss'
import { Rental } from './interfaces/Rental'
import { AlertContext } from '@/contexts/alertContext'
import { getAllRentalsService } from '@/services/rentals/getAllRentals/GetAllRentalsService'

export function AllRentalsManagement() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [loadingRentals, setLoadingRentals] = useState<boolean>(true)
  const [rentals, setRentals] = useState<Rental[]>([])

  function getAllRentals() {
    setLoadingRentals(true)
    getAllRentalsService()
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
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingRentals(false)
      })
  }

  useEffect(() => {
    getAllRentals()
  }, [])

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
        <TableComponent columns={[]} rows={rentals} loading={loadingRentals} />
      </section>
    </>
  )
}
