interface Schema {
    [key: string]: SchemaItem;
}


interface SchemaItem {
    type: string|Schema;
    required?: boolean;
    default?: any;
    allowNull?: boolean;
    primaryKey?: boolean;
}


export default Schema;