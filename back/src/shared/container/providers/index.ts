import { IDateProvider } from './DateProvider/IDateProvider'
import { container } from 'tsyringe'
import { DayjsDateProvider } from './DateProvider/DayjsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/EtherealMailProvider'

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
)

container.registerSingleton<IMailProvider>(
  'EtherealMailProvider',
  EtherealMailProvider,
)
