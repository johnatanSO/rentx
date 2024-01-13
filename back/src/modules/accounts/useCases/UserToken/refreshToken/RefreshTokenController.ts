import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
    const { refreshToken, newToken } = await refreshTokenUseCase.execute(token)

    return res.status(200).json({
      success: true,
      token: newToken,
      refreshToken,
    })
  }
}
