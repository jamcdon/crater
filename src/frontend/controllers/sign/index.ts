import {Request, Response} from 'express'

const signInterpolation = {
    page: "Sign"
}

class Sign {
    public static index(req: Request, res: Response): void {
        return res.render('sign/index.pug', signInterpolation)
    }
    public static in(req: Request, res: Response): void {
        return res.render('sign/in/index.pug', signInterpolation)
    }
    public static in_forgot(req: Request, res: Response): void {
        return res.render('sign/in/forgot.pug')
    }
    public static up(req: Request, res: Response): void {
        return res.render('sign/up.pug', signInterpolation)
    }
    public static out(req: Request, res: Response): void {
        return res.render('sign/out.pug', signInterpolation)
    }
}

export default Sign