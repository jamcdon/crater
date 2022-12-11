import {Request, Response} from 'express'
import * as mapper from '../../../api/controllers/user/mapper'
import * as service from '../../../db/sql/services/userService'
import {User} from '../../../api/interfaces'
import { UserOutput } from '../../../db/sql/models/User'
import {redisClient} from '../../../db/cache/init'
import {getUserToken, interpolationObject} from '../common'

type accountInterpolationObject = interpolationObject & {
    id?: number,
    username?: string,
    createdAt?: string,
}

let accountInterpolation: accountInterpolationObject = {
        page: "Account"
} 

class Account {
    public static async index (req: Request, res: Response): Promise<void> {
        [accountInterpolation.usernameToken, accountInterpolation.userIDToken] = await getUserToken(req);
        return res.render('account/user.pug', accountInterpolation)
    }
    public static async user (req: Request, res: Response): Promise<void> {
        try {
            const userObject: User = await mapper.toUser(
                await service.getByUsername(req.params.username)
            )
            accountInterpolation.username = userObject.username
            accountInterpolation.id = userObject.id;
            accountInterpolation.createdAt = userObject.createdAt.toDateString();
            [accountInterpolation.usernameToken, accountInterpolation.userIDToken] = await getUserToken(req);
            return res.render('account/user.pug', accountInterpolation)
        }
        catch{
            res.status(404)
            return res.render('error/404.pug', accountInterpolation/*{errorPage: "Account", userID: accountInterpolation.userToken}*/)
        }
    }
}

export default Account