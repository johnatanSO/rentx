import { IDateProvider } from './DateProvider/IDateProvider'
import { container } from 'tsyringe'
import { DayjsDateProvider } from './DateProvider/DayjsDateProvider'

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
)
