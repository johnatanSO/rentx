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

  @Column({ default: null })
  name: string

  @Column({ default: null })
  description: string

  @Column({ default: 0 })
  dailyRate: number

  @Column({ default: true })
  avaliable: boolean

  @Column({ default: null })
  licensePlate: string

  @Column({ default: 0 })
  fineAmount: number

  @Column({ default: null })
  brand: string

  @Column({ default: null })
  categoryId: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => CarImage, (image) => image)
  images: CarImage[]

  @Column({ default: null })
  defaultImageId: string

  @OneToOne(() => CarImage)
  @JoinColumn({ name: 'defaultImageId' })
  defaultImage: CarImage

  @ManyToMany(() => Specification)
  specifications: Specification[]

  @Column({ default: null })
  reasonUnavaliable?: string

  @Column({ default: null })
  transmission: string

  constructor(newCarData: ICreateNewCarDTO) {
    Object.assign(this, newCarData)
  }
}
