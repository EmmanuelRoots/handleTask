"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Message = mongoose_1.default.model('Message', new mongoose_1.default.Schema({
    content: { type: String, required: true },
    sender: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
}));
