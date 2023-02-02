import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'

type aboutInterpolationObject = interpolationObject

let aboutInterpolation: aboutInterpolationObject = {
    page: "About",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class About {
    public static async index (req: Request, res: Response): Promise<void> {
        [aboutInterpolation.usernameToken, aboutInterpolation.userIDToken] = await getUserToken(req)
        return res.render('about/index.pug', aboutInterpolation)
    }
    public static async team (req: Request, res: Response): Promise<void> {
        [aboutInterpolation.usernameToken, aboutInterpolation.userIDToken] = await getUserToken(req)
        return res.render('about/team.pug', aboutInterpolation)
    }
}

export default About