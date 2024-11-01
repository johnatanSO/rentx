import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { ICreateUserTokenDTO } from '../../../dtos/UserTokens'

@Entity('usertoken')
export class UserToken {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @ManyToOne(() => User, (user) => user._id)
  user: User

  @Column()
  refreshToken: string

  @Column()
  expiresDate: Date

  @CreateDateColumn()
  createdAt: Date

  constructor(newUserTokenData: ICreateUserTokenDTO) {
    Object.assign(this, newUserTokenData)
  }
}
