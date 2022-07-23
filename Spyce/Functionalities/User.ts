import Schema from "../@types/dbSchema";
import { ModelType } from "../@types/model";
import ORM from "../@types/ORM";


interface UserType {
    username?: string;
    password: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    aditional?: object;
}

class User {
    private model: ORM;
    private db: ModelType;
    constructor (db: ModelType) {
        this.db = db;
        this.model = null as any;
    } 

    async add(user: UserType): Promise<void> {
        
    }

    private parser () {}
}