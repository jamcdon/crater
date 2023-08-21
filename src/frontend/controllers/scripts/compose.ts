import {Request, Response } from 'express'
import { ComposeModification, ComposeOutput } from '../../../db/nosql/models/Compose';
import { getById, getUsernameByID } from '../../../api/controllers/compose';
import {getUserToken} from '../common'
import { scriptsInterpolationObject } from './index'
import * as interactionsService from '../../../db/sql/services/interactionsService'
import * as service from '../../../db/nosql/services/composeService'
import * as mapper from '../../../api/controllers/compose/mapper'

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
                composeInterpolation.scripts = await setUserComposeInteractions(composeInterpolation.userIDToken, notUser)
                return res.render('scripts/compose/your-scripts.pug', composeInterpolation)
            }
        }
        return res.status(404).render('error/404.pug', composeInterpolation)
    }
}

const setUserComposeInteractions = async(userID: number, findPublic: boolean): Promise<Array<ComposeModification> | undefined> => {
    const composeIDs = await interactionsService.getComposesFromUser(userID)
    if (composeIDs != undefined){
        const composes = await service.getByIds(composeIDs, findPublic, 1)
        if (composes != undefined){
            return await mapper.toComposeModifications(composes)
        }
    }
}

export default Compose