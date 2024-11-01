import { Repository } from 'typeorm'
import { UserToken } from '../../infra/typeorm/entities/UserToken'
import { IUsersTokensRepository } from './IUsersTokensRepository'

export class TypeormUsersTokensRepository
  extends Repository<UserToken>
  implements IUsersTokensRepository
{
  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken> {
    throw new Error('metodo não implementado')
  }

  async deleteById(tokenId: string): Promise<void> {
    await this.delete(tokenId)
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    return await this.findOneBy({ refreshToken })
  }
}
