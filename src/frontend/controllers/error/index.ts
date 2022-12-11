import { Request, Response } from "express";
import {getUserToken} from '../common'

let errorInterpolation: {
    page: string,
    userToken?: string
} = {
    page: "404"
}

class Error {
    public static async index (req: Request, res: Response): Promise<void> {
        errorInterpolation.userToken = await getUserToken(req)
        res.status(404)
        res.render('error/404.pug', errorInterpolation)
    }
}

export default Error