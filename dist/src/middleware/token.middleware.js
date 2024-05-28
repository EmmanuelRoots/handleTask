"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMiddleware = void 0;
const TokenMiddleware = (req, res, next) => {
    const { headers: { authorization } } = req;
    if (!authorization) {
        res.status(401).send('Token manquant');
    }
    else {
        if (authorization === 'Tiny') {
            next();
        }
        else {
            res.status(403).send('Vous ne pouvez pas entrer ici');
        }
    }
};
exports.TokenMiddleware = TokenMiddleware;
