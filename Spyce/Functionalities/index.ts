import type { Express } from "express"




class Functionalities {
    private app: Express;
    private funcList:Function[] = [];
    private static functionalities: Functionalities;

    private constructor(app: Express) {
        this.app = app;
     }

     static init(app: Express) {
        this.functionalities = new Functionalities(app);
     }

     static getInstance () {
        return this.functionalities;
     }
     add (func: Function|Function[]) {
        if (Array.isArray(func)) {
            this.funcList.push(...func);
            func.forEach (f => f (this.app));    
        } else {
        this.funcList.push(func);
        func (this.app);
        }
     }

}

export default Functionalities;