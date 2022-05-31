//middleware intercepta a requisição antes de entrar na rota; e faz os tratamentos necessários para entrar. 
//Se a requisição for inválida baseada no token ou em qualquer outro parâmetro (o mais comum é validação com isempty (flutter) ou req !== null (Typescript / Javascript);

import { Request, Response, NextFunction } from 'express';

export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { ip, method } = req;
    console.log(ip, method);
    
    next();
};