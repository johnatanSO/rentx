"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNewUserController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateNewUserUseCase_1 = require("./CreateNewUserUseCase");
class CreateNewUserController {
    async handle(req, res) {
        const { name, email, password, confirmPassword, driverLicense, isAdmin } = req.body;
        const createNewUserUseCase = tsyringe_1.container.resolve(CreateNewUserUseCase_1.CreateNewUserUseCase);
        const newUser = await createNewUserUseCase.execute({
            name,
            email,
            password,
            driverLicense,
            confirmPassword,
            isAdmin,
        });
        return res.status(201).json({
            success: true,
            title: 'Usuário criado com sucesso.',
            item: newUser,
        });
    }
}
exports.CreateNewUserController = CreateNewUserController;
