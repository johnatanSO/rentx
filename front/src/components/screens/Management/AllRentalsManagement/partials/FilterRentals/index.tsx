import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './FilterRentals.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { MenuItem } from '@mui/material'
import { useUserList } from '@/hooks/useUserList'
import { useAllCarList } from '@/hooks/useAllCarList'
import { useFilterRentals } from '../../hooks/useFilterRentals'

export function FilterRentals() {
  const {
    errors,
    handleSubmit,
    onFilterRentals,
    otherFiltersOpened,
    register,
  } = useFilterRentals()

  const { users } = useUserList()
  const { cars } = useAllCarList()

  return (
    <div className={style.filtersContainer}>
      <form
        className={style.filterDateContainer}
        onSubmit={handleSubmit(onFilterRentals)}
      >
        <CustomTextField
          className={style.input}
          label="Data do aluguel (Inicial)"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register('filterStartDate')}
          error={!!errors.filterStartDate}
        />

        <CustomTextField
          className={style.input}
          label="Data do aluguel (Final)"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register('filterEndDate')}
          error={!!errors.filterEndDate}
        />

        <button type="submit">
          Buscar
          <FontAwesomeIcon className={style.icon} icon={faSearch} />
        </button>
      </form>

      {otherFiltersOpened && (
        <section className={style.otherFiltersContainer}>
          <CustomTextField
            className={style.input}
            label="Cliente"
            select
            {...register('userId')}
            error={!!errors.userId}
          >
            <MenuItem value="all">Todos</MenuItem>
            {users.map((user) => {
              return (
                <MenuItem value={user._id} key={user._id}>
                  {user.name}
                </MenuItem>
              )
            })}
          </CustomTextField>

          <CustomTextField
            className={style.input}
            label="Carro"
            select
            {...register('carId')}
            error={!!errors.carId}
          >
            <MenuItem value="all">Todos</MenuItem>
            {cars.map((car) => {
              return (
                <MenuItem value={car._id} key={car._id}>
                  {car.name} - {car.licensePlate}
                </MenuItem>
              )
            })}
          </CustomTextField>
        </section>
      )}
    </div>
  )
}
