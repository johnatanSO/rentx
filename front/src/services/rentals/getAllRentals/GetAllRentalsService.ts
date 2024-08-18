import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'
import dayjs from 'dayjs'

interface IRequest {
  filterStartDate: string | null
  filterEndDate: string | null
  userId: string | null
  carId: string | null
}

export function getAllRentalsService(
  { filterStartDate, filterEndDate, userId, carId }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const defaultFilterStartDate = dayjs().startOf('month')
  const defaultFilterEndDate = dayjs().endOf('month')

  const formatedStartDate = dayjs(filterStartDate || defaultFilterStartDate)
    .startOf('day')
    .toISOString()

  const formatedEndDate = dayjs(filterEndDate || defaultFilterEndDate)
    .endOf('day')
    .toISOString()

  const params = {
    filterStartDate: formatedStartDate,
    filterEndDate: formatedEndDate,
    userId,
    carId,
  }

  return httpClientProvider.get('/rentals/all/', {
    params,
  })
}
