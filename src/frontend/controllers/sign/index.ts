import {Request, Response} from 'express'
import {getUserToken} from '../common'

let signInterpolation: {
    page: string,
    userToken?: string
} = {
    page: "Sign"
}

class Sign {
    public static async index(req: Request, res: Response): Promise<void> {
        signInterpolation.userToken = await getUserToken(req)
        return res.render('sign/index.pug', signInterpolation)
    }
    public static async in(req: Request, res: Response): Promise<void> {
        signInterpolation.userToken = await getUserToken(req)
        return res.render('sign/in/index.pug', signInterpolation)
    }
    public static async in_forgot(req: Request, res: Response): Promise<void> {
        signInterpolation.userToken = await getUserToken(req)
        return res.render('sign/in/forgot.pug')
    }
    public static async up(req: Request, res: Response): Promise<void> {
        signInterpolation.userToken = await getUserToken(req)
        return res.render('sign/up.pug', signInterpolation)
    }
    public static async out(req: Request, res: Response): Promise<void> {
        signInterpolation.userToken = await getUserToken(req)
        return res.render('sign/out.pug', signInterpolation)
    }
}

export default Sign