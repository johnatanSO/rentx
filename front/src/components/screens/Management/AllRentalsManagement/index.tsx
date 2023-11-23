'use client'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { TableComponent } from '@/components/_ui/TableComponent'
import style from './AllRentalsManagement.module.scss'
import { Rental } from './interfaces/Rental'
import { useColumns } from './hooks/useColumns'
import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { finalizeRentalService } from '@/services/rentals/finalizeRental/FinalizeRentalService'
import { useRouter } from 'next/navigation'

type Props = {
  rentals: Rental[]
}

export function AllRentalsManagement({ rentals }: Props) {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)
  const router = useRouter()

  function onFinalizeRental(rentalId: string) {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      onClickAgree: async () => {
        finalizeRentalService(rentalId)
          .then((res) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Aluguel finalizado com sucesso',
              type: 'success',
            })

            router.push('/management/rentals')
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: `Erro ao tentar finalizar o aluguel - ${
                err?.response?.data?.message || err?.message
              }`,
              type: 'error',
            })
          })
      },
      text: 'Tem certeza que deseja finalizar este aluguel?',
      title: 'Alerta de confirmação',
    })
  }

  const columns = useColumns({ onFinalizeRental })

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
