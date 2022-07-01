import { ErrandsService } from '../service/ErrandsService';
import { Request, Response } from 'express';

export default class ErrandsController {
    async index(request: Request, response: Response) {
        const service = new ErrandsService();
        const errands = await service.find();

        return response.json(errands.map(errand => {
            return {
                id: errand.id,
                description: errand.description,
                details: errand.details
            }
        })).status(200);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const service = new ErrandsService();
        const errands = await service.findOne(parseInt(id));

        return response.json({
            id: errands?.id,
            description: errands?.description?.toUpperCase(),
            details: errands?.details?.toUpperCase()
        }).status(200);
    }

    async store(request: Request, response: Response) {
        const { description, details } = request.body;

        const service = new ErrandsService();

        const errands = service.create({
            description: description,
            details: details
        });
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { description, details } = request.body;

        const service = new ErrandsService();

        const errands = service.update({
            id: parseInt(id),
            description: description,
            details: details
        });

        return response.json(errands);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const service = new ErrandsService();

        service.delete(parseInt(id));

        return response.status(204);
    }
}