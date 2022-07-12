import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import CreateAPI from './createAPI';
import type { ModelOptions } from './@types/model';
import Model from './model';
import {ModelType} from './@types/model';


class Spyce {
    private app: Express;
    private port: number;
    private models: {
        [key: string]: ModelType
    };
    private apis: {
        [key: string]: CreateAPI
    }

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.models = {} as any;
        this.apis = {} as any;
    }

    getPort(): number {
        return this.port;
    }

    listen(callback: () => void = () => { }) {
        this.app.listen(this.port, callback);
    }

    use(middleware: any, ...args: any[]) {
        this.app.use(middleware, ...args);
    }

    createAPI(path: string, name?:string): CreateAPI {
        if (!name) {
            name = path;
        }
        const api = new CreateAPI(path, this.app);
        this.apis = {
            ...this.apis,
            [name]: api
        }
        return api;
    }

    cors(options: any = null) {
        this.app.use(cors(options));
    }

    model(options: ModelOptions, name: string = `model${this.model.length}+1`):ModelType {
        const model = Model(options);
        this.models = {
            ...this.models,
            [name]: model
        };
        return model;
    }
}

export default Spyce;


