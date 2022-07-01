"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrandsRepository = void 0;
const ErrandsEntity_1 = require("../entities/ErrandsEntity");
class ErrandsRepository {
    async find() {
        const errands = await ErrandsEntity_1.Errands.find();
        return errands;
    }
    async findOne(id) {
        const errands = await ErrandsEntity_1.Errands.findOne(id);
        return errands;
    }
    async create(errandsDTO) {
        const errands = await (0, ErrandsEntity_1.Errands)(errandsDTO.description, errandsDTO.details);
        const created = await errands.save();
        return created;
    }
    async update(errandsDTO) {
        const errands = await ErrandsEntity_1.Errands.findOne(errandsDTO.id);
        if (errands) {
            errands.description = errandsDTO.description;
            errands.details = errandsDTO.details;
            await errands.save();
        }
        return errands;
    }
    async delete(id) {
        await ErrandsEntity_1.Errands.delete(id);
    }
}
exports.ErrandsRepository = ErrandsRepository;
