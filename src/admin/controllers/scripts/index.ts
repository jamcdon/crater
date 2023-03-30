import { Request, Response } from 'express'
import { ICompose } from '../../../db/nosql/models/Compose'
import { getUserToken } from '../../../frontend/controllers/common'
import { adminInterpolationObject } from '../common'

type adminScriptsInterpolation = adminInterpolationObject & {
    lastWeekScripts?: Array<ICompose>,
    unmatchedScripts?: Array<ICompose>
}

let adminScriptsInterpolation : adminScriptsInterpolation = {
    page: "Scripts",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Scripts {
    public static async index (req: Request, res: Response): Promise<void> {
        [adminScriptsInterpolation.usernameToken, adminScriptsInterpolation.userIDToken, adminScriptsInterpolation.isAdmin] = await getUserToken(req)
        // add functionality to test if user is admin
        if (adminScriptsInterpolation.isAdmin) {
            return res.render('admin/scripts/index.pug', adminScriptsInterpolation)
        }
        return res.status(404).render('error/404.pug', adminScriptsInterpolation)
    }
}

export default Scripts