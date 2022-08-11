import {Request, Response} from 'express'
import * as mapper from '../../../api/controllers/user/mapper'
import * as service from '../../../db/sql/services/userService'
import {User} from '../../../api/interfaces'
import { UserOutput } from '../../../db/sql/models/User'

let accountInterpolation: {
    page: string,
    id?: number,
    username?: string,
    createdAt?: string
} = {
        page: "Account"
} 

class Account {
    public static index (req: Request, res: Response): void {
        return res.render('account/index.pug', accountInterpolation)
    }
    public static async user (req: Request, res: Response): Promise<void> {
        try {
            const userObject: User = await mapper.toUser(
                await service.getByUsername(req.params.username)
            )
            accountInterpolation.username = userObject.username
            accountInterpolation.id = userObject.id;
            accountInterpolation.createdAt = userObject.createdAt.toDateString()
            return res.render('account/user.pug', accountInterpolation)
        }
        catch{
            res.status(404)
            return res.render('error/404.pug', {errorPage: "Account"})
        }
    }
}

export default Account