import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllUsersUseCase } from './ListAllUsersUseCase'

export class ListAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase)
    const users = await listAllUsersUseCase.execute()

    return res.status(200).json({
      success: true,
      message: 'Busca de usuários feita com sucesso',
      items: users,
    })
  }
}
