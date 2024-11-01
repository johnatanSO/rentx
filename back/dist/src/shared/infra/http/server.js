"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.SERVER_PORT;
app_1.app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});
