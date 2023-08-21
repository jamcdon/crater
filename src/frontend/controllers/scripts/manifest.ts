import {Request, Response } from 'express'
import {getUserToken} from '../common'
import { scriptsInterpolationObject } from './index'
import { ComposeModification, ComposeOutput } from '../../../db/nosql/models/Compose'
import { getUsernameByID, getById } from '../../../api/controllers/compose';
import * as interactionsService from '../../../db/sql/services/interactionsService'
import * as composeService from '../../../db/nosql/services/composeService'
import * as composeMapper from '../../../api/controllers/compose/mapper'

type manifestInterpolationObject = scriptsInterpolationObject & {
    manifest?: ComposeOutput
    authorName?: string
    scripts?: Array<ComposeModification>
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
    }
    public static async edit (req: Request, res: Response): Promise<void> {
        [manifestInterpolation.usernameToken, manifestInterpolation.userIDToken, manifestInterpolation.isAdmin] = await getUserToken(req)
        // this one needs additional legwork to know what image is being modified
        return res.render('scripts/manifest/edit.pug', manifestInterpolation)
        //TODO DOES NOT GO ANYWHERE
    }
    public static async view (req: Request, res: Response): Promise<void> {
        [manifestInterpolation.usernameToken, manifestInterpolation.userIDToken, manifestInterpolation.isAdmin] = await getUserToken(req)
        manifestInterpolation.manifest = await getById(req.params.id)
        if (manifestInterpolation.manifest != undefined){
            manifestInterpolation.authorName = await getUsernameByID(manifestInterpolation.manifest.authorID)
            manifestInterpolation.manifest.yaml = manifestInterpolation.manifest.yaml
                .replace(/\$/g, "\\$")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
            if (manifestInterpolation.manifest.yamls != undefined){
                for(let [key, val] of Object.entries(manifestInterpolation.manifest.yamls)){
                    manifestInterpolation.manifest.yamls[key] = val
                        .replace(/\$/g, "\\$")
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")
                }
            }
            return res.render('scripts/manifest/view.pug', manifestInterpolation)
            }
    }
    public static async yourScripts (req: Request, res: Response): Promise<void> {
        [manifestInterpolation.usernameToken, manifestInterpolation.userIDToken, manifestInterpolation.isAdmin] = await getUserToken(req)

        let notUser: boolean = true
        if (manifestInterpolation.userIDToken != undefined){
            notUser = (manifestInterpolation.userIDToken == undefined)
            if (notUser != true){
                manifestInterpolation.scripts = await setUserManifestInteractions(manifestInterpolation.userIDToken, notUser)
                return res.render('scripts/compose/your-scripts.pug', manifestInterpolation)
            }
        }
        return res.status(404).render('error/404.pug', manifestInterpolation)
    }
}

const setUserManifestInteractions = async(userID: number, findPublic: boolean): Promise<Array<ComposeModification> | undefined> => {
    const manifestIDs = await interactionsService.getManifestsFromUser(userID)
    if (manifestIDs != undefined){
        const manifests = await composeService.getByIds(manifestIDs, findPublic, 1)
        if (manifests != undefined){
            return await composeMapper.toComposeModifications(manifests)
        }
    }
    return undefined
}

export default Manifest