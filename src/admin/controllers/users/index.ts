import { Request, Response } from 'express'
import { getUserToken } from '../../../frontend/controllers/common'
import { adminInterpolationObject } from '../common'

type adminUsersInterpolation = adminInterpolationObject & {
    newUsers?: number
}

let adminUsersInterpolation : adminUsersInterpolation = {
    page: "Users",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Users {
    public static async index (req: Request, res: Response): Promise<void> {
        [adminUsersInterpolation.usernameToken, adminUsersInterpolation.userIDToken, adminUsersInterpolation.isAdmin] = await getUserToken(req)
        // add functionality to test if user is admin
        if (adminUsersInterpolation.isAdmin) {
            return res.render('admin/users/index.pug', adminUsersInterpolation)
        }
        return res.status(404).render('error/404.pug', adminUsersInterpolation)
    }
}

export default Users