import { IMailProvider } from './IMailProvider'

export class MockMailProvider implements IMailProvider {
  message: any[] = []

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    })
  }
}
