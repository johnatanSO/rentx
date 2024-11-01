"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSpecificationController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateSpecificationUseCase_1 = require("./CreateSpecificationUseCase");
class CreateSpecificationController {
    async handle(req, res) {
        const { name, description } = req.body;
        const createSpecificationUseCase = tsyringe_1.container.resolve(CreateSpecificationUseCase_1.CreateSpecificationUseCase);
        const newSpecification = await createSpecificationUseCase.execute({
            name,
            description,
        });
        return res.status(201).json({
            success: true,
            title: 'Especificação cadastrada com sucesso',
            item: newSpecification,
        });
    }
}
exports.CreateSpecificationController = CreateSpecificationController;
