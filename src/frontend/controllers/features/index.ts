import {Request, Response } from 'express'

const featuresInterpolation = {
    page: "Features"
}

class Features {
    public static index (req: Request, res: Response): void {
        return res.render('features/index.pug', featuresInterpolation)
    }
}

export default Features