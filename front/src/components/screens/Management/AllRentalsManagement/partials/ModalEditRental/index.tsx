import { ModalLayout } from '@/components/_ui/ModalLayout'
import { useContext, useEffect, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { usePathname, useRouter } from 'next/navigation'
import style from './ModalEditRental.module.scss'
import { MenuItem } from '@mui/material'
import { updateRentalService } from '@/services/rentals/updateRental/UpdateRentalService'
import { getUsersService } from '@/services/user/getUsers/GetUsersService'
import { getAllCarsService } from '@/services/cars/getAllCars/GetAllCarsService'
import dayjs from 'dayjs'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { IRental } from '@/models/interfaces/IRental'
import { IRentalEdit, rentalEditSchema } from '../../interfaces/IRentalEdit'
import { ICar } from '@/models/interfaces/ICar'
import { IUser } from '@/models/interfaces/IUser'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  rentalToEdit: IRental
  open: boolean
  handleClose: () => void
}

export function ModalEditRental({ rentalToEdit, open, handleClose }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRentalEdit>({
    defaultValues: {
      ...rentalToEdit,
      car: rentalToEdit.car._id,
      user: rentalToEdit.user._id,
      startDate: dayjs(rentalToEdit.startDate).format('YYYY-MM-DD'),
      expectedReturnDate: dayjs(rentalToEdit.expectedReturnDate).format(
        'YYYY-MM-DD',
      ),
    },
    resolver: zodResolver(rentalEditSchema),
  })

  const [cars, setCars] = useState<ICar[]>([])
  const [users, setUsers] = useState<IUser[]>([])

  const router = useRouter()
  const pathname = usePathname()

  function onUpdateRental(rental: IRentalEdit) {
    updateRentalService(
      { ...rental, _id: rental._id || '' },
      httpClientProvider,
    )
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
          text: `Erro ao tentar atualizar informações do aluguel - ${err?.message}`,
          type: 'error',
        })
      })
  }

  function getListCars() {
    getAllCarsService(httpClientProvider)
      .then((res) => {
        setCars(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar fazer busca de carros - ${err?.message}`,
          type: 'error',
        })
      })
  }

  function getListUsers() {
    getUsersService(httpClientProvider)
      .then((res) => {
        setUsers(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar fazer busca de usuários - ${err?.message}`,
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
      loading={isSubmitting}
      submitButtonText="Salvar informações"
      onSubmit={handleSubmit(onUpdateRental)}
      buttonStyle={{
        backgroundColor: '#3264ff',
      }}
    >
      <div className={style.fields}>
        <CustomTextField
          label="Carro"
          size="small"
          select
          {...register('car', { required: true })}
          error={!!errors.car}
          helperText={errors.car && errors.car.message}
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
          {...register('user', { required: true })}
          error={!!errors.user}
          helperText={errors.user && errors.user.message}
        >
          {users.map((user) => {
            return (
              <MenuItem key={user._id} value={user._id}>
                {user?.name || '--'}
              </MenuItem>
            )
          })}
        </CustomTextField>

        <CustomTextField
          type="date"
          label="Data de inicio"
          {...register('startDate', { required: true })}
        />

        <CustomTextField
          type="date"
          label="Previsão de entrega"
          {...register('expectedReturnDate', { required: true })}
        />
      </div>
    </ModalLayout>
  )
}
