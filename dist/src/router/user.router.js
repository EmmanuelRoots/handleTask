"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
exports.userRouter = (0, express_1.Router)();
// userRouter.use(TokenMiddleware)
exports.userRouter.post('/user', user_controller_1.register);
// userRouter.get(
//   '/get',
//     TokenMiddleware,
//    get
// )
exports.default = exports.userRouter;
