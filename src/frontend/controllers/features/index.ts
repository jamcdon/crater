import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'

type featuresInterpolationObject = interpolationObject

let featuresInterpolation: featuresInterpolationObject  = {
    page: "Features",
    host: process.env.MINIO_HOST as string,
    port: process.env.MINIO_PORT as string
}

class Features {
    public static async index (req: Request, res: Response): Promise<void> {
        [featuresInterpolation.usernameToken, featuresInterpolation.userIDToken] = await getUserToken(req);
        return res.render('features/index.pug', featuresInterpolation)
    }
    public static async glance(req: Request, res: Response): Promise<void> {
        [featuresInterpolation.usernameToken, featuresInterpolation.userIDToken] = await getUserToken(req);
        return res.render('features/glance.pug', featuresInterpolation)
    }
    public static async submissions(req: Request, res: Response): Promise<void> {
        [featuresInterpolation.usernameToken, featuresInterpolation.userIDToken] = await getUserToken(req);
        return res.render('features/submissions.pug', featuresInterpolation)
    }
}

export default Features