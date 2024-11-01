"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const DayjsDateProvider_1 = require("./DateProvider/DayjsDateProvider");
// import { S3StorageProvider } from './StorageProvider/S3StorageProvider'
const SESMailProvider_1 = require("./MailProvider/SESMailProvider");
const FirebaseProvider_1 = require("./StorageProvider/FirebaseProvider");
tsyringe_1.container.registerSingleton('DayjsDateProvider', DayjsDateProvider_1.DayjsDateProvider);
tsyringe_1.container.registerInstance('MailProvider', new SESMailProvider_1.SESMailProvider());
tsyringe_1.container.registerSingleton('StorageProvider', FirebaseProvider_1.FirebaseProvider);
