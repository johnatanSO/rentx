import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './Filters.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { IFilters } from '../../interfaces/IFilters'
import { User } from '../../interfaces/User'
import { getUsersService } from '@/services/user/getUsers/GetUsersService'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'

export function Filters() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultValuesFilter = {
    filterStartDate: null,
    filterEndDate: null,
    userId: null,
  }

  const [filters, setFilters] = useState<IFilters>(defaultValuesFilter)
  const [usersList, setUsersList] = useState<User[]>([])

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

    const currentFilterStartDate = searchParams.get('filterStartDate')
    if (currentFilterStartDate !== filters.filterStartDate) {
      router.push(
        `${pathname}?${createQueryString(
          'filterStartDate',
          filters.filterStartDate || '',
        )}`,
      )
    }

    const currentFilterEndDate = searchParams.get('filterEndDate')
    if (currentFilterEndDate !== filters.filterEndDate) {
      router.push(
        `${pathname}?${createQueryString(
          'filterEndDate',
          filters.filterEndDate || '',
        )}`,
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
          text: `Erro ao tentar buscar lista de usuários - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
        console.log(
          `Erro ao tentar buscar lista de usuários - ${
            err?.response?.data?.message || err?.message
          }`,
        )
      })
  }

  useEffect(() => {
    getUsersList()
  }, [])

  return (
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
  )
}
