'use client'
import style from './SpecificationsManagement.module.scss'
import { useState, useEffect, useContext } from 'react'
import { TableComponent } from '@/components/_ui/TableComponent'
import { AlertContext } from '@/contexts/alertContext'
import { useColumns } from './hooks/useColumns'
import { listAllSpecificationsService } from '@/services/specifications/listAllSpecifications/ListAllSpecificationsService'
import { Specification } from './interfaces/Specification'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewSpecification } from './CreateNewSpecification'

export function SpecificationsManagement() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [specifications, setSpecifications] = useState<Specification[]>([])
  const [loadingSpecifications, setLoadingSpecifications] =
    useState<boolean>(true)
  const columns = useColumns()

  function getSpecifications() {
    setLoadingSpecifications(true)

    listAllSpecificationsService()
      .then((res) => {
        setSpecifications(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao buscar categorias - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingSpecifications(false)
      })
  }

  useEffect(() => {
    getSpecifications()
  }, [])

  return (
    <>
      <CreateNewSpecification />

      <header className={style.header}>
        <h2>Categorias</h2>
        <CustomTextField
          className={style.searchInput}
          label="Buscar pelo nome"
        />
      </header>
      <section className={style.tableSection}>
        <TableComponent
          rows={specifications}
          columns={columns}
          loading={loadingSpecifications}
        />
      </section>
    </>
  )
}
