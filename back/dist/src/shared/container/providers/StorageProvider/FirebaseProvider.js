"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseProvider = void 0;
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
const path_1 = require("path");
const storage_1 = require("firebase-admin/storage");
const app_1 = require("firebase-admin/app");
const upload_1 = __importDefault(require("../../../../config/upload"));
const firebaseKey_json_1 = __importDefault(require("../../../../config/firebaseKey.json"));
const AppError_1 = require("../../../errors/AppError");
class FirebaseProvider {
    constructor() {
        this.STORAGE_URL = 'https://storage.googleapis.com';
        this.BUCKET_URL = 'rentx-7e1d1.appspot.com';
        (0, app_1.initializeApp)({
            credential: (0, app_1.cert)(firebaseKey_json_1.default),
            storageBucket: this.BUCKET_URL,
        });
        this.bucket = (0, storage_1.getStorage)().bucket();
    }
    async uploadImage(imageName, folder) {
        const originalName = (0, path_1.resolve)(upload_1.default.tmpFolder, imageName);
        const fileContent = await fs_1.default.promises.readFile(originalName);
        const file = this.bucket.file(`${folder}/${imageName}`);
        const stream = file.createWriteStream({
            metadata: {
                contentType: mime_types_1.default.lookup(originalName) || '',
            },
        });
        return new Promise((resolve, reject) => {
            stream.on('error', (error) => {
                console.error(error);
                reject(new AppError_1.AppError(error.message));
            });
            stream.on('finish', async () => {
                await file.makePublic();
                await fs_1.default.promises.unlink(originalName);
                const imageURL = `${this.STORAGE_URL}/${this.BUCKET_URL}/${folder}/${imageName}`;
                resolve(imageURL);
            });
            stream.end(fileContent);
        });
    }
    async deleteImage(file, folder) {
        await this.bucket.deleteFiles({
            prefix: `${folder}/${file}`,
        });
    }
}
exports.FirebaseProvider = FirebaseProvider;
