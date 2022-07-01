import { Router } from "express";
import ErrandsController from "../controllers/ErrandsController";
import { errandsMiddlewares } from '../middlewares/global';

export default class ErrandsRoutes {
    init() {
        const routes = Router();
        const controller = new ErrandsController();

        routes.get('errands', controller.index);
        routes.get('errands/:id', controller.show);
        routes.post('errands', [errandsMiddlewares], controller.store);
        routes.put('errands/:id', controller.update);
        routes.delete('errands/:id', controller.delete);

        return routes;
    }
}