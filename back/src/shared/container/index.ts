import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/accounts/repositories/Users/IUsersRepository'
import { UsersRepository } from '../../modules/accounts/repositories/Users/UsersRepository'
import { CarsRepository } from '../../modules/cars/repositories/Cars/CarsRepository'
import { ICarsRepository } from '../../modules/cars/repositories/Cars/ICarsRepository'
import CategoriesRepository from '../../modules/cars/repositories/Categories/CategoriesRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/Categories/ICategoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/Specifitacions/ISpecificationsRepository'
import { SpecificationsRepository } from '../../modules/cars/repositories/Specifitacions/SpecificationsRepository'

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

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)
