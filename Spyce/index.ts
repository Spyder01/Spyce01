import spyce from "./spyce";
import Model from "./model";
import Instance from "./Instance";

const Spyce = (port:number)=>{
    return new spyce(port);
}


export default Spyce;


export {
    Model,
    Instance
}
