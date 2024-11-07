import { Repository } from 'typeorm'
import { ICreateNewCarDTO } from '../../../dtos/Car'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
import { Car } from '../entities/Car'
import { app } from '../../../../../shared/infra/http/app'

export class TypeormCarsRepository implements ICarsRepository {
  repository: Repository<Car>

  constructor() {
    this.repository = app.db.getRepository(Car)
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
    return await this.repository.find({
      where: { categoryId, brand, name },
      relations: ['images', 'category', 'specifications'],
    })
  }

  async findById(carId: string): Promise<Car> {
    return await this.repository.findOne({
      where: {
        _id: carId,
      },
      relations: ['images', 'category', 'specifications'],
    })
  }

  async update(data: Car): Promise<void> {
    await this.repository.save(data)
  }

  async listAll(): Promise<Car[]> {
    return await this.repository.find()
  }

  async delete(carId: string): Promise<void> {
    await this.repository.delete(carId)
  }
}
