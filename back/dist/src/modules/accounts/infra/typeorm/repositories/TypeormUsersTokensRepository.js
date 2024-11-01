"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormUsersTokensRepository = void 0;
const typeorm_1 = require("typeorm");
const UserToken_1 = require("../entities/UserToken");
class TypeormUsersTokensRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(UserToken_1.UserToken);
    }
    async create({ expiresDate, refreshToken, userId, }) {
        const newUserToken = this.repository.create({
            expiresDate,
            refreshToken,
            userId,
        });
        return await this.repository.save(newUserToken);
    }
    async findByUserIdAndRefreshToken(userId, refreshToken) {
        return await this.repository.findOneBy({
            userId,
            refreshToken,
        });
    }
    async deleteById(tokenId) {
        await this.repository.delete(tokenId);
    }
    async findByRefreshToken(refreshToken) {
        return await this.repository.findOneBy({ refreshToken });
    }
}
exports.TypeormUsersTokensRepository = TypeormUsersTokensRepository;
