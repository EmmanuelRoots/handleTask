import { Request, Response } from 'express';
import {Message}  from '../model/message,model';

export const MessageController = {
    createMessage: async (req: Request, res: Response) => {
        const { content, sender, recipient } = req.body;
        try {
          const newMessage = new Message({ content, sender, recipient });
          await newMessage.save();
          res.json(newMessage);
        } catch (error) {
          console.error('Erreur lors de la création du message :', error);
          res.status(500).json({ message: 'Erreur lors de la création du message' });
        }
    },
}

