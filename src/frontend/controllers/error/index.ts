import { Request, Response } from "express";
import {getUserToken, interpolationObject} from '../common'

type errorInterpolationObject = interpolationObject

let errorInterpolation: errorInterpolationObject = {
    page: "404",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Error {
    public static async index (req: Request, res: Response): Promise<void> {
        [errorInterpolation.usernameToken, errorInterpolation.userIDToken] = await getUserToken(req);
        res.status(404)
        res.render('error/404.pug', errorInterpolation)
    }
}

export default Error