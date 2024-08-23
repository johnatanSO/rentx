import { z } from 'zod'

export const formForgotSchema = z.object({
  email: z.string().min(1, 'E-mail não informado'),
})

export type IFormForgot = z.infer<typeof formForgotSchema>
