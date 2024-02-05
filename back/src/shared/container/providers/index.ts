import { container } from 'tsyringe'

import { IDateProvider } from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/DayjsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/EtherealMailProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'
import { S3StorageProvider } from './StorageProvider/S3StorageProvider'

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
)

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
)

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  S3StorageProvider,
)
