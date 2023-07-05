import { Types } from "mongoose";
import { Request } from "express";

interface Payload {
    id: Types.ObjectId;
}

interface IUserModel {
    id: string;
    userName: string;
    email: string;
    password?: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
}

interface AuthRequest extends Request {
    user?: IUserModel;
}

interface AuthRequestToken extends Request {
    user?: any;
}

export { Payload, IUserModel, AuthRequest, AuthRequestToken };
