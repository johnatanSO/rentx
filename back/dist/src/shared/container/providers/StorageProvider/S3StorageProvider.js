"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageProvider = void 0;
const aws_sdk_1 = require("aws-sdk");
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
const upload_1 = __importDefault(require("../../../../config/upload"));
const AppError_1 = require("../../../errors/AppError");
class S3StorageProvider {
    constructor() {
        this.client = new aws_sdk_1.S3({
            region: process.env.AWS_BUCKET_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    async uploadImage(file, folder) {
        const originalName = (0, path_1.resolve)(upload_1.default.tmpFolder, file);
        const fileContent = await fs_1.default.promises.readFile(originalName);
        const ContentType = mime_types_1.default.lookup(originalName) || '';
        try {
            await this.client
                .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
            })
                .promise();
        }
        catch (err) {
            console.log('ERROR AO FAZER UPLOAD DE IMAGEM', err);
            throw new AppError_1.AppError(err.message);
        }
        await fs_1.default.promises.unlink(originalName);
        const imageURL = `${process.env.AWS_BUCKET_URL}/${folder}/${file}`;
        return imageURL;
    }
    async deleteImage(file, folder) {
        await this.client
            .deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        })
            .promise();
    }
}
exports.S3StorageProvider = S3StorageProvider;
