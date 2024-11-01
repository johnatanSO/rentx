"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesController = void 0;
const tsyringe_1 = require("tsyringe");
const ListCategoriesUseCase_1 = require("./ListCategoriesUseCase");
class ListCategoriesController {
    async handle(req, res) {
        const listCategoriesUseCase = tsyringe_1.container.resolve(ListCategoriesUseCase_1.ListCategoriesUseCase);
        const categories = await listCategoriesUseCase.execute();
        return res.status(200).json({
            success: true,
            title: 'Busca de categorias concluída com sucesso',
            items: categories,
        });
    }
}
exports.ListCategoriesController = ListCategoriesController;
