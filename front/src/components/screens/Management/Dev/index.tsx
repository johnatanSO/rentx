'use client'

import { useContext, useState } from 'react'
import style from './Dev.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faFile, faPlus } from '@fortawesome/free-solid-svg-icons'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'
import { uploadCategoriesService } from '@/services/category/uploadCategoriesService/UploadCategoriesService'
import { Loading } from '@/components/_ui/Loading'

export function Dev() {
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
    uploadCategoriesService(csvFile)
      .then(() => {
        router.push('/management/categories')
        setCsvFile(null)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar ler arquivo .csv - ${
            err?.response?.data?.message || err?.message
          }`,
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

  return (
    <div className={style.scriptsContainer}>
      <section className={style.uploadCategoriesSection}>
        <header>
          <h2>Inserir categorias</h2>
          <button
            onClick={onUploadCategories}
            className={style.submitButton}
            type="button"
            disabled={!csvFile || loadingImportFile}
          >
            {loadingImportFile ? (
              <Loading size={21} />
            ) : (
              <>
                <FontAwesomeIcon icon={faCheck} />
                Confirmar
              </>
            )}
          </button>
        </header>
        <div className={style.helpInfosContainer}>
          <ul>
            <li>
              <p>O arquivo precisa ser do formato .csv</p>
            </li>
            <li>
              <p>
                O texto precisa possuir o seguinte formato (nome|descrição)
                separados pelo delimitador &quot; | &quot;
              </p>
            </li>
            <li>
              <button
                onClick={downloadCsvExample}
                className={style.downloadExampleFileButton}
                type="button"
              >
                Baixar arquivo de exemplo
              </button>
            </li>
          </ul>
        </div>

        <div className={style.buttonsContainer}>
          <button
            className={style.insertFileButton}
            onClick={handleInputFile}
            type="button"
          >
            <FontAwesomeIcon className={style.icon} icon={faPlus} />
            Inserir arquivo
          </button>

          {csvFile && (
            <p className={style.fileText}>
              <FontAwesomeIcon icon={faFile} />
              <span>{csvFile?.name}</span>
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
