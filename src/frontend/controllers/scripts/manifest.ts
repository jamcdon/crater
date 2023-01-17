import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'
import { scriptsInterpolation } from './index'

class Manifest {
    public static async new (req: Request, res: Response): Promise<void> {
        [scriptsInterpolation.usernameToken, scriptsInterpolation.userIDToken] = await getUserToken(req)
        return res.render('scripts/manifest/new.pug', scriptsInterpolation)
        //TODO DOES NOT GO ANYWHERE
    }
    public static async edit (req: Request, res: Response): Promise<void> {
        [scriptsInterpolation.usernameToken, scriptsInterpolation.userIDToken] = await getUserToken(req)
        // this one needs additional legwork to know what image is being modified
        return res.render('scripts/manifest/edit.pug', scriptsInterpolation)
        //TODO DOES NOT GO ANYWHERE
    }
}

export default Manifest