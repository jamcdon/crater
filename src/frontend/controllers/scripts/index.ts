import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'

type scriptsInterpolationObject = interpolationObject

let scriptsInterpolation: scriptsInterpolationObject = {
    page: "Scripts"
}

class Scripts {
    public static async index (req: Request, res: Response): Promise<void> {
        [scriptsInterpolation.usernameToken, scriptsInterpolation.userIDToken] = await getUserToken(req);
        return res.render('trending/index.pug', scriptsInterpolation)
    }
}

export default Scripts