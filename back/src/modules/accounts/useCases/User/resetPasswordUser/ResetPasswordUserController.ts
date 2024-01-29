import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase'

export class ResetPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password } = req.body
    const { refreshToken } = req.query
    const resetUserUseCase = container.resolve(ResetPasswordUserUseCase)
    await resetUserUseCase.execute({
      refreshToken: String(refreshToken),
      password,
    })

    return res.status(200).json({
      success: true,
    })
  }
}
