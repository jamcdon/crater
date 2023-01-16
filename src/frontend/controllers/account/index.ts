import {application, Request, Response} from 'express'
import * as mapper from '../../../api/controllers/user/mapper'
import * as service from '../../../db/sql/services/userService'
import {User} from '../../../api/interfaces'
import {getUserToken, interpolationObject} from '../common'

type accountInterpolationObject = interpolationObject & {
    id?: number,
    username?: string,
    createdAt?: string,
    status?: string
}

let accountInterpolation: accountInterpolationObject = {
        page: "Account"
} 

class Account {
    public static async index (req: Request, res: Response): Promise<void> {
        [accountInterpolation.usernameToken, accountInterpolation.userIDToken] = await getUserToken(req);
        if (typeof(accountInterpolation.usernameToken) === "string"){
            req.params.username = accountInterpolation.usernameToken
            return Account.user(req, res)
        }
        return res.status(404).render('error/404.pug', accountInterpolation)
    }
    public static async user (req: Request, res: Response): Promise<void> {
        try{
            const userOutputObject = await service.getByUsername(req.params.username)
            if (userOutputObject != null){
                const userObject: User = await mapper.toUser(userOutputObject)
                accountInterpolation.username = userObject.username
                accountInterpolation.id = userObject.id;
                accountInterpolation.createdAt = userObject.createdAt.toDateString();
                [accountInterpolation.usernameToken, accountInterpolation.userIDToken] = await getUserToken(req);
                return res.render('account/user.pug', accountInterpolation)
            }
            return res.status(404).render('error/404.pug', accountInterpolation)
        }
        catch{
            return res.status(404).render('error/404.pug', accountInterpolation)
        }
    }
        /*try{
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
            return res.render('error/404.pug', accountInterpolation)
        }
    }*/
    public static async logout (req: Request, res: Response): Promise<void> {
        accountInterpolation.status = req.params.status;
        [accountInterpolation.usernameToken, accountInterpolation.userIDToken] = await getUserToken(req);
        res.render('account/logout.pug', accountInterpolation)
    }
}

export default Account