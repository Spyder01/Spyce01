import Mongo from "../model/mongo";
import SQL from "../model/SQL";

interface ModelOptions {
    dialect: "sqlite" | "mysql" | "postgres" | "mssql" | "mariadb" | "oracle" | "sqlite3" | "mongo";
    uri?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    storage?: string;
}

type ModelType = Mongo|SQL;
export {ModelOptions, ModelType};