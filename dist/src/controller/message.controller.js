"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const message_model_1 = require("../model/message,model");
exports.MessageController = {
    createMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { content, sender, recipient } = req.body;
        try {
            const newMessage = new message_model_1.Message({ content, sender, recipient });
            yield newMessage.save();
            res.json(newMessage);
        }
        catch (error) {
            console.error('Erreur lors de la création du message :', error);
            res.status(500).json({ message: 'Erreur lors de la création du message' });
        }
    }),
};
