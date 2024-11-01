"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayjsDateProvider = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
class DayjsDateProvider {
    endDay(date) {
        return (0, dayjs_1.default)(date).endOf('day').toDate();
    }
    compareInHours(startDate, endDate) {
        const endDateUTC = this.convertToUTC(endDate);
        const startDateUTC = this.convertToUTC(startDate);
        return (0, dayjs_1.default)(endDateUTC).diff(startDateUTC, 'hours');
    }
    compareInDays(startDate, endDate) {
        const endDateUTC = this.convertToUTC(endDate);
        const startDateUTC = this.convertToUTC(startDate);
        return (0, dayjs_1.default)(endDateUTC).diff(startDateUTC, 'days');
    }
    convertToUTC(date) {
        return (0, dayjs_1.default)(date).utc().local().format();
    }
    dateNow() {
        return (0, dayjs_1.default)().toDate();
    }
    addDays(days) {
        return (0, dayjs_1.default)().add(days, 'days').toDate();
    }
    addHours(hours) {
        return (0, dayjs_1.default)().add(hours, 'hours').toDate();
    }
    compareBefore(startDate, endDate) {
        return (0, dayjs_1.default)(startDate).isBefore(endDate);
    }
}
exports.DayjsDateProvider = DayjsDateProvider;
