import { http } from '@/http/axios'

export function uploadCategoriesService(csvCategoriesFile: File) {
  const formData = new FormData()

  formData.append('file', csvCategoriesFile)
  return http.post('/categories/import', formData)
}
