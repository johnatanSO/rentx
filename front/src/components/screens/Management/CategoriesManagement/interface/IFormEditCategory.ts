import { z } from 'zod'

export const formEditCategorySchema = z.object({
  name: z.string().min(1, 'Nome da categoria não informado'),
  description: z.string(),
  _id: z.string(),
})

export type IFormEditCategory = z.infer<typeof formEditCategorySchema>
