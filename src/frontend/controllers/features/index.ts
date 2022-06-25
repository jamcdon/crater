import {Request, Response } from 'express'

const featuresInterpolation = {
    page: "Features"
}

class Features {
    public static index (req: Request, res: Response): void {
        return res.render('features/index.pug', featuresInterpolation)
    }
    public static glance(req: Request, res: Response): void {
        return res.render('features/glance.pug', featuresInterpolation)
    }
    public static submissions(req: Request, res: Response): void {
        return res.render('features/submissions.pug', featuresInterpolation)
    }
}

export default Features