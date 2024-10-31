import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Car } from '../../../../cars/infra/typeorm/entities/Car'
import { ICreateUserDTO } from '../../../repositories/Users/IUsersRepository'

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

  @OneToMany(() => Car, (car) => car._id)
  favoriteCars: Car[]

  constructor(userData: ICreateUserDTO) {
    Object.assign(userData)
  }
}
