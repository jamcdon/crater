import { Request, Response } from 'express'
import { AdminOutput } from '../../../db/sql/models/Admin'
import { getUserToken } from '../../../frontend/controllers/common'
import { adminInterpolationObject } from '../common'

type adminLogsInterpolation = adminInterpolationObject & {
    logArray?: Array<AdminOutput>
}

let adminLogsInterpolation : adminLogsInterpolation = {
    page: "Logs",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Logs {
    public static async index (req: Request, res: Response): Promise<void> {
        [adminLogsInterpolation.usernameToken, adminLogsInterpolation.userIDToken, adminLogsInterpolation.isAdmin] = await getUserToken(req)
        if (adminLogsInterpolation.isAdmin) {
            return res.render('admin/logs/index.pug', adminLogsInterpolation)
        }
        return res.status(404).render('error/404.pug', adminLogsInterpolation)
    }
}

export default Logs