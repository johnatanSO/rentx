import {
  Specification,
  SpecificationModel,
} from '../../infra/mongoose/entities/Specification'
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from './ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await SpecificationModel.create({ name, description })
    await specification.save()

    return specification
  }

  async list(): Promise<Specification[]> {
    const specifications = await SpecificationModel.find({})
    return specifications
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await SpecificationModel.findOne({ name })
    return specification
  }
}
