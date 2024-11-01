"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageProvider = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const upload_1 = __importDefault(require("../../../../config/upload"));
class LocalStorageProvider {
    async uploadImage(file, folder) {
        await fs_1.default.promises.rename((0, path_1.resolve)(upload_1.default.tmpFolder, file), (0, path_1.resolve)(`${upload_1.default.tmpFolder}/${folder}`, file));
        return file;
    }
    async deleteImage(file, folder) {
        const filename = (0, path_1.resolve)(`${upload_1.default.tmpFolder}/${folder}`, file);
        try {
            await fs_1.default.promises.stat(filename);
        }
        catch (err) { }
        await fs_1.default.promises.unlink(filename);
    }
}
exports.LocalStorageProvider = LocalStorageProvider;
