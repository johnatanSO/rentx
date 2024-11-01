import { ICreateUserTokenDTO } from '../dtos/UserTokens'
import { UserToken } from '../infra/typeorm/entities/UserToken'

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken>
  deleteById(tokenId: string): Promise<void>
  findByRefreshToken(refreshToken: string): Promise<UserToken>
}
