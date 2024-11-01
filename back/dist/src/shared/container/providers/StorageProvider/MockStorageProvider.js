"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockStorageProvider = void 0;
class MockStorageProvider {
    constructor() {
        this.images = [];
    }
    async uploadImage(image, folder) {
        this.images.push(image);
        const imageURL = `/${folder}/${image}`;
        return imageURL;
    }
    async deleteImage(imageName, folder) {
        this.images.filter((image) => image !== imageName);
    }
}
exports.MockStorageProvider = MockStorageProvider;
