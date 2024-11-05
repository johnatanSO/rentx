import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Car } from '../../../../cars/infra/typeorm/entities/Car'
import { ICreateUserDTO } from '../../../dtos/User'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  email: string

  @Column()
  driverLicense: string

  @Column({ default: false })
  isAdmin: boolean

  @CreateDateColumn()
  createdAt: Date

  @Column({ default: null })
  avatar: string

  @Column({ default: null })
  avatarURL: string

  @ManyToMany(() => Car)
  favoriteCars: Car[]

  constructor(newUserData: ICreateUserDTO) {
    Object.assign(this, newUserData)
  }
}
