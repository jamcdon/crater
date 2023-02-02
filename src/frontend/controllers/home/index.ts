import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'

type homeInterpolationObject = interpolationObject

let homeInterpolation: homeInterpolationObject = {
    page: "Home",
    host: process.env.MINIO_HOST as string,
    port: process.env.MINIO_PORT as string
}

class Home {
    public static async index (req: Request, res: Response): Promise<void> {
        [homeInterpolation.usernameToken, homeInterpolation.userIDToken] = await getUserToken(req);
        return res.render('home/index.pug', homeInterpolation)
    }
}

export default Home