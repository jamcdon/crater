import {Request, Response } from 'express'

const homeInterpolation = {
    page: "Home"
}

class Home {
    public static index (req: Request, res: Response): void {
        return res.render('home/index.pug', homeInterpolation)
    }
}

export default Home;