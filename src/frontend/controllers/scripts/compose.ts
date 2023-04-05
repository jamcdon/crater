import {Request, Response } from 'express'
import { ComposeModification, ComposeOutput } from '../../../db/nosql/models/Compose';
import { getById, getUsernameByID } from '../../../api/controllers/compose';
import {getUserToken} from '../common'
import { scriptsInterpolationObject } from './index'
import { setUserInteractions } from '../account';

type composeInterpolationObject = scriptsInterpolationObject & {
    compose?: ComposeOutput
    scripts?: Array<ComposeModification>,
    authorName?: string
};

let composeInterpolation: composeInterpolationObject = {
    page: "Scripts",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Compose {
    public static async index (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken, composeInterpolation.isAdmin] = await getUserToken(req)
        return res.render('scripts/compose/index.pug', composeInterpolation)
    }
    public static async new (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken, composeInterpolation.isAdmin] = await getUserToken(req)
        return res.render('scripts/compose/new.pug', composeInterpolation)
    }
    public static async edit (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken, composeInterpolation.isAdmin] = await getUserToken(req)
        // this one needs additional legwork to know what image is being modified
        return res.render('scripts/compose/edit.pug', composeInterpolation)
    }
    public static async view (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken, composeInterpolation.isAdmin] = await getUserToken(req)
        composeInterpolation.compose = await getById(req.params.id)
        if (composeInterpolation.compose != undefined){
            composeInterpolation.authorName = await getUsernameByID(Number(composeInterpolation.compose.authorID))
            composeInterpolation.compose.yaml = composeInterpolation.compose.yaml
                .replace(/\$/g, "\\$")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
            return res.render('scripts/compose/view.pug', composeInterpolation)
        }
        return res.status(404).render('error/404.pug', composeInterpolation)
    }
    public static async yourScripts (req: Request, res: Response): Promise<void> {
        [composeInterpolation.usernameToken, composeInterpolation.userIDToken, composeInterpolation.isAdmin] = await getUserToken(req)

        let notUser: boolean = true
        if (composeInterpolation.userIDToken != undefined){
            notUser = (composeInterpolation.userIDToken == undefined)
            if (notUser != true){
                composeInterpolation.scripts = await setUserInteractions(composeInterpolation.userIDToken, notUser)
                return res.render('scripts/compose/your-scripts.pug', composeInterpolation)
            }
        }
        return res.status(404).render('error/404.pug', composeInterpolation)
    }
}

export default Compose