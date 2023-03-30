import {Request, Response } from 'express'
import {getUserToken} from '../common'
import { scriptsInterpolationObject } from './index'
import { ComposeOutput } from '../../../db/nosql/models/Compose'

type manifestInterpolationObject = scriptsInterpolationObject & {
    manifest?: ComposeOutput
};

let manifestInterpolation: manifestInterpolationObject = {
    page: "Scripts",
    minioPublic: process.env.MINIO_PUBLIC as string,
}
class Manifest {
    public static async index (req: Request, res: Response): Promise<void> {
        [manifestInterpolation.usernameToken, manifestInterpolation.userIDToken, manifestInterpolation.isAdmin] = await getUserToken(req)
        return res.render('scripts/manifest/index.pug', manifestInterpolation)
    }
    public static async new (req: Request, res: Response): Promise<void> {
        [manifestInterpolation.usernameToken, manifestInterpolation.userIDToken, manifestInterpolation.isAdmin] = await getUserToken(req)
        return res.render('scripts/manifest/new.pug', manifestInterpolation)
        //TODO DOES NOT GO ANYWHERE
    }
    public static async edit (req: Request, res: Response): Promise<void> {
        [manifestInterpolation.usernameToken, manifestInterpolation.userIDToken, manifestInterpolation.isAdmin] = await getUserToken(req)
        // this one needs additional legwork to know what image is being modified
        return res.render('scripts/manifest/edit.pug', manifestInterpolation)
        //TODO DOES NOT GO ANYWHERE
    }
}

export default Manifest