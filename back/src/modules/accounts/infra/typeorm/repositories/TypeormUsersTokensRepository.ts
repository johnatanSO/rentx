import { Repository } from 'typeorm'
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository'
import { UserToken } from '../entities/UserToken'
import { ICreateUserTokenDTO } from '../../../dtos/UserTokens'
import { app } from '../../../../../shared/infra/http/app'

export class TypeormUsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = app.db.getRepository(UserToken)
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const newUserToken = this.repository.create({
      expiresDate,
      refreshToken,
      userId,
    })

    return await this.repository.save(newUserToken)
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken> {
    return await this.repository.findOneBy({
      userId,
      refreshToken,
    })
  }

  async deleteById(tokenId: string): Promise<void> {
    await this.repository.delete(tokenId)
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    return await this.repository.findOneBy({ refreshToken })
  }
}
