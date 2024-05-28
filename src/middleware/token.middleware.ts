import { NextFunction, Request, Response } from "express";

export const TokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { headers: { authorization } } = req

  if (!authorization) {
    res.status(401).send('Token manquant')
  } else {
    if (authorization === 'Tiny') {
      next()
    } else {
      res.status(403).send('Vous ne pouvez pas entrer ici')
    }
  }
}