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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./src/db/db"));
const ws_1 = __importDefault(require("ws"));
const user_router_1 = require("./src/router/user.router");
const message_router_1 = __importDefault(require("./src/router/message.router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/user', user_router_1.userRouter);
app.use('message', message_router_1.default);
const server = app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    console.log('lancé le appli');
}));
const wss = new ws_1.default.Server({ server });
wss.on('connection', (ws) => {
    try {
        console.log('Nouvelle connexion WebSocket établie');
        ws.on('message', (message) => {
            console.log('Message reçu:', message.toString());
            // Vous pouvez traiter le message ici, puis le diffuser à tous les autres clients connectés
            wss.clients.forEach((client) => {
                console.log(client.readyState);
                console.log(ws !== client);
                if (client !== ws && client.readyState === ws_1.default.OPEN) {
                    client.send(message.toString());
                }
            });
        });
    }
    catch (error) {
        console.log('Error serveur ', error);
    }
});
