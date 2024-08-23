import { z } from 'zod'

export const formAuthSchema = z.object({
  email: z.string().min(1, 'E-mail não informado'),
  password: z.string().min(1, 'Senha não informada'),
})

export type IFormAuth = z.infer<typeof formAuthSchema>
