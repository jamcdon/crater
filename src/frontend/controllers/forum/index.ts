import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'

type forumInterpolationObject = interpolationObject

let forumInterpolation: forumInterpolationObject  = {
    page: "Forum",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Forum {
    public static async index (req: Request, res: Response): Promise<void> {
        [forumInterpolation.usernameToken, forumInterpolation.userIDToken, forumInterpolation.isAdmin] = await getUserToken(req);
        return res.render('forum/index.pug', forumInterpolation)
    }
}

export default Forum