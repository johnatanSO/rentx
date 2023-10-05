import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      const authenticateUserUseCate = container.resolve(AuthenticateUserUseCase)
      const authenticatedUser = await authenticateUserUseCate.execute({
        email,
        password,
      })

      return res.status(200).json({
        success: true,
        title: 'Usuário autenticado com sucesso',
        user: authenticatedUser.user,
        token: authenticatedUser.token,
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        title: 'Erro de autenticação',
        message: err.message,
      })
    }
  }
}
