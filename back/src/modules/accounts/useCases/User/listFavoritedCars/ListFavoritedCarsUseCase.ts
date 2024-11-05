import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { Car } from '../../../../cars/infra/typeorm/entities/Car'

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
