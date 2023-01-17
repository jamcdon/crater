import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'
import Manifest from './manifest'
import Compose from './compose'

type scriptsInterpolationObject = interpolationObject

let scriptsInterpolation: scriptsInterpolationObject = {
    page: "Scripts"
}

class Scripts {
    public static async index (req: Request, res: Response): Promise<void> {
        [scriptsInterpolation.usernameToken, scriptsInterpolation.userIDToken] = await getUserToken(req);
        return res.render('scripts/index.pug', scriptsInterpolation)
    }
}

export { Compose, Manifest, scriptsInterpolation }

export default Scripts