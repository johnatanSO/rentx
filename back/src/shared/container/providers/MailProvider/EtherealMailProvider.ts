import { injectable } from 'tsyringe'
import { IMailProvider } from './IMailProvider'
import nodemailer, { Transporter } from 'nodemailer'

@injectable()
export class EtherealMailProvider implements IMailProvider {
  client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        this.client = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    await this.client.sendMail({
      to,
      from: 'Rentx <noreply@rentx.com.br>',
      subject,
      text: body,
      html: body,
    })
  }
}
