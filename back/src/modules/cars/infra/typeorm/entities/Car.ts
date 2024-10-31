import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ICreateNewCarDTO } from '../../../repositories/Cars/ICarsRepository'
import { Category } from './Category'
import { CarImage } from './CarImage'
import { Specification } from './Specification'

@Entity('car')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  dailyRate: number

  @Column()
  avaliable: boolean

  @Column()
  licensePlate: string

  @Column()
  fineAmount: number

  @Column()
  brand: string

  @ManyToOne(() => Category, (category) => category)
  category: Category

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => CarImage, (image) => image)
  images: CarImage[]

  @OneToOne(() => CarImage, (image) => image)
  defaultImage: CarImage

  @ManyToMany(() => Specification, (specification) => specification.cars)
  @JoinTable()
  specifications: Specification[]

  @Column()
  reasonUnavaliable?: string

  @Column()
  transmission: string

  constructor(newCarData: ICreateNewCarDTO) {
    Object.assign(newCarData)
  }
}
