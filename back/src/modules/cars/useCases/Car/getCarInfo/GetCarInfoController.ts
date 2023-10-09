import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCarInfoUseCase } from './GetCarInfoUseCase'

export class GetCarInfoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params

    const getCarInfoUseCase = container.resolve(GetCarInfoUseCase)
    const car = await getCarInfoUseCase.execute(carId)

    return res.status(200).json({
      success: 'true',
      title: 'Busca de informações do carro concluída com sucesso',
      item: car,
    })
  }
}
