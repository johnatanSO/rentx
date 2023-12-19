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

  const [csvFile, setCsvFile] = useState<any>(null)
  const [loadingImportFile, setLoadingImportFile] = useState<boolean>(false)

  const router = useRouter()

  function handleInputFile() {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (event: any) => {
      setCsvFile(event.target.files[0])
    }

    input.click()
  }

  function onUploadCategories() {
    setLoadingImportFile(true)

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
                O texto precisa possuir o seguinte formato (name|description)
              </p>
            </li>
            <li>
              <button className={style.downloadExampleFileButton} type="button">
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
