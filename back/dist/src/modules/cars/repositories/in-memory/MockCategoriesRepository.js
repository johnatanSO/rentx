"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCategoriesRepository = void 0;
const Category_1 = require("../../infra/typeorm/entities/Category");
class MockCategoriesRepository {
    constructor() {
        this.categories = [];
    }
    async delete(categoryId) {
        const newCategories = this.categories.filter((category) => category._id.toString() !== categoryId);
        this.categories = newCategories;
    }
    async findById(categoryId) {
        const category = this.categories.find((category) => category._id.toString() === categoryId);
        return category;
    }
    async update(data) {
        const categoryIndex = this.categories.findIndex((category) => category._id.toString() === data._id);
        this.categories[categoryIndex] = {
            ...this.categories[categoryIndex],
            ...data,
        };
    }
    async create({ name, description }) {
        const newCategory = new Category_1.Category({
            name,
            description,
        });
        this.categories.push(newCategory);
        return newCategory;
    }
    async list() {
        return this.categories;
    }
    async findByName(name) {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }
}
exports.MockCategoriesRepository = MockCategoriesRepository;
