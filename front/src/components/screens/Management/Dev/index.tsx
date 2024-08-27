'use client'

import style from './Dev.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faFile, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Loading } from '@/components/_ui/Loading'
import { useImportFile } from './hooks/useImportFile'

export function Dev() {
  const {
    downloadCsvExample,
    handleInputFile,
    loadingImportFile,
    onUploadCategories,
    csvFile,
  } = useImportFile()

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
