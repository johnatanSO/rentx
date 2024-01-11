import { Model } from 'mongoose'
import {
  IUserToken,
  UserTokenModel,
} from '../../infra/mongoose/entities/UserToken'
import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from './IUsersTokensRepository'

export class UsersTokensRepository implements IUsersTokensRepository {
  private model: Model<IUserToken>
  constructor() {
    this.model = UserTokenModel
  }

  async create({
    user,
    expiresDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<IUserToken> {
    const token = await this.model.create({
      user,
      expiresDate,
      refreshToken,
    })

    await token.save()

    return token
  }
}
