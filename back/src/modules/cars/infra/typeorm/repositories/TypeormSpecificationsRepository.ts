import { In, Repository } from 'typeorm'
import { ICreateSpecificationDTO } from '../../../dtos/Specification'
import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'
import { Specification } from '../entities/Specification'
import { app } from '../../../../../shared/infra/http/app'

export class TypeormSpecificationsRepository
  implements ISpecificationsRepository
{
  repository: Repository<Specification>

  constructor() {
    this.repository = app.db.getRepository(Specification)
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const newSpecification = this.repository.create({
      name,
      description,
    })

    return await this.repository.save(newSpecification)
  }

  async list(): Promise<Specification[]> {
    return await this.repository.find()
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOneBy({ name })
  }

  async delete(specificationId: string): Promise<void> {
    await this.repository.delete(specificationId)
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findBy({ _id: In(ids) })
  }

  async findById(specificationId: string): Promise<Specification> {
    return await this.repository.findOneBy({ _id: specificationId })
  }

  async update(data: Specification): Promise<void> {
    await this.repository.save(data)
  }
}
