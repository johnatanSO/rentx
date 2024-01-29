import { Types } from 'mongoose'
import { IUserToken } from '../../infra/mongoose/entities/UserToken'
import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from './IUsersTokensRepository'

export class MockUsersTokensRepository implements IUsersTokensRepository {
  usersTokens: IUserToken[]

  async create({
    expiresDate,
    refreshToken,
    user,
  }: ICreateUserTokenDTO): Promise<IUserToken> {
    const newUserToken = {
      expiresDate,
      refreshToken,
      user: new Types.ObjectId(user),
      createdAt: new Date(),
      _id: new Types.ObjectId(),
    }

    this.usersTokens.push(newUserToken)

    return newUserToken
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<IUserToken> {
    const userToken = this.usersTokens.find((token) => {
      if (
        token.refreshToken === refreshToken &&
        token.user.toString() === userId.toString()
      ) {
        return token
      }
      return undefined
    })

    return userToken
  }

  async deleteById(tokenId: string): Promise<void> {
    this.usersTokens = this.usersTokens.filter(
      (token) => token._id.toString() !== tokenId.toString(),
    )
  }

  async findByRefreshToken(refreshToken: string): Promise<IUserToken> {
    const userToken = this.usersTokens.find(
      (token) => token.refreshToken === refreshToken,
    )

    return userToken
  }
}
