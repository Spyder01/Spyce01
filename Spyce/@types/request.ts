import {NextFunction, Request as ExpressRequest, Response as ExpressResponse} from 'express';


type Request = (arg0: ExpressRequest, arg1: ExpressResponse, next?:NextFunction)=>Promise<void>|void;

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