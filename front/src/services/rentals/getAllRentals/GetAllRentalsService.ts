import http from '@/http/axios'
import dayjs from 'dayjs'

interface IRequest {
  filterStartDate: string | null
  filterEndDate: string | null
  userId: string | null
}

export function getAllRentalsService({
  filterStartDate,
  filterEndDate,
  userId,
}: IRequest) {
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
  }

  return http.get('/rentals/all/', {
    params,
  })
}
