"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendForgotPasswordMailController = void 0;
const tsyringe_1 = require("tsyringe");
const SendForgotPasswordMailUseCase_1 = require("./SendForgotPasswordMailUseCase");
class SendForgotPasswordMailController {
    async handle(req, res) {
        const { email } = req.body;
        const sendForgotPasswordMailUseCase = tsyringe_1.container.resolve(SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase);
        await sendForgotPasswordMailUseCase.execute(email);
        return res.status(200).json({ success: true });
    }
}
exports.SendForgotPasswordMailController = SendForgotPasswordMailController;
