"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockSpecificationsRepository = void 0;
const Specification_1 = require("../../infra/typeorm/entities/Specification");
class MockSpecificationsRepository {
    constructor() {
        this.specifications = [];
    }
    async delete(specificationId) {
        this.specifications = this.specifications.filter((specification) => specification._id.toString() !== specificationId);
    }
    async findById(specificationId) {
        return this.specifications.find((specification) => specification._id.toString() === specificationId);
    }
    async update(data) {
        const specificationIndex = this.specifications.findIndex((specification) => specification._id.toString() === data._id);
        this.specifications[specificationIndex] = {
            ...this.specifications[specificationIndex],
            ...data,
        };
    }
    async create({ name, description, }) {
        const newSpecification = new Specification_1.Specification({
            name,
            description,
        });
        this.specifications.push(newSpecification);
        return newSpecification;
    }
    async list() {
        return this.specifications;
    }
    async findByName(name) {
        return this.specifications.find((specification) => specification.name === name);
    }
    async findByIds(ids) {
        const allSpecifications = this.specifications.filter((specification) => ids.includes(specification._id.toString()));
        return allSpecifications;
    }
}
exports.MockSpecificationsRepository = MockSpecificationsRepository;
