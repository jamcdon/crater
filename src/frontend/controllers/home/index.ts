import {Request, Response } from 'express'
import {getUserToken} from '../common'

let homeInterpolation: {
    page: string,
    userToken?: string
} = {
    page: "Home"
}

class Home {
    public static async index (req: Request, res: Response): Promise<void> {
        homeInterpolation.userToken = await getUserToken(req)
        return res.render('home/index.pug', homeInterpolation)
    }
}

export default Home