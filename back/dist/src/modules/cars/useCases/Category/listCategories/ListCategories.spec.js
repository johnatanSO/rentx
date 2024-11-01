"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockCategoriesRepository_1 = require("./../../../repositories/Categories/MockCategoriesRepository");
const ListCategoriesUseCase_1 = require("./ListCategoriesUseCase");
let listCategoriesUseCase;
let mockCategoriesRepository;
describe('List categories', () => {
    beforeEach(() => {
        mockCategoriesRepository = new MockCategoriesRepository_1.MockCategoriesRepository();
        listCategoriesUseCase = new ListCategoriesUseCase_1.ListCategoriesUseCase(mockCategoriesRepository);
    });
    it('should be able list categories', async () => {
        await mockCategoriesRepository.create({
            name: 'Category name',
            description: 'Category description',
        });
        const categories = await listCategoriesUseCase.execute();
        expect(categories.length).toBeGreaterThan(0);
    });
});
