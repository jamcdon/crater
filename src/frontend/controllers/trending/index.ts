import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'

type trendingInterpolationObject = interpolationObject

let trendingInterpolation: trendingInterpolationObject = {
    page: "Trending"
}

class Trending {
    public static async index (req: Request, res: Response): Promise<void> {
        [trendingInterpolation.usernameToken, trendingInterpolation.userIDToken] = await getUserToken(req);
        return res.render('trending/index.pug', trendingInterpolation)
    }
}

export default Trending