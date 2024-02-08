import fs from 'fs'
import { SES } from 'aws-sdk'
import handlebars from 'handlebars'
import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'

import { IMailProvider } from './IMailProvider'

@injectable()
export class SESMailProvider implements IMailProvider {
  client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2012-10-17',
        region: process.env.AWS_BUCKET_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }),
    })
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    await this.client.sendMail({
      to,
      from: 'Rentx <devsantosjohn@gmail.com>',
      subject,
      html: templateHTML,
    })
  }
}
