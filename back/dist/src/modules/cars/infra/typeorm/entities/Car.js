"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const CarImage_1 = require("./CarImage");
const Specification_1 = require("./Specification");
let Car = class Car {
    constructor(newCarData) {
        Object.assign(this, newCarData);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Car.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Car.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Car.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Car.prototype, "dailyRate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Car.prototype, "avaliable", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Car.prototype, "licensePlate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Car.prototype, "fineAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Car.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Car.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category._id),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", Category_1.Category)
], Car.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Car.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CarImage_1.CarImage, (image) => image._id),
    __metadata("design:type", Array)
], Car.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => CarImage_1.CarImage, (image) => image._id),
    __metadata("design:type", CarImage_1.CarImage)
], Car.prototype, "defaultImage", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Specification_1.Specification),
    __metadata("design:type", Array)
], Car.prototype, "specifications", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Car.prototype, "reasonUnavaliable", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Car.prototype, "transmission", void 0);
Car = __decorate([
    (0, typeorm_1.Entity)('car'),
    __metadata("design:paramtypes", [Object])
], Car);
exports.Car = Car;
