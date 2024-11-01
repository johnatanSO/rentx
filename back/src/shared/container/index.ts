import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository'
import { ICarsImagesRepository } from '../../modules/cars/repositories/ICarsImagesRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository'
import { IUsersTokensRepository } from '../../modules/accounts/repositories/IUsersTokensRepository'
import { TypeormCategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/TypeormCategoriesRepository'
import { TypeormSpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/TypeormSpecificationsRepository'
import { TypeormCarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/TypeormCarsImagesRepository'
import { TypeormRentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/TypeormRentalsRepository'
import { TypeormUsersTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/TypeormUsersTokensRepository'
import { TypeormCarsRepository } from '../../modules/cars/infra/typeorm/repositories/TypeormCarsRepository'
import { TypeormUsersRepository } from '../../modules/accounts/infra/typeorm/repositories/TypeormUsersRepository'
import './providers'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  TypeormCategoriesRepository,
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  TypeormSpecificationsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  TypeormUsersRepository,
)

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  TypeormCarsImagesRepository,
)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  TypeormRentalsRepository,
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  TypeormUsersTokensRepository,
)

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  TypeormCarsRepository,
)
