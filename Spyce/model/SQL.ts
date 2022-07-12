import { ModelOptions } from "../@types/model";
import Schema from "../@types/dbSchema";

class SQL {
    constructor (options: ModelOptions) {
        if (options.dialect === "sqlite"||options.dialect === "sqlite3") {
            options.uri = "sqlite::memory:";
        } else {
            if (!options.uri) {
                throw new Error ("SQL databses requires a connection uri");
            }
        }


    }

    Model (Schema: Schema): any {
        
    }
}


export default SQL;