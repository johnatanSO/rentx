import { z } from 'zod'

export const formContactSchema = z.object({
  name: z.string().min(1, 'Nome não informado'),
  email: z.string().min(1, 'E-mail não informado'),
  message: z.string().min(1, 'Digite uma mensagem'),
})

export type IFormContact = z.infer<typeof formContactSchema>
