import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Car } from '../../../../cars/infra/typeorm/entities/Car'
import { ICreateUserDTO } from '../../../dtos/User'

@Entity('user')
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

  @Column()
  isAdmin: boolean

  @CreateDateColumn()
  createdAt: Date

  @Column()
  avatar: string

  @Column()
  avatarURL: string

  @ManyToMany(() => Car)
  favoriteCars: Car[]

  constructor(newUserData: ICreateUserDTO) {
    Object.assign(this, newUserData)
  }
}
