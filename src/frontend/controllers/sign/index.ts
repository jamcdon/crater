import {Request, Response} from 'express'
import {getUserToken, interpolationObject} from '../common'

type signInterpolationObject = interpolationObject

let signInterpolation: signInterpolationObject = {
    page: "Sign",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Sign {
    public static async index(req: Request, res: Response): Promise<void> {
        [signInterpolation.usernameToken, signInterpolation.userIDToken] = await getUserToken(req);
        return res.render('sign/index.pug', signInterpolation)
    }
    public static async in(req: Request, res: Response): Promise<void> {
        [signInterpolation.usernameToken, signInterpolation.userIDToken] = await getUserToken(req);
        return res.render('sign/in/index.pug', signInterpolation)
    }
    public static async in_forgot(req: Request, res: Response): Promise<void> {
        [signInterpolation.usernameToken, signInterpolation.userIDToken] = await getUserToken(req);
        return res.render('sign/in/forgot.pug')
    }
    public static async up(req: Request, res: Response): Promise<void> {
        [signInterpolation.usernameToken, signInterpolation.userIDToken] = await getUserToken(req);
        return res.render('sign/up/index.pug', signInterpolation)
    }
    public static async up_github(req: Request, res: Response): Promise<void> {
        [signInterpolation.usernameToken, signInterpolation.userIDToken] = await getUserToken(req);
        return res.render('/sign/up/github.pug', signInterpolation)
    }
    public static async out(req: Request, res: Response): Promise<void> {
        [signInterpolation.usernameToken, signInterpolation.userIDToken] = await getUserToken(req);
        return res.render('sign/out.pug', signInterpolation)
    }
}

export default Sign