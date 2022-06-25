import {Request, Response} from 'express'

const accountInterpolation = {
    page: "Account"
}

class Account {
    public static index (req: Request, res: Response): void {
        return res.render('acount/index.pug', accountInterpolation)
    }
}

export default Account