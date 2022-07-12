interface Schema {
    [key: string]: SchemaItem;
}


interface SchemaItem {
    type: string|Schema;
    required?: boolean;
    default?: any;
}


export default Schema;