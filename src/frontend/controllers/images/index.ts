import {Request, Response } from 'express'

const imagesInterpolation = {
    page: "Images"
}

class Images {
    public static index (req: Request, res: Response): void {
        return res.render('images/index.pug', imagesInterpolation)
    }
}

export default Images