import { Model } from 'mongoose'
import {
  Specification,
  SpecificationModel,
} from '../../infra/mongoose/entities/Specification'
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from './ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private model: Model<Specification>
  constructor() {
    this.model = SpecificationModel
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await this.model.create({ name, description })
    await specification.save()

    return specification
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.model.find({})
    return specifications
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.model.findOne({ name })
    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.model.find({ _id: { $in: ids } })
  }
}
