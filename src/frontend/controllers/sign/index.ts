import {Request, Response} from 'express'

const signInterpolation = {

}

class Sign {
    public static index(req: Request, res: Response): void {
        return res.render('sign/index.pug', signInterpolation)
    }
    public static in(req: Request, res: Response): void {
        return res.render('sign/in', signInterpolation)
    }
    public static up(req: Request, res: Response): void {
        return res.render('sign/up', signInterpolation)
    }
    public static out(req: Request, res: Response): void {
        return res.render('sign/out', signInterpolation)
    }
}

export default Sign