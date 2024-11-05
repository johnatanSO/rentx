import { getRepository, Repository } from 'typeorm'
import { ICreateRentalDTO, IListRentalsDTO } from '../../../dtos/Rental'
import { IRentalsRepository } from '../../../repositories/IRentalsRepository'
import { Rental } from '../entities/Rental'

export class TypeormRentalsRepository implements IRentalsRepository {
  repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return await this.repository.findOneBy({
      carId,
      endDate: null,
    })
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return await this.repository.findOneBy({
      userId,
      endDate: null,
    })
  }

  async findById(rentalId: string): Promise<Rental> {
    return await this.repository.findOneBy({ _id: rentalId })
  }

  async create({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const newRental = this.repository.create({
      carId,
      expectedReturnDate,
      userId,
    })

    return await this.repository.save(newRental)
  }

  async list(userId: string): Promise<Rental[]> {
    return await this.repository.findBy({ userId })
  }

  async listAll({
    carId,
    filterEndDate,
    filterStartDate,
    userId,
  }: IListRentalsDTO): Promise<Rental[]> {
    return await this.repository.findBy({
      carId,
      endDate: new Date(filterEndDate),
      startDate: new Date(filterStartDate),
      userId,
    })
  }

  async update(data: Rental): Promise<void> {
    await this.repository.save(data)
  }
}
