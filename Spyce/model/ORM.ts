interface ORM {
    add: (ele: object, callback?: ()=>void)=>Promise<void>;
    get: (id: string)=>Promise<object>;
    getAll: ()=>Promise<object[]>;
    findOne: (ele:object)=>Promise<object>;
    find: (ele:object)=>Promise<object[]>;
    update: (id: string, ele: object)=>Promise<void>;
    deleteById: (id: string)=>Promise<void>;
    delete: (ele: object)=>Promise<void>;
    addAll: (ele: object[], callback?:()=>void)=>Promise<void>;
}

interface ModelBody {
    createModel: ()=>Promise<any>;
}

export {
    ORM,
    ModelBody
};