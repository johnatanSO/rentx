import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './Filters.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { User } from '../../interfaces/User'
import { getUsersService } from '@/services/user/getUsers/GetUsersService'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { MenuItem } from '@mui/material'
import { Car } from '../../interfaces/Car'
import { getAllCarsService } from '@/services/cars/getAllCars/GetAllCarsService'
import { IFilters } from '../../interfaces/IFilters'

type Props = {
  filters: IFilters
  setFilters: (filters: IFilters) => void
}

export function Filters({ filters, setFilters }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [otherFiltersOpened] = useState<boolean>(false)
  const [usersList, setUsersList] = useState<User[]>([])
  const [carsList, setCarsList] = useState<Car[]>([])

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

  function onFilterRentals(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

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
    getUsersService()
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
    getAllCarsService()
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
      <form className={style.filterDateContainer} onSubmit={onFilterRentals}>
        <CustomTextField
          className={style.input}
          label="Data do aluguel (Inicial)"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={filters.filterStartDate}
          onChange={(event) => {
            setFilters({
              ...filters,
              filterStartDate: event?.target.value,
            })
          }}
        />

        <CustomTextField
          className={style.input}
          label="Data do aluguel (Final)"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={filters.filterEndDate}
          onChange={(event) => {
            setFilters({
              ...filters,
              filterEndDate: event?.target.value,
            })
          }}
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
            value={filters.userId}
            onChange={(event) => {
              setFilters({
                ...filters,
                userId: event?.target.value,
              })
            }}
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
            value={filters.carId}
            onChange={(event) => {
              setFilters({
                ...filters,
                carId: event?.target.value,
              })
            }}
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
