import {Request, Response} from 'express'
import * as mapper from '../../../api/controllers/user/mapper'
import * as service from '../../../db/sql/services/userService'
import * as interactionsService from '../../../db/sql/services/interactionsService'
import {User} from '../../../api/interfaces'
import {getUserToken, interpolationObject} from '../common'
import { ComposeModification } from '../../../db/nosql/models/Compose'
import * as composeService from '../../../db/nosql/services/composeService'
import * as composeMapper from '../../../api/controllers/compose/mapper'

type accountInterpolationObject = interpolationObject & {
    id?: number,
    username?: string,
    createdAt?: string,
    status?: string,
    activity?: Array<ComposeModification>
}

let accountInterpolation: accountInterpolationObject = {
    page: "Account",
    minioPublic: process.env.MINIO_PUBLIC as string,
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
                const userObject: User = mapper.toUser(userOutputObject)

                accountInterpolation.username = userObject.username
                accountInterpolation.id = userObject.id;
                accountInterpolation.createdAt = userObject.createdAt.toDateString();
                [accountInterpolation.usernameToken, accountInterpolation.userIDToken] = await getUserToken(req);

                if (accountInterpolation.userIDToken != undefined){
                    const notUser = (accountInterpolation.usernameToken != userObject.username)
                    accountInterpolation.activity = await this.setUserInteractions(accountInterpolation.userIDToken, notUser)
                    console.log(accountInterpolation)
                }
                return res.render('account/user.pug', accountInterpolation)
            }
            return res.status(404).render('error/404.pug', accountInterpolation)
        }
        catch{
            return res.status(404).render('error/404.pug', accountInterpolation)
        }
    }
    
    public static async logout (req: Request, res: Response): Promise<void> {
        accountInterpolation.status = req.params.status;
        [accountInterpolation.usernameToken, accountInterpolation.userIDToken] = await getUserToken(req);
        res.render('account/logout.pug', accountInterpolation)
    }

    public static setUserInteractions = async (userID: number, findPublic: boolean): Promise<Array<ComposeModification> | undefined> => {
        const composeIDs = await interactionsService.getAllFromUser(userID)
        if (composeIDs != undefined){
            const composes = await composeService.getByIds(composeIDs, findPublic, 1)
            console.log(composes)
            if (composes != undefined){
                const modifiedComposes = await composeMapper.toComposeModifications(composes)
                return modifiedComposes
            }
            return undefined
        }
        
        return undefined
    }
}

export default Account