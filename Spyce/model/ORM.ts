import Schema from "../@types/dbSchema";
import { ModelOptions } from "../@types/model";
import ORMType from '../@types/ORM';

interface ORM {
    add: (ele: object, callback?: ()=>void)=>Promise<void>;
    get: (id: string)=>Promise<object>;
    getAll: ()=>Promise<object[]>;
    findOne: (ele:object)=>Promise<object>;
    find: (ele:object)=>Promise<object[]>;
    update: (id: string, ele: object)=>Promise<void>;
    deleteById: (id: string)=>Promise<void>;
    delete: (ele: object)=>Promise<void>;
    addAll: (ele: object[], callback?:()=>void|(()=>Promise<void>))=>Promise<void>;
}

interface ModelBody {
    options: ModelOptions;
    models: ORMType[];
    createModel: ()=>Promise<any>;
    Model: (name: string, schema: Schema)=>ORMType;
}

export {
    ORM,
    ModelBody
};