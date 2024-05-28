import Express from 'express'
import dbConnect from './src/db/db'
import { userRouter as usRtr } from './src/router/user.router'
import cors from 'cors';

const app = Express()
app.use(cors())
app.use(Express.json())
app.use('/user',usRtr)


app.listen(8081, async () => {
    await dbConnect();
    console.log('lancé le appli')
})