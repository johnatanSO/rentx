import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function deleteSpecificationService(specificationId: string) {
  return http.delete(`/specifications/${specificationId}`)
}
