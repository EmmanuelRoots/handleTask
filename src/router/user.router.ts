import { Router } from "express";
import { TokenMiddleware } from "../middleware/token.middleware";
import { register } from "../controller/user.controller";

export const userRouter = Router()
// userRouter.use(TokenMiddleware)

userRouter.post(
  '/user',
  register
)

// userRouter.get(
//   '/get',
//     TokenMiddleware,
//    get
// )


export default userRouter