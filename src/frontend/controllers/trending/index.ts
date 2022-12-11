import {Request, Response } from 'express'
import {getUserToken} from '../common'

let trendingInterpolation: {
    page: string,
    userToken?: string
} = {
    page: "Trending"
}

class Trending {
    public static async index (req: Request, res: Response): Promise<void> {
        trendingInterpolation.userToken = await getUserToken(req)
        return res.render('trending/index.pug', trendingInterpolation)
    }
}

export default Trending