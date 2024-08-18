import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function deleteSpecificationService(
  specificationId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.delete(`/specifications/${specificationId}`)
}
