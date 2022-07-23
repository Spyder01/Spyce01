import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import CreateAPI from './createAPI';
import type { ModelOptions } from './@types/model';
import type SpyceInstance from './@types/SpyceInstance';
import Model from './model';
import { ModelType } from './@types/model';
import Instance from './Instance';


class Spyce implements SpyceInstance {
    private app: Express;
    private port: number;
    private models: {
        [key: string]: ModelType
    };
    private apis: {
        [key: string]: CreateAPI
    }

    private Instances: {
        [key: string]: Instance
    };

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.models = {} as any;
        this.apis = {} as any;
        this.Instances = {} as any;
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

    createAPI(path: string, name?: string): CreateAPI {
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

    model(options: ModelOptions, name: string = `model${this.model.length}+1`): ModelType {
        const model = Model(options);
        this.models = {
            ...this.models,
            [name]: model
        };
        return model;
    }

    modelRegister(name: string, model: ModelType): {
        name: string,
        registered: boolean,
        model: ModelType
    } {
        if (this.models[name]) {
            throw new Error(`Model ${name} already exists`);
        }

        this.models = {
            ...this.models,
            [name]: model
        };

        return {
            name,
            registered: true,
            model
        }
    }

    modelDeregister(name: string): {
        name: string,
        deregistered: boolean,
        model: ModelType
    } {
        const model = this.models[name];
        if (!model) {
            delete this.models[name];
            return {
                name,
                deregistered: true,
                model
            }
        } else {
            throw new Error(`Model ${name} does not exist`);
        }
    }

    addInstance (route:string, instance: Instance) {
        this.app.use (route, instance.getApp());
        this.Instances[route] = instance;
    }

    getInstance (route:string) {
        if (route in this.Instances) {
            return this.Instances[route];
        } else {
            throw new Error(`Instance ${route} does not exist`);
        }
    }

}

export default Spyce;


