"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrandsService = void 0;
const express_1 = require("express");
const ErrandsRepository_1 = require("../database/repositories/ErrandsRepository");
class ErrandsService {
    async find() {
        const repository = new ErrandsRepository_1.ErrandsRepository();
        const errands = await repository.find();
        return errands;
    }
    async findOne(id) {
        const repository = new ErrandsRepository_1.ErrandsRepository();
        const errands = await repository.findOne(id);
        return errands;
    }
    async create(errandsDTO) {
        const repository = new ErrandsRepository_1.ErrandsRepository();
        const errands = await repository.create(errandsDTO);
        return {
            id: errands.id,
            description: errands.description,
            details: errands.details
        };
    }
    async update(errandsDTO) {
        const repository = new ErrandsRepository_1.ErrandsRepository();
        const errands = await repository.update(errandsDTO);
        return {
            id: errands?.id,
            description: errands?.description,
            details: errands?.details
        };
    }
    async delete(id) {
        const repository = new ErrandsRepository_1.ErrandsRepository();
        const errands = await repository.delete(id);
        return express_1.response.json({
            msg: 'Success',
        });
    }
}
exports.ErrandsService = ErrandsService;
