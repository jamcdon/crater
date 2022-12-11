import {Request, Response } from 'express'
import {getUserToken} from '../common'

let aboutInterpolation: {
    page: string,
    userToken?: string
} = {
    page: "About"
}

class About {
    public static async index (req: Request, res: Response): Promise<void> {
        aboutInterpolation.userToken = await getUserToken(req)
        return res.render('about/index.pug', aboutInterpolation)
    }
    public static async team (req: Request, res: Response): Promise<void> {
        aboutInterpolation.userToken = await getUserToken(req)
        return res.render('about/team.pug', aboutInterpolation)
    }
}

export default About