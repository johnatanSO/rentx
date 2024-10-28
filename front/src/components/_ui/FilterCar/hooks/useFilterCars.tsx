import { useCallback } from 'react'

import { IFilters } from '../interfaces/IFilters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

export function useFilterCars() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IFilters>({
    defaultValues: {
      name: '',
      categoryId: '',
    },
  })

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  async function onFilterCars(filters: IFilters) {
    const currentName = searchParams.get('name')

    if (filters.name && currentName !== filters.name) {
      router.push(
        `${pathname}?${createQueryString('name', filters.name || '')}`,
      )
    }

    const currentCategoryId = searchParams.get('categoryId')

    if (filters.categoryId && currentCategoryId !== filters.categoryId) {
      router.push(
        `${pathname}?${createQueryString(
          'categoryId',
          filters.categoryId || '',
        )}`,
      )
    }
  }

  function handleClearFilters() {
    reset()
    router.push(pathname)
  }

  return {
    handleClearFilters,
    onFilterCars,
    register,
    handleSubmit,
    isSubmitting,
  }
}
