"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendContactController = void 0;
const tsyringe_1 = require("tsyringe");
const SendContactUseCase_1 = require("./SendContactUseCase");
class SendContactController {
    async handle(req, res) {
        const { name, email, message } = req.body;
        const sendContactUseCase = tsyringe_1.container.resolve(SendContactUseCase_1.SendContactUseCase);
        await sendContactUseCase.execute({
            name,
            email,
            message,
        });
        return res.status(200).json({
            success: true,
            message: 'Mensagem enviada com sucesso',
        });
    }
}
exports.SendContactController = SendContactController;
