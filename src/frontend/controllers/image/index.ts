import {Request, Response } from 'express'

const imageInterpolation = {
    page: "Images"
}

class Image {
    public static index (req: Request, res: Response): void {
        return res.render('image/index.pug', imageInterpolation)
    }
}

export default Image