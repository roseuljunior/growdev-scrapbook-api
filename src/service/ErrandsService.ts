import { response } from 'express';
import { ErrandsRepository } from '../database/repositories/ErrandsRepository';
import { ErrandsDTO } from '../DTO/ErrandsDTO';

export class ErrandsService {
    async find() {
        const repository = new ErrandsRepository();
        const errands = await repository.find();
        
        return errands;
    }

    async findOne(id: number) {
        const repository = new ErrandsRepository();
        const errands = await repository.findOne(id);

        return errands;
    }

    async create(errandsDTO: ErrandsDTO) {
        const repository = new ErrandsRepository();
        const errands = await repository.create(errandsDTO);

        return {
            id: errands.id,
            description: errands.description,
            details: errands.details
        }
    }

    async update(errandsDTO: ErrandsDTO) {
        const repository = new ErrandsRepository();
        const errands = await repository.update(errandsDTO);

        return {
            id: errands?.id,
            description: errands?.description,
            details: errands?.details
        }
    }

    async delete(id: number) {
        const repository = new ErrandsRepository();
        const errands = await repository.delete(id);

        return response.json({
            msg: 'Success',
        });
    }
}