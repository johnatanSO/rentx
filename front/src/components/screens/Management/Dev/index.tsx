import { useState } from 'react'
import style from './Dev.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

export function Dev() {
  const [csvFile, setCsvFile] = useState<any>(null)

  function handleInputFile() {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (event: any) => {
      setCsvFile(event.target.files[0])
    }

    input.click()
  }

  return (
    <div className={style.scriptsContainer}>
      <section className={style.uploadCategoriesSection}>
        <h3>Inserir categorias</h3>

        <div className={style.buttonsContainer}>
          <button onClick={handleInputFile} type="button">
            <FontAwesomeIcon className={style.icon} icon={faFile} />
            Inserir .csv
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
