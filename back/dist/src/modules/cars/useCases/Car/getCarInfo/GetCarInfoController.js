"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCarInfoController = void 0;
const tsyringe_1 = require("tsyringe");
const GetCarInfoUseCase_1 = require("./GetCarInfoUseCase");
class GetCarInfoController {
    async handle(req, res) {
        const { carId } = req.params;
        const getCarInfoUseCase = tsyringe_1.container.resolve(GetCarInfoUseCase_1.GetCarInfoUseCase);
        const car = await getCarInfoUseCase.execute(carId);
        return res.status(200).json({
            success: 'true',
            title: 'Busca de informações do carro concluída com sucesso',
            item: car,
        });
    }
}
exports.GetCarInfoController = GetCarInfoController;
