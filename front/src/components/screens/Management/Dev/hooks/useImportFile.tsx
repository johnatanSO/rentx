import { AlertContext } from '@/contexts/alertContext'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { uploadCategoriesService } from '@/services/category/uploadCategoriesService/UploadCategoriesService'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

export function useImportFile() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [loadingImportFile, setLoadingImportFile] = useState<boolean>(false)

  const router = useRouter()

  function handleInputFile() {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement
      const file = (target.files || [])[0] as File

      setCsvFile(file)
    }

    input.click()
  }

  function onUploadCategories() {
    setLoadingImportFile(true)

    if (!csvFile) return
    uploadCategoriesService(csvFile, httpClientProvider)
      .then(() => {
        router.push('/management/categories')
        setCsvFile(null)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar ler arquivo .csv - ${err?.message}`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingImportFile(false)
      })
  }

  function downloadCsvExample() {
    const a = window?.document?.createElement('a')

    a.href = `../assets/files/example_csv_categories.csv`
    a.download = 'example_csv_categories'
    a.click()
  }

  return {
    downloadCsvExample,
    onUploadCategories,
    handleInputFile,
    loadingImportFile,
    csvFile,
  }
}
