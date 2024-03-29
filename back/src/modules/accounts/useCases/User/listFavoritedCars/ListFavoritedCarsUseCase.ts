import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { Car } from '../../../../cars/infra/mongoose/entities/Car'

@injectable()
export class ListFavoritedCarsUseCase {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(userId: string): Promise<Car[]> {
    const favoriteCars = await this.usersRepository.listFavoriteCars(userId)
    return favoriteCars
  }
}
