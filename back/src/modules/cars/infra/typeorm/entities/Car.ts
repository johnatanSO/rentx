import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ICreateNewCarDTO } from '../../../dtos/Car'
import { Category } from './Category'
import { CarImage } from './CarImage'
import { Specification } from './Specification'

@Entity('cars')
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

  @Column()
  categoryId: string

  @ManyToOne(() => Category, (category) => category._id)
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => CarImage, (image) => image._id)
  images: CarImage[]

  @OneToOne(() => CarImage, (image) => image._id)
  defaultImage: CarImage

  @ManyToMany(() => Specification)
  specifications: Specification[]

  @Column()
  reasonUnavaliable?: string

  @Column()
  transmission: string

  constructor(newCarData: ICreateNewCarDTO) {
    Object.assign(this, newCarData)
  }
}
