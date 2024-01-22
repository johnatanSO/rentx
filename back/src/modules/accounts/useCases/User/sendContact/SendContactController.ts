import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SendContactUseCase } from './SendContactUseCase'

export class SendContactController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, message } = req.body

    const sendContactUseCase = container.resolve(SendContactUseCase)
    await sendContactUseCase.execute({
      name,
      email,
      message,
    })

    return res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso',
    })
  }
}
