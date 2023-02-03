import {Request, Response } from 'express'
import {getUserToken} from '../common'
import { scriptsInterpolation } from './index'

class Compose {
    public static async index (req: Request, res: Response): Promise<void> {
        [scriptsInterpolation.usernameToken, scriptsInterpolation.userIDToken] = await getUserToken(req)
        return res.render('scripts/compose/index.pug', scriptsInterpolation)
    }
    public static async new (req: Request, res: Response): Promise<void> {
        [scriptsInterpolation.usernameToken, scriptsInterpolation.userIDToken] = await getUserToken(req)
        return res.render('scripts/compose/new.pug', scriptsInterpolation)
    }
    public static async edit (req: Request, res: Response): Promise<void> {
        [scriptsInterpolation.usernameToken, scriptsInterpolation.userIDToken] = await getUserToken(req)
        // this one needs additional legwork to know what image is being modified
        return res.render('scripts/compose/edit.pug', scriptsInterpolation)
    }
}

export default Compose