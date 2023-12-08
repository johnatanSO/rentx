import { Specification } from '../../infra/mongoose/entities/Specification'

export interface ICreateSpecificationDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>
  list(): Promise<Specification[]>
  findByName(name: string): Promise<Specification>
  delete(specificationId: string): Promise<void>
  findByIds(ids: string[]): Promise<Specification[]>
  findById(specificationId: string): Promise<Specification>
  update(specificationId: string, fields: any): Promise<void>
}
