import { ModalLayout } from '@/components/_ui/ModalLayout'
import { Rental } from '../../interfaces/Rental'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { usePathname, useRouter } from 'next/navigation'
import style from './ModalEditRental.module.scss'
import { MenuItem } from '@mui/material'
import { Car } from '../../interfaces/Car'
import { User } from '../../interfaces/User'
import { updateRentalService } from '@/services/rentals/updateRental/UpdateRentalService'
import { getAvaliableCarsService } from '@/services/cars/getAvaliableCars/GetAvaliableCarsService'
import { getUsersService } from '@/services/user/getUsers/GetUsersService'

interface Props {
  rentalToEdit: Rental
  open: boolean
  handleClose: () => void
}

interface RentalToEdit {
  _id: string
  startDate: Date | string
  endDate: Date | string
  expectedReturnDate: Date | string
  car: string
  user: string
}

export function ModalEditRental({ rentalToEdit, open, handleClose }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [loadingUpdateRental, setLoadingUpdateRental] = useState<boolean>(false)
  const [rentalData, setRentalData] = useState<RentalToEdit>({
    ...rentalToEdit,
    car: rentalToEdit.car._id,
    user: rentalToEdit.user._id,
  })
  const [cars, setCars] = useState<Car[]>([])
  const [users, setUsers] = useState<User[]>([])

  const router = useRouter()
  const pathname = usePathname()

  function onUpdateRental(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingUpdateRental(true)

    updateRentalService(rentalData)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Informações do aluguel atualizadas com sucesso',
          type: 'success',
        })

        router.refresh()
        router.push(pathname)
        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações do aluguel - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingUpdateRental(false)
      })
  }

  // Editar data de início;
  // Editar data de previsão de retorno

  function getListCars() {
    getAvaliableCarsService({ name: '', categoryId: '' })
      .then((res) => {
        setCars(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar fazer busca de carros - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
  }

  function getListUsers() {
    getUsersService()
      .then((res) => {
        setUsers(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar fazer busca de usuários - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
  }

  useEffect(() => {
    getListCars()
    getListUsers()
  }, [])

  return (
    <ModalLayout
      handleClose={handleClose}
      open={open}
      title="Atualizar aluguel"
      loading={loadingUpdateRental}
      submitButtonText="Salvar informações"
      onSubmit={onUpdateRental}
      buttonStyle={{
        backgroundColor: '#3264ff',
      }}
    >
      <div className={style.fields}>
        <CustomTextField
          label="Carro"
          size="small"
          select
          value={rentalData.car}
          onChange={(event) => {
            setRentalData({
              ...rentalData,
              car: event?.target.value,
            })
          }}
        >
          {cars.map((car) => {
            return (
              <MenuItem key={car._id} value={car._id}>
                {car?.name || 'Sem nome'} | {car?.licensePlate || 'Sem placa'}
              </MenuItem>
            )
          })}
        </CustomTextField>

        <CustomTextField
          label="Cliente"
          size="small"
          select
          value={rentalData.user}
          onChange={(event) => {
            setRentalData({
              ...rentalData,
              user: event?.target.value,
            })
          }}
        >
          {users.map((user) => {
            return (
              <MenuItem key={user._id} value={user._id}>
                {user?.name || '--'}
              </MenuItem>
            )
          })}
        </CustomTextField>
      </div>
    </ModalLayout>
  )
}
