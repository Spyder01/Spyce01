import type {Express, Router} from 'express';
import CreateAPI from '../createAPI';
import { ModelOptions, ModelType } from './model';


interface SpyceInstance {
    // // app: Express | Router;
    // models: {
    //     [key: string]: ModelType
    // }
    // apis: {
    //     [key: string]: CreateAPI
    // }

    use(middleware: any, ...args: any[]): void;

    createAPI(path: string, name?: string): CreateAPI;

    model(options: ModelOptions, name:string): ModelType;

    modelRegister(name: string, model: ModelType): {
        name: string,
        registered: boolean,
        model: ModelType
    }
    modelDeregister(name: string): {
        model: ModelType
        name: string
        deregistered: boolean
    };

}

export default SpyceInstance;