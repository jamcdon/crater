import { Request, Response } from 'express'
import { UserReportsOutput } from '../../../db/sql/models/UserReports'
import { getUserToken } from '../../../frontend/controllers/common'
import { adminInterpolationObject } from '../common'
import * as service from '../../../db/sql/services/reportService'

type adminUsersInterpolation = adminInterpolationObject & {
    newUsers?: number
    userReports?: Array<UserReportsOutput> | undefined
}

let adminUsersInterpolation : adminUsersInterpolation = {
    page: "Users",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Users {
    public static async index (req: Request, res: Response): Promise<void> {
        [adminUsersInterpolation.usernameToken, adminUsersInterpolation.userIDToken, adminUsersInterpolation.isAdmin] = await getUserToken(req)
        adminUsersInterpolation.userReports = await getReports(0)
        // add functionality to test if user is admin
        if (adminUsersInterpolation.isAdmin) {
            return res.render('admin/users/index.pug', adminUsersInterpolation)
        }
        return res.status(404).render('error/404.pug', adminUsersInterpolation)
    }
}

const getReports = async(page: number): Promise<Array<UserReportsOutput> | undefined> => {
    return service.getUserReportsPaginated(page)
}

export default Users