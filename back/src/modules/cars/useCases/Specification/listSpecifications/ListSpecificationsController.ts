import { Request, Response } from 'express'
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'
import { container } from 'tsyringe'

export class ListSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase,
    )
    const specifications = await listSpecificationsUseCase.execute()

    return res.status(200).json({
      success: true,
      title: 'Busca de espeficicações concluída com sucesso',
      items: specifications,
    })
  }
}
