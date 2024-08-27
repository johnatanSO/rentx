import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function deleteSpecificationService(
  specificationId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.delete(`/specifications/${specificationId}`)
}
