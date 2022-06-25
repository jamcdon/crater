import {Request, Response} from 'express'

const accountInterpolation = {

}

class Account {
    public static index (req: Request, res: Response): void {
        return res.render('acount/index.pug', accountInterpolation)
    }
}

export default Account