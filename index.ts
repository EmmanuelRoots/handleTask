import Express from 'express'
import dbConnect from './src/db/db'
import { userRouter as usRtr } from './src/router/user.router'

const app = Express()
app.use(Express.json())
app.use('/register',usRtr)

app.listen(8081, async () => {
    await dbConnect();
    console.log('lancé le appli')
})