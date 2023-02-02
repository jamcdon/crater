import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'

type homeInterpolationObject = interpolationObject

let homeInterpolation: homeInterpolationObject = {
    page: "Home",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Home {
    public static async index (req: Request, res: Response): Promise<void> {
        [homeInterpolation.usernameToken, homeInterpolation.userIDToken] = await getUserToken(req);
        return res.render('home/index.pug', homeInterpolation)
    }
}

export default Home