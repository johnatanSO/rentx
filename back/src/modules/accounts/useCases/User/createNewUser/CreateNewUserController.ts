import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewUserUseCase } from './CreateNewUserUseCase'

export class CreateNewUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driverLicense } = req.body
    const createNewUserUseCase = container.resolve(CreateNewUserUseCase)
    const newUser = await createNewUserUseCase.execute({
      name,
      email,
      password,
      driverLicense,
    })

    return res.status(201).json({
      success: true,
      title: 'Usuário criado com sucesso.',
      item: newUser,
    })
  }
}
