"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSpecificationsController = void 0;
const ListSpecificationsUseCase_1 = require("./ListSpecificationsUseCase");
const tsyringe_1 = require("tsyringe");
class ListSpecificationsController {
    async handle(req, res) {
        const listSpecificationsUseCase = tsyringe_1.container.resolve(ListSpecificationsUseCase_1.ListSpecificationsUseCase);
        const specifications = await listSpecificationsUseCase.execute();
        return res.status(200).json({
            success: true,
            title: 'Busca de espeficicações concluída com sucesso',
            items: specifications,
        });
    }
}
exports.ListSpecificationsController = ListSpecificationsController;
