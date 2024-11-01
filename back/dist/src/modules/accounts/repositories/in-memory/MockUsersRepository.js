"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUsersRepository = void 0;
const User_1 = require("../../infra/typeorm/entities/User");
class MockUsersRepository {
    constructor() {
        this.users = [];
    }
    async list() {
        return this.users;
    }
    async addCarToFavorite(carId, userId) {
        const index = this.users.findIndex((user) => user._id.toString() === userId.toString());
        const newFavoriteCars = [...this.users[index]?.favoriteCars, carId];
        if (index !== -1) {
            this.users[index] = {
                ...this.users[index],
                favoriteCars: newFavoriteCars,
            };
        }
    }
    async removeFavoritedCar(carId, userId) {
        const index = this.users.findIndex((user) => user._id.toString() === userId);
        const newFavoriteCars = this.users[index].favoriteCars.filter((favoriteCarId) => favoriteCarId.toString() !== carId);
        if (index !== -1) {
            this.users[index] = {
                ...this.users[index],
                favoriteCars: newFavoriteCars,
            };
        }
    }
    async create({ name, email, password, driverLicense, isAdmin, }) {
        const newUser = new User_1.User({
            name,
            email,
            password,
            driverLicense,
            isAdmin: isAdmin || false,
        });
        this.users.push(newUser);
        return newUser;
    }
    async findByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
    async findById(_id) {
        const user = this.users.find((user) => user._id.toString() === _id);
        return user;
    }
    async update(data) {
        const index = this.users.findIndex((user) => user._id.toString() === data._id.toString());
        if (index !== -1) {
            this.users[index] = {
                ...this.users[index],
                ...data,
            };
        }
    }
    async listFavoriteCars(userId) {
        const user = this.users.find((user) => user._id.toString() === userId);
        return user.favoriteCars;
    }
}
exports.MockUsersRepository = MockUsersRepository;
