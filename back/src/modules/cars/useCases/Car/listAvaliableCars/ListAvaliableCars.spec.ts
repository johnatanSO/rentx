import { MockCarsRepository } from '../../../repositories/Cars/MockCarsRepository'
import { ListAvaliableCarsUseCase } from './ListAvaliableCarsUseCase'

let mockCarsRepository: MockCarsRepository

let listAvaliableCarsUseCase: ListAvaliableCarsUseCase

describe('List cars', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()

    listAvaliableCarsUseCase = new ListAvaliableCarsUseCase(mockCarsRepository)
  })

  it('should be able to list all avaliable cars', async () => {
    const newCar = await mockCarsRepository.create({
      name: 'Audi R8',
      description: 'Carro esportivo',
      dailyRate: 140,
      licensePlate: 'ABC-1204',
      fineAmount: 100,
      brand: 'Audi',
      categoryId: '650cf6788adcd3da7764f340',
    })

    const cars = await listAvaliableCarsUseCase.execute({})

    expect(cars).toContain(newCar)
  })

  it('should be able to list all avaliable cars by brand', async () => {
    const newCar = await mockCarsRepository.create({
      name: 'Viper V8',
      description: 'Carro esportivo',
      dailyRate: 140,
      licensePlate: 'ABC-1204',
      fineAmount: 100,
      brand: 'Viper',
      categoryId: '650cf6788adcd3da7764f340',
    })

    const cars = await listAvaliableCarsUseCase.execute({
      brand: 'Viper',
    })

    expect(cars).toContain(newCar)
  })

  it('should be able to list all avaliable cars by name', async () => {
    const newCar = await mockCarsRepository.create({
      name: 'Car3',
      description: 'Carro esportivo',
      dailyRate: 140,
      licensePlate: 'ABC-1204',
      fineAmount: 100,
      brand: 'Viper',
      categoryId: '650cf6788adcd3da7764f340',
    })

    const cars = await listAvaliableCarsUseCase.execute({
      name: 'Car3',
    })

    expect(cars).toContain(newCar)
  })

  it('should be able to list all avaliable cars by category', async () => {
    const newCar = await mockCarsRepository.create({
      name: 'Car3',
      description: 'Carro esportivo',
      dailyRate: 140,
      licensePlate: 'ABC-1204',
      fineAmount: 100,
      brand: 'Viper',
      categoryId: '650cf6788adcd3da7764f340',
    })

    const cars = await listAvaliableCarsUseCase.execute({
      categoryId: '650cf6788adcd3da7764f340',
    })

    expect(cars).toContain(newCar)
  })
})
