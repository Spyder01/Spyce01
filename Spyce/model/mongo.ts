import { ORM } from "./ORM";
import { connect } from "mongoose";
import { model as MongoModel, Schema as MongoSchema, SchemaDefinition } from "mongoose";
import Schema from "../@types/dbSchema";
import { ModelOptions, ModelType } from "../@types/model";

class Mongo {
    private options: ModelOptions;
    private models: MongoORM[];

    constructor(options: any) {

        if (!options.uri) {
            throw new Error("Mongo URI is required");
        }

        this.options = options;
        this.models = [];

        this.connect();
    }

    private async connect(callback: () => void = () => { console.log("Mongo connected") }): Promise<void> {
        try {
            await connect(this.options.uri || "");
            callback();
        } catch (error) {
            throw error;
        }
    }

    Model(schema: Schema, name: string = `model${this.models.length + 1}`): MongoORM {
        const model = new MongoORM(schema, name);
        this.models.push(model);
        return model;
    }
}


class MongoORM implements ORM {
    private schema: SchemaDefinition;
    private model: any;
    private name: string;

    constructor(schema: Schema, name: string) {
        this.schema = this.parser(schema);
        this.name = name;
        this.model = this.getModel();
    }

    private getModel() {
        return MongoModel(this.name, new MongoSchema(this.schema));
    }

    async add(ele: object, callback?: () => void): Promise<void> {
        const doc = new this.model(ele);
        await doc.save();
        if (callback) {
            callback();
        }
    }

    async get(id: string): Promise<object> {
        return this.model.findById(id);
    }

    async getAll(): Promise<object[]> {
        return this.model.find({});
    }

    async findOne(ele: object): Promise<object> {
        return this.model.findOne(ele);

    }

    async find(ele: object): Promise<object[]> {
        return this.model.find(ele);
    }

    async update(id: string, ele: object): Promise<void> {
        return this.model.findByIdAndUpdate(id, ele);
    }

    async deleteById(id: string): Promise<void> {
        return this.model.findByIdAndDelete(id);
    }

    async delete(ele: object): Promise<void> {
        return this.model.deleteOne(ele);
    }

    async addAll(ele: object[], callback?: () => void | (() => Promise<void>)): Promise<void> {
        for (let i = 0; i < ele.length; i++) {
            await this.add(ele[i]);
        }
        if (callback) {
            callback();
        }
    }

    private parser(schema: Schema): SchemaDefinition {
        const parsed: any = {};
        for (const key in schema) {
            if (schema.hasOwnProperty(key)) {
                const element = schema[key];
                switch (element.type) {
                    case "string":
                        parsed[key] = {
                            type: String,
                            required: element.required ? true : false,
                            default: element.default ? element.default : null,
                        };
                        break;
                    case "number":
                        parsed[key] = {
                            ...element,
                            type: Number
                        };
                        break;
                    case "boolean":
                        parsed[key] = {
                            required: element.required ? true : false,
                            default: element.default ? element.default : null,
                            type: Boolean
                        };

                        break;
                    default:
                        if (typeof element.type !== "string") {
                            parsed[key] = {
                                required: element.required ? true : false,
                                default: element.default ? element.default : null,
                                type: this.parser(element.type)
                            };
                        }
                }
            }
        }
        return parsed;
    }
}



export default Mongo;

export { MongoORM };