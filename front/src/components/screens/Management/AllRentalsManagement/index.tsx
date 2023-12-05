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
import { FormGroup } from '@mui/material'

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
  const columns = useColumns({ onFinalizeRental })

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

            router.refresh()
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

  return (
    <>
      <header className={style.header}>
        <h2>Todos os alugueis</h2>

        <FormGroup
          className={style.filterDateContainer}
          onSubmit={() => undefined}
        >
          <CustomTextField
            className={style.input}
            label="Data do aluguel (Inicial)"
            type="date"
            InputLabelProps={{ shrink: true }}
          />

          <CustomTextField
            className={style.input}
            label="Data do aluguel (Final)"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </FormGroup>
      </header>
      <section className={style.tableSection}>
        <TableComponent columns={columns} rows={rentals} loading={false} />
      </section>
    </>
  )
}
