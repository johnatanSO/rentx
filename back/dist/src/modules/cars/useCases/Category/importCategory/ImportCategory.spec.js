"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockCategoriesRepository_1 = require("./../../../repositories/Categories/MockCategoriesRepository");
const AppError_1 = require("../../../../../shared/errors/AppError");
const ImportCategoryUseCase_1 = require("./ImportCategoryUseCase");
let mockCategoriesRepository;
let importCategoryUseCase;
describe('Import categories', () => {
    beforeEach(() => {
        mockCategoriesRepository = new MockCategoriesRepository_1.MockCategoriesRepository();
        importCategoryUseCase = new ImportCategoryUseCase_1.ImportCategoryUseCase(mockCategoriesRepository);
    });
    it('should not be able import categories if file not sent', async () => {
        await expect(importCategoryUseCase.execute(null)).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    /* it('should be able import categories', async () => {
      const createCategory = jest.spyOn(mockCategoriesRepository, 'create')
  
      await importCategoryUseCase.execute({
        buffer: undefined,
        destination: undefined,
        fieldname: undefined,
        filename: 'categories',
        mimetype: undefined,
        originalname: 'categoriesfile',
        path: 'fake/categories',
        size: undefined,
        stream: undefined,
        encoding: undefined,
      })
  
      expect(createCategory).toHaveBeenCalled()
    }) */
});
