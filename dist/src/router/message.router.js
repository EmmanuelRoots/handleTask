"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controller/message.controller");
const MessageRouter = (0, express_1.default)();
MessageRouter.post('/create', message_controller_1.MessageController.createMessage);
exports.default = MessageRouter;
