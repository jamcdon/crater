import {Request, Response } from 'express'
import {getUserToken} from '../common'

let featuresInterpolation: {
    page: string,
    userToken?: string
}  = {
    page: "Features"
}

class Features {
    public static async index (req: Request, res: Response): Promise<void> {
        featuresInterpolation.userToken = await getUserToken(req)
        return res.render('features/index.pug', featuresInterpolation)
    }
    public static async glance(req: Request, res: Response): Promise<void> {
        featuresInterpolation.userToken = await getUserToken(req)
        return res.render('features/glance.pug', featuresInterpolation)
    }
    public static async submissions(req: Request, res: Response): Promise<void> {
        featuresInterpolation.userToken = await getUserToken(req)
        return res.render('features/submissions.pug', featuresInterpolation)
    }
}

export default Features