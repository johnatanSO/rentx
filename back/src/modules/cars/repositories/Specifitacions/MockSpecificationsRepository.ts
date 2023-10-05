import { Types } from 'mongoose'
import { Specification } from '../../infra/mongoose/entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from './ISpecificationsRepository'

export class MockSpecificationsRepository implements ISpecificationsRepository {
  specifications: Specification[] = []

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const newSpecification = {
      name,
      description,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
    }

    this.specifications.push(newSpecification)

    return newSpecification
  }

  async list(): Promise<Specification[]> {
    return this.specifications
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name,
    )
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification._id.toString()),
    )

    return allSpecifications
  }
}
