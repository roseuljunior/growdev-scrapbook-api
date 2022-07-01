import { ErrandsDTO } from '../../DTO/ErrandsDTO';
import { Errands } from '../entities/ErrandsEntity';

export class ErrandsRepository {
    async find() {
        const errands = await Errands.find();

        return errands;
    }

    async findOne(id: number) {
        const errands = await Errands.findOne(id);

        return errands;
    }

    async create(errandsDTO: ErrandsDTO) {
        const errands = await Errands(errandsDTO.description, errandsDTO.details);
        const created = await errands.save();

        return created;
    }

    async update(errandsDTO: ErrandsDTO) {
        const errands = await Errands.findOne(errandsDTO.id);

        if(errands) {
            errands.description = errandsDTO.description;
            errands.details = errandsDTO.details;
            await errands.save();
        }

        return errands;
    }

    async delete(id: number) {
        await Errands.delete(id);
    }
}