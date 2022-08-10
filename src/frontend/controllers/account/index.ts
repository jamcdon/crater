import {Request, Response} from 'express'

let accountInterpolation: {page: string, username?: string } = {
    page: "Account"
} 

class Account {
    public static index (req: Request, res: Response): void {
        return res.render('account/index.pug', accountInterpolation)
    }
    public static user (req: Request, res: Response): void {
        accountInterpolation.username = req.params.username;
        return res.render('account/user.pug', accountInterpolation)
    }
}

export default Account