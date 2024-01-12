import { container } from 'tsyringe'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'
import { Request, Response } from 'express'

export class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase,
    )

    await sendForgotPasswordMailUseCase.execute(email)

    return res.status(200).json({ success: true })
  }
}
