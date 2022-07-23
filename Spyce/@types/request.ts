import {NextFunction, Request as ExpressRequest, Response as ExpressResponse, RequestHandler as ExpressRequestHandler, Application} from 'express';


type Request = ((arg0: ExpressRequest|ExpressRequestHandler, arg1: ExpressResponse, next?:NextFunction)=>Promise<void>|void) | any;

interface APIRequest {
    GET?: Request;
    POST?: Request;
    PUT?: Request;
    DELETE?: Request;
    PATCH?: Request;
    ALL?: Request;
}


export {
    Request,
    APIRequest
}