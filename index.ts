import Express from 'express'
import dbConnect from './src/db/db'
import WebSocket from 'ws';
import { userRouter as usRtr } from './src/router/user.router'
import MessageRouter from './src/router/message.router';
import cors from 'cors';



const app = Express()
app.use(cors())
app.use(Express.json())
app.use('/user',usRtr)
app.use('message',MessageRouter)

const server = app.listen(process.env.PORT, async () => {
    await dbConnect();
    console.log('lancé le appli')
})

const wss = new WebSocket.Server({server });

wss.on('connection', (ws) => {
    try {
        console.log('Nouvelle connexion WebSocket établie');
        ws.on('message', (message) => {
          console.log('Message reçu:', message.toString());
          // Vous pouvez traiter le message ici, puis le diffuser à tous les autres clients connectés
          wss.clients.forEach((client) => {
            console.log(client.readyState);
            console.log(ws !== client)
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message.toString());
            }
          });
        });   
    } catch (error : any) {
        console.log('Error serveur ',error);
        
    }
  });
