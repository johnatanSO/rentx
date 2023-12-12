import http from '@/http/axios'

interface IRequest {
  _id: string
}

export function updateRentalService({ _id }: IRequest) {
  const body = {}
  return http.put(`/rentals/${_id}`, body)
}
