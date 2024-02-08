import { container } from 'tsyringe'

import { IDateProvider } from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/DayjsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'
import { S3StorageProvider } from './StorageProvider/S3StorageProvider'
import { SESMailProvider } from './MailProvider/SESMailProvider'

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
)

container.registerInstance<IMailProvider>('MailProvider', new SESMailProvider())

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  S3StorageProvider,
)
