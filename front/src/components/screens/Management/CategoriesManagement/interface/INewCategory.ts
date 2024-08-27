import { z } from 'zod'

export const newCategorySchema = z.object({
  name: z.string().min(1, 'Nome da categoria não informado'),
  description: z.string(),
})

export type INewCategory = z.infer<typeof newCategorySchema>
