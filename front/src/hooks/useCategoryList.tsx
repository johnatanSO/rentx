import { ICategory } from '@/models/interfaces/ICategory'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { useEffect, useState } from 'react'

export function useCategoryList() {
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [searchString, setSearchString] = useState<string>('')

  function filterByName() {
    setLoadingCategories(true)
    const filteredCategories = categories.filter((category) =>
      category.name
        .toLowerCase()
        .trim()
        .includes(searchString.toLowerCase().trim()),
    )
    setLoadingCategories(false)
    setCategories(filteredCategories)
  }

  function getCategories() {
    setLoadingCategories(true)
    getAllCategoriesService(httpClientProvider)
      .then(({ data: { items } }) => {
        setCategories(items)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoadingCategories(false)
      })
  }

  useEffect(() => {
    filterByName()
  }, [searchString])

  useEffect(() => {
    getCategories()
  }, [])

  return {
    getCategories,
    setSearchString,
    searchString,
    loadingCategories,
    categories,
  }
}
