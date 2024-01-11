import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/accounts/repositories/Users/IUsersRepository'
import { UsersRepository } from '../../modules/accounts/repositories/Users/UsersRepository'
import { CarsRepository } from '../../modules/cars/repositories/Cars/CarsRepository'
import { ICarsRepository } from '../../modules/cars/repositories/Cars/ICarsRepository'
import { CarsImagesRepository } from '../../modules/cars/repositories/CarsImages/CarsImagesRepository'
import { ICarsImagesRepository } from '../../modules/cars/repositories/CarsImages/ICarsImagesRepository'
import CategoriesRepository from '../../modules/cars/repositories/Categories/CategoriesRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/Categories/ICategoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/Specifitacions/ISpecificationsRepository'
import { SpecificationsRepository } from '../../modules/cars/repositories/Specifitacions/SpecificationsRepository'
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '../../modules/rentals/repositories/RentalsRepository'
import './providers'
import { IUsersTokensRepository } from '../../modules/accounts/repositories/UsersTokens/IUsersTokensRepository'
import { UsersTokensRepository } from '../../modules/accounts/repositories/UsersTokens/UsersTokensRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)
