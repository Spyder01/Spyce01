import type { Express, Application} from "express";
import { APIRequest } from "./@types/request";
import { Router } from "express";




class CreateAPI {
    private path: string;
    private app: Express|Application|Router;
    constructor(path:string, app: Express|Application|Router) {
        this.path = path;
        this.app = app;
    }

    public request(path:string="", RequestCalls: APIRequest) {
        path = this.path + path;
        for (let method in RequestCalls) {
            if (method === 'ALL') {
                this.app.all(path, RequestCalls[method] || (() => { }));
            }

            else if (method === 'GET') {
                this.app.get(path, RequestCalls[method] || (() => { }));
            }

            else if (method === 'POST') {
                this.app.post(path, RequestCalls[method] || (() => { }));
            }

            else if (method === 'PUT') {
                this.app.put(path, RequestCalls[method] || (() => { }));
            }

            else if (method === 'DELETE') {
                this.app.delete(path, RequestCalls[method] || (() => { }));
            }

            else if (method === 'PATCH') {
                this.app.patch(path, RequestCalls[method] || (() => { }));
            }

        }
    }

}

export default CreateAPI;