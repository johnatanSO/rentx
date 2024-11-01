"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
exports.myDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [
        path_1.default.join(__dirname, '/../../../modules/**/infra/typeorm/entities/*.ts'),
    ],
    logging: false,
    synchronize: false,
});
exports.myDataSource
    .initialize()
    .then(() => {
    console.log('Banco de dados POSTGRES conectado com sucesso');
})
    .catch((err) => {
    console.log('Erro ao tenrar conectar bando de dados POSTGRES');
    console.log(err);
});
exports.default = exports.myDataSource;
