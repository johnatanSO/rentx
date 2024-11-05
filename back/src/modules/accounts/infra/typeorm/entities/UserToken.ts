import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { ICreateUserTokenDTO } from '../../../dtos/UserTokens'

@Entity('usertokens')
export class UserToken {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column()
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
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
