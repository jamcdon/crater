import {Request, Response } from 'express'
import { ComposeOutput } from '../../../db/nosql/models/Compose';
import { getById } from '../../../api/controllers/compose';
import {getUserToken} from '../common'
import { scriptsInterpolationObject } from './index'

type composeInterpolationObject = scriptsInterpolationObject & {
    compose?: ComposeOutput
};

let composeInterpolation: composeInterpolationObject = {
    page: "Scripts",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Compose {
    public static async index (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken] = await getUserToken(req)
        return res.render('scripts/compose/index.pug', composeInterpolation)
    }
    public static async new (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken] = await getUserToken(req)
        return res.render('scripts/compose/new.pug', composeInterpolation)
    }
    public static async edit (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken] = await getUserToken(req)
        // this one needs additional legwork to know what image is being modified
        return res.render('scripts/compose/edit.pug', composeInterpolation)
    }
    public static async view (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken] = await getUserToken(req)
        composeInterpolation.compose = await getById(req.params.id)
        if (composeInterpolation.compose != undefined){
            return res.render('scripts/compose/view.pug', composeInterpolation)
        }
        return res.status(404).render('error/404.pug', composeInterpolation)
    }
}

export default Compose