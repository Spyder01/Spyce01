import { Router } from "express";
import { ModelOptions, ModelType } from "./@types/model";
import type SpyceInstance from "./@types/SpyceInstance";
import CreateAPI from "./createAPI";
import Model from "./model";


class Instance implements SpyceInstance {
    private app: Router;

    private models: {
        [key: string]: ModelType
    };

    private apis: {
        [key: string]: CreateAPI
    }

    constructor() {
        this.app = Router();
        this.models = {} as any;
        this.apis = {} as any;
    }

    getApp(): Router {
        return this.app;
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

    model(options: ModelOptions, name: string): ModelType {
        const model = Model(options);
        this.models = {
            ...this.models,
            [name]: model
        }
        return model;
    }

    modelRegister(name: string, model: ModelType): { name: string; registered: boolean; model: ModelType; } {
        const registered = !!this.models[name];
        if (registered) {

            this.models = {
                ...this.models,
                [name]: model
            }
            return {
                name,
                registered,
                model
            }
        } else {
            throw new Error(`A model with the name ${name} already exists.`);
        }
    }

    modelDeregister(name: string): { model: ModelType; name: string; deregistered: boolean; } {
        const model = this.models[name];
        if (!model) {
            delete this.models[name];
            return {
                model,
                name,
                deregistered: true
            }
        } else {
            throw new Error(`A model with the name ${name} does not exist.`);
        }
    }
}

export default Instance;