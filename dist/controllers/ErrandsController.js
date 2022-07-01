"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrandsService_1 = require("../service/ErrandsService");
class ErrandsController {
    async index(request, response) {
        const service = new ErrandsService_1.ErrandsService();
        const errands = await service.find();
        return response.json(errands.map(errand => {
            return {
                id: errand.id,
                description: errand.description,
                details: errand.details
            };
        })).status(200);
    }
    async show(request, response) {
        const { id } = request.params;
        const service = new ErrandsService_1.ErrandsService();
        const errands = await service.findOne(parseInt(id));
        return response.json({
            id: errands?.id,
            description: errands?.description?.toUpperCase(),
            details: errands?.details?.toUpperCase()
        }).status(200);
    }
    async store(request, response) {
        const { description, details } = request.body;
        const service = new ErrandsService_1.ErrandsService();
        const errands = service.create({
            description: description,
            details: details
        });
    }
    async update(request, response) {
        const { id } = request.params;
        const { description, details } = request.body;
        const service = new ErrandsService_1.ErrandsService();
        const errands = service.update({
            id: parseInt(id),
            description: description,
            details: details
        });
        return response.json(errands);
    }
    async delete(request, response) {
        const { id } = request.params;
        const service = new ErrandsService_1.ErrandsService();
        service.delete(parseInt(id));
        return response.status(204);
    }
}
exports.default = ErrandsController;
