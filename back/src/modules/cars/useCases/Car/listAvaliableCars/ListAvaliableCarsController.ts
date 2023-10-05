import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAvaliableCarsUseCase } from './ListAvaliableCarsUseCase'

export class ListAvaliableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { categoryId, name, brand } = req.query

    const listAvaliableCarsUseCase = container.resolve(ListAvaliableCarsUseCase)

    const cars = await listAvaliableCarsUseCase.execute({
      categoryId: categoryId as string,
      name: name as string,
      brand: brand as string,
    })

    return res.status(200).json({
      success: true,
      message: 'Busca de carros concluída com sucesso',
      items: cars,
    })
  }
}
