import {Request, Response} from 'express'
import * as mapper from '../../../api/controllers/user/mapper'
import * as service from '../../../db/sql/services/userService'
import {User} from '../../../api/interfaces'
import { UserOutput } from '../../../db/sql/models/User'

let accountInterpolation: {page: string, username?: number } = {
    page: "Account"
} 

class Account {
    public static index (req: Request, res: Response): void {
        return res.render('account/index.pug', accountInterpolation)
    }
    public static async user (req: Request, res: Response): Promise<void> {
        const userObject: User = await mapper.toUser(
            await service.getByUsername(req.params.username)
        )
        accountInterpolation.username = userObject.id;
        return res.render('account/user.pug', accountInterpolation)
    }
}

export default Account