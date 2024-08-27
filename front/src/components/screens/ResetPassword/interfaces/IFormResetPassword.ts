import { z } from 'zod'

export const formResetPasswordSchema = z
  .object({
    password: z.string().min(1, 'Senha não informada'),
    confirmPassword: z.string().min(1, 'Confirmação de senha não informada'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Senhas diferentes',
    path: ['confirmPassword'],
  })

export type IFormResetPassword = z.infer<typeof formResetPasswordSchema>
