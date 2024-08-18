import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function uploadCategoriesService(
  csvCategoriesFile: File,
  httpClientProvider: IHttpClientProvider,
) {
  const formData = new FormData()

  formData.append('file', csvCategoriesFile)
  return httpClientProvider.post('/categories/import', formData)
}
