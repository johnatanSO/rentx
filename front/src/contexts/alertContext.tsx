'use client'
import { ReactNode, createContext, useState } from 'react'
import { AlertConfirm } from '@/components/layout/AlertConfirm/index'
import { AlertNotify } from '@/components/layout/AlertNotify/index'
import { IAlertConfirm } from '@/models/interfaces/IAlertConfirm'
import { IAlertNotify } from '@/models/interfaces/IAlertNotify'

interface AlertContextComponentProps {
  children: ReactNode
}

interface AlertContextInterface {
  alertConfirmConfigs: IAlertConfirm
  setAlertConfirmConfigs: (alertConfigs: IAlertConfirm) => void
  alertNotifyConfigs: IAlertNotify
  setAlertNotifyConfigs: (notifyConfigs: IAlertNotify) => void
}

export const AlertContext = createContext({} as AlertContextInterface)

export function AlertContextComponent({
  children,
}: AlertContextComponentProps) {
  const [alertConfirmConfigs, setAlertConfirmConfigs] = useState<IAlertConfirm>(
    {
      open: false,
      title: '',
      text: '',
      handleClose: onCloseAlertConfirm,
      onClickAgree: async () => undefined,
    },
  )

  const [alertNotifyConfigs, setAlertNotifyConfigs] = useState<IAlertNotify>({
    open: false,
    text: '',
    type: 'success',
    handleClose: onCloseNotify,
  })

  function onCloseNotify() {
    setAlertNotifyConfigs({
      ...alertNotifyConfigs,
      open: false,
      text: '',
      type: 'success',
    })
  }

  function onCloseAlertConfirm() {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: false,
      title: '',
      text: '',
      onClickAgree: async () => undefined,
    })
  }

  return (
    <AlertContext.Provider
      value={{
        alertConfirmConfigs,
        setAlertConfirmConfigs,
        alertNotifyConfigs,
        setAlertNotifyConfigs,
      }}
    >
      {children}
      <AlertConfirm />
      <AlertNotify />
    </AlertContext.Provider>
  )
}
