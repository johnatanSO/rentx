'use client'

import style from './ModalSpecifications.module.scss'
import { ModalLayout } from '@/components/_ui/ModalLayout'
import { useState } from 'react'
import { Loading } from '@/components/_ui/Loading'
import { Checkbox, FormControlLabel, Popover, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { ICar } from '@/models/interfaces/ICar'
import { useAddSpecifications } from '../../../../hooks/useAddSpecifications'
import { useSpecificationList } from '@/hooks/useSpecificationList'

type Props = {
  car: ICar
  open: boolean
  handleClose: () => void
}

export function ModalSpecifications({ open, handleClose, car }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [popoverText, setPopoverText] = useState<string | null>(null)

  const {
    handleSelectSpecification,
    handleSubmit,
    isSubmitting,
    onAddSpecifications,
    selectedSpecificationsIds,
  } = useAddSpecifications({ car, handleClose })

  const { specifications, loadingSpecifications } = useSpecificationList()

  return (
    <ModalLayout
      title="Selecione as especificações"
      handleClose={handleClose}
      open={open}
      loading={isSubmitting}
      submitButtonText="Confirmar"
      onSubmit={handleSubmit(onAddSpecifications)}
    >
      {loadingSpecifications ? (
        <Loading color="#536d88" size={21} />
      ) : (
        <ul className={style.listSpecifications}>
          {specifications.map((specification) => {
            return (
              <li key={specification._id}>
                <FormControlLabel
                  label={specification?.name}
                  className={style.label}
                  onChange={() => {
                    handleSelectSpecification(specification._id)
                  }}
                  control={
                    <Checkbox
                      checked={selectedSpecificationsIds?.includes(
                        specification._id,
                      )}
                      sx={{
                        '&.Mui-checked': { color: '#19274e' },
                      }}
                    />
                  }
                />

                <button
                  type="button"
                  className={style.infoButton}
                  onClick={(event) => {
                    setAnchorEl(event?.currentTarget)
                    setPopoverText(specification.description)
                  }}
                >
                  <FontAwesomeIcon className={style.icon} icon={faInfoCircle} />
                </button>

                {anchorEl && (
                  <Popover
                    id="simple-popover"
                    open={!!anchorEl}
                    anchorEl={anchorEl}
                    onClose={() => {
                      setAnchorEl(null)
                      setPopoverText(null)
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    sx={{ borderRadius: 4 }}
                  >
                    <Typography sx={{ p: 2, maxWidth: '300px' }}>
                      <p>{popoverText}</p>
                    </Typography>
                  </Popover>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </ModalLayout>
  )
}
