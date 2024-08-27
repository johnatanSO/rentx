import { ISpecification } from '@/models/interfaces/ISpecification'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { listAllSpecificationsService } from '@/services/specifications/listAllSpecifications/ListAllSpecificationsService'
import { useEffect, useState } from 'react'

export function useSpecificationList() {
  const [loadingSpecifications, setLoadingSpecifications] =
    useState<boolean>(true)

  const [specifications, setSpecifications] = useState<ISpecification[]>([])
  const [searchString, setSearchString] = useState<string>('')

  function filterByName() {
    setLoadingSpecifications(true)
    const filteredSpecifications = specifications.filter((specification) =>
      specification.name
        .toLowerCase()
        .trim()
        .includes(searchString.toLowerCase().trim()),
    )
    setLoadingSpecifications(false)
    setSpecifications(filteredSpecifications)
  }

  function getSpecifications() {
    setLoadingSpecifications(true)
    listAllSpecificationsService(httpClientProvider)
      .then(({ data: { items } }) => {
        setSpecifications(items)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoadingSpecifications(false)
      })
  }

  useEffect(() => {
    filterByName()
  }, [searchString])

  useEffect(() => {
    getSpecifications()
  }, [])

  return {
    searchString,
    setSearchString,
    getSpecifications,
    loadingSpecifications,
    specifications,
  }
}
