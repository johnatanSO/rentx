import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './Filters.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { getUsersService } from '@/services/user/getUsers/GetUsersService'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { MenuItem } from '@mui/material'
import { ICar } from '@/models/interfaces/ICar'
import { getAllCarsService } from '@/services/cars/getAllCars/GetAllCarsService'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { IUser } from '@/models/interfaces/IUser'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { filterRentalsSchema, IFilters } from '../../interfaces/IFilters'
import { zodResolver } from '@hookform/resolvers/zod'

export function FilterRentals() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFilters>({
    defaultValues: {
      filterStartDate: dayjs().startOf('month').format('YYYY-MM-DD'),
      filterEndDate: dayjs().endOf('month').format('YYYY-MM-DD'),
      userId: null,
      carId: null,
    },
    resolver: zodResolver(filterRentalsSchema),
  })

  const [otherFiltersOpened] = useState<boolean>(false)
  const [usersList, setUsersList] = useState<IUser[]>([])
  const [carsList, setCarsList] = useState<ICar[]>([])

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  function onFilterRentals(filters: IFilters) {
    const currentFilterEndDate = searchParams.get('filterEndDate')

    if (
      !currentFilterEndDate ||
      currentFilterEndDate !== filters.filterEndDate
    ) {
      router.push(
        `${pathname}?${createQueryString(
          'filterEndDate',
          filters.filterEndDate || '',
        )}`,
      )
    }

    const currentFilterStartDate = searchParams.get('filterStartDate')

    if (
      !currentFilterStartDate ||
      currentFilterStartDate !== filters.filterStartDate
    ) {
      router.push(
        `${pathname}?${createQueryString(
          'filterStartDate',
          filters.filterStartDate || '',
        )}`,
      )
    }

    const currentFilterUser = searchParams.get('userId')

    if (currentFilterUser !== filters.userId) {
      router.push(
        `${pathname}?${createQueryString('userId', filters.userId || '')}`,
      )
    }

    const currentFilterCar = searchParams.get('carId')

    if (currentFilterCar !== filters.carId) {
      router.push(
        `${pathname}?${createQueryString('carId', filters.carId || '')}`,
      )
    }
  }

  function getUsersList() {
    getUsersService(httpClientProvider)
      .then((res) => {
        setUsersList(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar buscar lista de usuários - ${err?.message}`,
          type: 'error',
        })
        console.log(`Erro ao tentar buscar lista de usuários - ${err?.message}`)
      })
  }

  function getCarsList() {
    getAllCarsService(httpClientProvider)
      .then((res) => {
        setCarsList(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar buscar lista de carros - ${err?.message}`,
          type: 'error',
        })
      })
  }

  useEffect(() => {
    getUsersList()
    getCarsList()
  }, [])

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
            {usersList.map((user) => {
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
            {carsList.map((car) => {
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
