"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUsersTokensRepository = void 0;
const UserToken_1 = require("../../infra/typeorm/entities/UserToken");
class MockUsersTokensRepository {
    constructor() {
        this.usersTokens = [];
    }
    async create({ expiresDate, refreshToken, userId, }) {
        const newUserToken = new UserToken_1.UserToken({
            expiresDate,
            refreshToken,
            userId,
        });
        this.usersTokens.push(newUserToken);
        return newUserToken;
    }
    async findByUserIdAndRefreshToken(userId, refreshToken) {
        const userToken = this.usersTokens.find((token) => token.refreshToken === refreshToken &&
            token.userId.toString() === userId.toString());
        return userToken;
    }
    async deleteById(tokenId) {
        this.usersTokens = this.usersTokens.filter((token) => token._id.toString() !== tokenId.toString());
    }
    async findByRefreshToken(refreshToken) {
        const userToken = this.usersTokens.find((token) => token.refreshToken === refreshToken);
        return userToken;
    }
}
exports.MockUsersTokensRepository = MockUsersTokensRepository;
