export interface IAlertConfirm {
  open: boolean
  title: string
  text: string
  handleClose: () => void
  onClickAgree(): Promise<void>
}
