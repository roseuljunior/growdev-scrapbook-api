//middleware intercepta a requisição antes de entrar na rota; e faz os tratamentos necessários para entrar. 
//Se a requisição for inválida baseada no token ou em qualquer outro parâmetro (o mais comum é validação com isempty (flutter) ou req !== null (Typescript / Javascript);

import { Request, Response, NextFunction } from 'express';
import { HttpBadRequestCode } from '../constants/http';
import { invalidField } from '../constants/messages';
import { HttpError } from '../errors/httpErrors';

export const errandsMiddlewares = (request: Request, response: Response, next: NextFunction) => {
    const { description, details } = request.body;

    if (!description || !details || description.length < 3 || description.length > 255 || details.length < 3 || details.length > 255) {
        throw new HttpError(invalidField('Nome'), HttpBadRequestCode);
    }
    
    next();
};