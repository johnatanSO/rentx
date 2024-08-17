import { http } from '@/http/axios'

export function deleteSpecificationService(specificationId: string) {
  return http.delete(`/specifications/${specificationId}`)
}
