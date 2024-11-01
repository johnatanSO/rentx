import { ICreateSpecificationDTO } from '../../dtos/Specification'
import { Specification } from '../../infra/typeorm/entities/Specification'
import { ISpecificationsRepository } from '../ISpecificationsRepository'

export class MockSpecificationsRepository implements ISpecificationsRepository {
  specifications: Specification[] = []

  async delete(specificationId: string): Promise<void> {
    this.specifications = this.specifications.filter(
      (specification) => specification._id.toString() !== specificationId,
    )
  }

  async findById(specificationId: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification._id.toString() === specificationId,
    )
  }

  async update(data: Specification): Promise<void> {
    const specificationIndex = this.specifications.findIndex(
      (specification) => specification._id.toString() === data._id,
    )

    this.specifications[specificationIndex] = {
      ...this.specifications[specificationIndex],
      ...data,
    }
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const newSpecification = new Specification({
      name,
      description,
    })

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
