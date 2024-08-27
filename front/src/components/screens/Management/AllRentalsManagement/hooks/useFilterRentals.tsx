import { useForm } from 'react-hook-form'
import { filterRentalsSchema, IFilters } from '../interfaces/IFilters'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useFilterRentals() {
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

  return {
    handleSubmit,
    register,
    onFilterRentals,
    otherFiltersOpened,
    errors,
  }
}
