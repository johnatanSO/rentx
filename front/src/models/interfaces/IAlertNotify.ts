export interface IAlertNotify {
  open: boolean
  type: 'success' | 'error'
  text: string
  handleClose: () => void
}
