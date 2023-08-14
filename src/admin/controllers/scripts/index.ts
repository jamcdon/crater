import { Request, Response } from 'express'
import { ICompose } from '../../../db/nosql/models/Compose'
import { getUserToken } from '../../../frontend/controllers/common'
import { adminInterpolationObject } from '../common'
import { getScriptReportsPaginated } from '../../../db/sql/dal/Reports'
import { ScriptReportsOutput } from '../../../db/sql/models/ScriptReports'

type adminScriptsInterpolation = adminInterpolationObject & {
    lastWeekScripts?: Array<ICompose>,
    unmatchedScripts?: Array<ICompose>
    scriptReports?: Array<ScriptReportsOutput>
}

let adminScriptsInterpolation : adminScriptsInterpolation = {
    page: "Scripts",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Scripts {
    public static async index (req: Request, res: Response): Promise<void> {
        [adminScriptsInterpolation.usernameToken, adminScriptsInterpolation.userIDToken, adminScriptsInterpolation.isAdmin] = await getUserToken(req)
        if (adminScriptsInterpolation.isAdmin) {
            adminScriptsInterpolation.scriptReports = await getScriptReportsPaginated(0)

            return res.render('admin/scripts/index.pug', adminScriptsInterpolation)
        }
        return res.status(404).render('error/404.pug', adminScriptsInterpolation)
    }
}

export default Scripts