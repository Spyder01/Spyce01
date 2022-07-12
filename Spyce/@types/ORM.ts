import {MongoORM} from '../model/mongo';
import {SQLORM} from '../model/SQL';



type ORM = MongoORM|SQLORM;


export default ORM;