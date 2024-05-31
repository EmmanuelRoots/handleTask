import { Router } from "express";
import { auth } from "../middleware/token.middleware";
import { register,login } from "../controller/user.controller";

export const userRouter = Router()
// userRouter.use(TokenMiddleware)

userRouter.post(
  '/register',
  register
)

userRouter.post(
  '/login',
   login
)


export default userRouter