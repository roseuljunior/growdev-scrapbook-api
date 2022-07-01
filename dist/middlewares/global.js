"use strict";
//middleware intercepta a requisição antes de entrar na rota; e faz os tratamentos necessários para entrar. 
//Se a requisição for inválida baseada no token ou em qualquer outro parâmetro (o mais comum é validação com isempty (flutter) ou req !== null (Typescript / Javascript);
Object.defineProperty(exports, "__esModule", { value: true });
exports.errandsMiddlewares = void 0;
const http_1 = require("../constants/http");
const messages_1 = require("../constants/messages");
const httpErrors_1 = require("../errors/httpErrors");
const errandsMiddlewares = (request, response, next) => {
    const { description, details } = request.body;
    if (!description || !details || description.length < 3 || description.length > 255 || details.length < 3 || details.length > 255) {
        throw new httpErrors_1.HttpError((0, messages_1.invalidField)('Nome'), http_1.HttpBadRequestCode);
    }
    next();
};
exports.errandsMiddlewares = errandsMiddlewares;
