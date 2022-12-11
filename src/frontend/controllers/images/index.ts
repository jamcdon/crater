import {Request, Response } from 'express'
import {getUserToken} from '../common'

let imagesInterpolation: {
    page: string,
    userToken?: string 
} = {
    page: "Images"
}

class Images {
    public static async index (req: Request, res: Response): Promise<void> {
        imagesInterpolation.userToken = await getUserToken(req)
        return res.render('images/index.pug', imagesInterpolation)
    }
}

export default Images