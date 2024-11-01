"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockMailProvider = void 0;
class MockMailProvider {
    constructor() {
        this.message = [];
    }
    async sendMail(to, subject, variables, path) {
        this.message.push({
            to,
            subject,
            variables,
            path,
        });
    }
}
exports.MockMailProvider = MockMailProvider;
