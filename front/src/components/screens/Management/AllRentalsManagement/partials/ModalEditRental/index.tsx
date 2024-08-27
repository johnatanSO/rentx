import { ModalLayout } from '@/components/_ui/ModalLayout'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './ModalEditRental.module.scss'
import { MenuItem } from '@mui/material'
import { IRental } from '@/models/interfaces/IRental'
import { useAvaliableCarsList } from '@/hooks/useAvaliableCarsList'
import { useUserList } from '@/hooks/useUserList'
import { useEditRental } from '../../hooks/useEditRental'

interface Props {
  rentalToEdit: IRental
  open: boolean
  handleClose: () => void
}

export function ModalEditRental({ rentalToEdit, open, handleClose }: Props) {
  const { cars } = useAvaliableCarsList()
  const { users } = useUserList()

  const { errors, handleSubmit, isSubmitting, onUpdateRental, register } =
    useEditRental({
      handleClose,
      rentalToEdit,
    })

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
