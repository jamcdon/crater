import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'

type composeInterpolationObject = interpolationObject

let composeInterpolation: composeInterpolationObject = {
    page: "Compose"
}

class Compose {
    public static async index (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken] = await getUserToken(req)
        return res.render('compose/index.pug', composeInterpolation)
    }
    public static async new (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken] = await getUserToken(req)
        return res.render('compose/new.pug', composeInterpolation)
    }
    public static async edit (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken] = await getUserToken(req)
        // this one needs additional legwork to know what image is being modified
        return res.render('compose/edit.pug', composeInterpolation)
    }
}

export default Compose