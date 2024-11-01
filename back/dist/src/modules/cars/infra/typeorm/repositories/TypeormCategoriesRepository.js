"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormCategoriesRepository = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("../entities/Category");
class TypeormCategoriesRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Category_1.Category);
    }
    async create({ name, description }) {
        const newCategory = this.repository.create({ name, description });
        return await this.repository.save(newCategory);
    }
    async list() {
        return await this.repository.find();
    }
    async delete(categoryId) {
        await this.repository.delete(categoryId);
    }
    async findByName(name) {
        return await this.repository.findOneBy({ name });
    }
    async findById(categoryId) {
        return await this.repository.findOneBy({ _id: categoryId });
    }
    async update(data) {
        await this.repository.save(data);
    }
}
exports.TypeormCategoriesRepository = TypeormCategoriesRepository;
