import {Request, Response } from 'express'

const trendingInterpolation = {
    page: "Trending"
}

class Trending {
    public static index (req: Request, res: Response): void {
        return res.render('trending/index.pug', trendingInterpolation)
    }
}

export default Trending