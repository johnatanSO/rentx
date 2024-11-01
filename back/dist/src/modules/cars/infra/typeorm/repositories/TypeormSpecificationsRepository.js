"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormSpecificationsRepository = void 0;
const typeorm_1 = require("typeorm");
const Specification_1 = require("../entities/Specification");
class TypeormSpecificationsRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Specification_1.Specification);
    }
    async create({ name, description, }) {
        const newSpecification = this.repository.create({
            name,
            description,
        });
        return await this.repository.save(newSpecification);
    }
    async list() {
        return await this.repository.find();
    }
    async findByName(name) {
        return await this.repository.findOneBy({ name });
    }
    async delete(specificationId) {
        await this.repository.delete(specificationId);
    }
    async findByIds(ids) {
        return await this.repository.findBy({ _id: (0, typeorm_1.In)(ids) });
    }
    async findById(specificationId) {
        return await this.repository.findOneBy({ _id: specificationId });
    }
    async update(data) {
        await this.repository.save(data);
    }
}
exports.TypeormSpecificationsRepository = TypeormSpecificationsRepository;
