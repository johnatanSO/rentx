"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllUsersController = void 0;
const tsyringe_1 = require("tsyringe");
const ListAllUsersUseCase_1 = require("./ListAllUsersUseCase");
class ListAllUsersController {
    async handle(req, res) {
        const listAllUsersUseCase = tsyringe_1.container.resolve(ListAllUsersUseCase_1.ListAllUsersUseCase);
        const users = await listAllUsersUseCase.execute();
        return res.status(200).json({
            success: true,
            message: 'Busca de usuários feita com sucesso',
            items: users,
        });
    }
}
exports.ListAllUsersController = ListAllUsersController;
