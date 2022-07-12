import {ModelOptions} from '../@types/model';
import Mongo from './mongo';
import SQL from './SQL';


class Model {
    private options: ModelOptions;

    constructor (options: ModelOptions = {
        dialect: 'sqlite',
    }) {
        this.options = options;
    }


    decider ():Mongo|SQL {
        if (this.options.dialect === 'mongo') {
            return new Mongo (this.options);
        } else {
            return new SQL (this.options);
        }

    }


}

const getModel = (options:ModelOptions):SQL|Mongo=>{
    const model = new Model (options);
    return model.decider ();
}

export default getModel;