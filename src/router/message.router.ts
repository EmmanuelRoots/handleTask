import Router from "express"
import { MessageController } from "../controller/message.controller"

const MessageRouter = Router()

MessageRouter.post('/create',MessageController.createMessage);

export default MessageRouter