import { ICreateSpecificationDTO } from '../dtos/Specification'
import { Specification } from '../infra/typeorm/entities/Specification'

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>
  list(): Promise<Specification[]>
  findByName(name: string): Promise<Specification>
  delete(specificationId: string): Promise<void>
  findByIds(ids: string[]): Promise<Specification[]>
  findById(specificationId: string): Promise<Specification>
  update(specification: Specification): Promise<void>
}
