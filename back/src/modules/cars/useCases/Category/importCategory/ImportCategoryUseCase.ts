import { ICategoriesRepository } from '../../../repositories/Categories/ICategoriesRepository'
import fs from 'fs'
import { parse } from 'csv-parse'
import { Category } from '../../../infra/mongoose/entities/Category'

interface IImportCategory {
  name: string
  description: string
}

export class ImportCategoryUseCase {
  categoriesRepository: ICategoriesRepository
  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []
      const parseFile = parse({
        delimiter: '|',
      })

      stream.pipe(parseFile)

      parseFile
        .on('data', async (line) => {
          const [name, description] = line
          categories.push({
            name,
            description,
          })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<Category[]> {
    const categories = await this.loadCategories(file)

    const newCategoriesPromise = categories.map(async (category) => {
      const { name, description } = category
      const categoryAlreadyExist =
        await this.categoriesRepository.findByName(name)

      if (!categoryAlreadyExist) {
        return await this.categoriesRepository.create({ name, description })
      }
      return undefined
    })

    return await Promise.all(newCategoriesPromise)
  }
}
