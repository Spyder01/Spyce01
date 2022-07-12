import { Sequelize, DataTypes } from 'sequelize';
import { ModelOptions } from "../@types/model";
import Schema from "../@types/dbSchema";
import { ORM, ModelBody } from "./ORM";

class SQL {
    private options: ModelOptions;
    private models: SQLORM[];
    private sql: Sequelize;

    constructor(options: ModelOptions) {
        if (options.dialect === "sqlite" || options.dialect === "sqlite3") {
            options.uri = "sqlite::memory:";
        } else {
            if (!options.uri) {
                throw new Error("SQL databses requires a connection uri");
            }
        }

        this.options = options;
        this.models = [];
        this.sql = {} as any;
        this.connect().then(sql => this.sql = sql);
    }

    Model(Schema: Schema, name: string): SQLORM {
        const model = new SQLORM(this.sql, Schema, name);
        this.models.push(model);
        return model;

    }

    private async connect(): Promise<Sequelize> {
        const sql = new Sequelize(this.options.uri || '');

        try {
            await sql.authenticate();
            console.log("SQL connected");
            return sql;
        } catch (error) {
            throw error;
        }

    }
}


class SQLORM implements ORM {

    private schema: any;
    private name: string;
    private sql: Sequelize;
    private model: any;

    constructor(sql: Sequelize, schema: Schema, name: string) {
        this.sql = sql;
        this.schema = this.parser(schema);
        this.name = name;
        this.model = this.getModel();
    }


    private getModel(): any {
        return this.sql.define(this.name, this.schema);
    }

    async add(ele: object, callback?: (() => void) | (() => Promise<void>)): Promise<void> {
        this.model.create(ele);
        if (callback) {
            callback();
        }
    }

    async get(id: string): Promise<object> {
        try {
        const result = await this.model.findByPk (id);
        return result.dataValues;
        } catch (error) {
            throw new Error("SQLORM: Error getting element, invalid primary key");
        }

    }

    async getAll(): Promise<object[]> {
        const result = await this.model.findAll();
        return result.map((ele: { dataValues: any; }) => ele.dataValues);
    }

    async update(id: string, ele: object, callback?: (() => void) | (() => Promise<void>)): Promise<void> {
        try {
            const result = await this.model.findByPk(id);
            result.update(ele);
            if (callback) {
                callback();
            }
        } catch (error) {
            throw new Error("SQLORM: Error updating element, invalid primary key");
        }
    }

    async delete(ele: object, callback?: (() => void) | (() => Promise<void>)): Promise<void> {
        try {
            const result = await this.model.destroy({ where: ele });
            result.destroy();
            if (callback) {
                callback();
            }
        } catch (error) {
            throw new Error("SQLORM: Error deleting element, invalid primary key");
        }
    }

    async deleteAll(callback?: (() => void) | (() => Promise<void>)): Promise<void> {
        try {
            const result = await this.model.destroy({ where: {} });
            if (callback) {
                callback();
            }
        } catch (error) {
            throw new Error("SQLORM: Error deleting all elements");
        }
    }

    async deleteById (id: string):Promise<void> {
        try {
            const result = await this.model.findByPk(id);
            result.destroy();
        } catch (error) {
            throw new Error("SQLORM: Error deleting element, invalid primary key");
        }
    }

    async find (ele: object): Promise<object[]> {
        const result = await this.model.findAll({ where: ele });
        return result.map((ele: { dataValues: any; }) => ele.dataValues);
    } 

    async findOne (ele: object): Promise<object> {
        const result = await this.model.findOne({ where: ele });
        return result.dataValues;
    }

    async addAll(ele: object[], callback?: (() => void) | (() => Promise<void>)): Promise<void> {
        this.model.bulkCreate(ele);
        if (callback) {
            callback();
        }
    }

    private parser(schema: Schema) {
        const parsed: any = {};
        for (let key in schema) {
            const value = schema[key];

            if (value.type === "string") {
                parsed[key] = {
                    type: DataTypes.STRING,
                    allowNull: value.allowNull ? value.allowNull : true,
                    defaultValue: value.default ? value.default : null,
                    primaryKey: value.primaryKey ? value.primaryKey : false,
                };
            } else if (value.type === "number") {
                parsed[key] = {
                    type: DataTypes.INTEGER,
                    allowNull: value.allowNull ? value.allowNull : true,
                    defaultValue: value.default ? value.default : null,
                    primaryKey: value.primaryKey ? value.primaryKey : false,
                };
            } else if (value.type === "boolean") {
                parsed[key] = {
                    type: DataTypes.BOOLEAN,
                    allowNull: value.allowNull ? value.allowNull : true,
                    defaultValue: value.default ? value.default : null,
                    primaryKey: value.primaryKey ? value.primaryKey : false,
                }
            } else if (value.type === "date") {
                parsed[key] = {
                    type: DataTypes.DATE,
                    allowNull: value.allowNull ? value.allowNull : true,
                    defaultValue: value.default ? value.default : null,
                    primaryKey: value.primaryKey ? value.primaryKey : false,
                }
            } else if (value.type === "array") {
                parsed[key] = {
                    type: DataTypes.ARRAY,
                    allowNull: value.allowNull ? value.allowNull : true,
                    defaultValue: value.default ? value.default : null,
                    primaryKey: value.primaryKey ? value.primaryKey : false,
                }
            } else if (value.type === "object") {
                parsed[key] = {
                    type: DataTypes.JSON,
                    allowNull: value.allowNull ? value.allowNull : true,
                    defaultValue: value.default ? value.default : null,
                    primaryKey: value.primaryKey ? value.primaryKey : false,
                }
            } else {
                throw new Error("SQLORM: Unknown type");
            }
        }

    }
}


export default SQL;


export { SQLORM };