import express from "express";
import cors from 'cors';
import { errandsMiddlewares } from './middlewares';
import path from 'path';
import fs from 'fs';
import { HttpRouter } from './contracts';
import Database from './database/connections/Database';

export default class Application {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    };

    get server() {
        return this.#express
    };

    async init() {
        this.config();
        this.middlewares();
        this.routers();
        await this.database();
    };

    start(port: number) {
        this.#express.listen(port, () => {
            console.log(`A aplicação está rodando na porta ${port}...`);
        });
    };

    private config() {
        this.#express.use(express.json);
        this.#express.use(express.urlencoded({extended: false}));
        this.#express.use(cors());
    };

    private middlewares() {
        this.#express.use(errandsMiddlewares);
    };
    
    private routers() {
        const routersPath = path.resolve(__dirname, 'routers');

        fs.readdirSync(routersPath).forEach(filename => {
            import(path.resolve(routersPath, filename)).then(file => {
                const instance = new file.default() as HttpRouter;

                this.#express.use(instance.init());
            });
        });
    };

    private async database() {
        await Database.getInstance();
    };
};

