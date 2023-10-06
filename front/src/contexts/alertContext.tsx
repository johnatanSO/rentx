import { ReactNode, createContext, useState } from 'react'
import { AlertConfirm } from '@/components/_ui/AlertConfirm'
import { AlertNotify } from '@/components/_ui/AlertNotify'

interface AlertContextComponentProps {
  children: ReactNode
}

interface AlertConfirmConfigs {
  open: boolean
  title: string
  text: string
  handleClose: () => void
  onClickAgree: () => void
}

interface AlertNotifyConfigs {
  open: boolean
  type: 'success' | 'error'
  text: string
  handleClose: () => void
}

interface AlertContextInterface {
  alertConfirmConfigs: AlertConfirmConfigs
  setAlertConfirmConfigs: (alertConfigs: AlertConfirmConfigs) => void
  alertNotifyConfigs: AlertNotifyConfigs
  setAlertNotifyConfigs: (notifyConfigs: AlertNotifyConfigs) => void
}

export const AlertContext = createContext({} as AlertContextInterface)

export function AlertContextComponent({
  children,
}: AlertContextComponentProps) {
  const [alertConfirmConfigs, setAlertConfirmConfigs] =
    useState<AlertConfirmConfigs>({
      open: false,
      title: '',
      text: '',
      handleClose: onCloseAlertConfirm,
      onClickAgree: () => undefined,
    })

  const [alertNotifyConfigs, setAlertNotifyConfigs] =
    useState<AlertNotifyConfigs>({
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
      onClickAgree: () => undefined,
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
