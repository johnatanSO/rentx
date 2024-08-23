import { z } from 'zod'

export const newValuesUserInfoSchema = z.object({
  name: z.string().min(1, 'Nome não foi informado'),
  email: z.string().min(1, 'E-mail não informado'),
  isAdmin: z.boolean(),
})

export type INewValuesUserInfo = z.infer<typeof newValuesUserInfoSchema>
