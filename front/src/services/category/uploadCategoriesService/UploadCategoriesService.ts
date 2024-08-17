import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function uploadCategoriesService(csvCategoriesFile: File) {
  const formData = new FormData()

  formData.append('file', csvCategoriesFile)
  return http.post('/categories/import', formData)
}
