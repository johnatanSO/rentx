"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormUsersRepository = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
class TypeormUsersRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(User_1.User);
    }
    async update(data) {
        await this.repository.save(data);
    }
    async create({ driverLicense, email, name, password, isAdmin, }) {
        const newUser = this.repository.create({
            driverLicense,
            email,
            name,
            password,
            isAdmin,
        });
        return await this.repository.save(newUser);
    }
    async findByEmail(email) {
        return await this.repository.findOneBy({ email });
    }
    async findById(_id) {
        return await this.repository.findOneBy({ _id });
    }
}
exports.TypeormUsersRepository = TypeormUsersRepository;
