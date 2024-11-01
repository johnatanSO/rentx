"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const deleteFile = async (filename) => {
    try {
        // Verifica se o arquivo existe
        await fs_1.default.promises.stat(filename);
    }
    catch (err) {
        // Caso ele não exista, vai cair aqui no catch e retornar a função
        return;
    }
    // Caso exista, ele passa o try/catch e executa esta função
    await fs_1.default.promises.unlink(filename);
};
exports.deleteFile = deleteFile;
