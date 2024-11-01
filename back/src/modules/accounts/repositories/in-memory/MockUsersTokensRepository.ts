import { IUsersTokensRepository } from '../IUsersTokensRepository'
import { UserToken } from '../../infra/typeorm/entities/UserToken'
import { ICreateUserTokenDTO } from '../../dtos/UserTokens'

export class MockUsersTokensRepository implements IUsersTokensRepository {
  usersTokens: UserToken[] = []

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const newUserToken = new UserToken({
      expiresDate,
      refreshToken,
      userId,
    })

    this.usersTokens.push(newUserToken)

    return newUserToken
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (token) =>
        token.refreshToken === refreshToken &&
        token.userId.toString() === userId.toString(),
    )

    return userToken
  }

  async deleteById(tokenId: string): Promise<void> {
    this.usersTokens = this.usersTokens.filter(
      (token) => token._id.toString() !== tokenId.toString(),
    )
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (token) => token.refreshToken === refreshToken,
    )

    return userToken
  }
}
