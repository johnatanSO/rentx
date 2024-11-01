import { getRepository, Repository } from 'typeorm'
import { ICreateNewCarDTO } from '../../../dtos/Car'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
import { Car } from '../entities/Car'

export class TypeormCarsRepository implements ICarsRepository {
  repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    name,
    transmission,
  }: ICreateNewCarDTO): Promise<Car> {
    const newCar = this.repository.create({
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      name,
      transmission,
    })

    return await this.repository.save(newCar)
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return await this.repository.findOneBy({ licensePlate })
  }

  async listAvaliable(
    categoryId?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    return await this.repository.findBy({ categoryId, brand, name })
  }

  async findById(carId: string): Promise<Car> {
    return await this.repository.findOneBy({ _id: carId })
  }

  async update(data: Car): Promise<void> {
    await this.repository.save(data)
  }

  async addImage(_id: string, imageId: string): Promise<void> {
    throw new Error('add image')
  }

  async listAll(): Promise<Car[]> {
    return await this.repository.find()
  }

  async removeImage(carId: string, imageId: string): Promise<void> {
    throw new Error('removeImage')
  }

  async delete(carId: string): Promise<void> {
    await this.repository.delete(carId)
  }
}
