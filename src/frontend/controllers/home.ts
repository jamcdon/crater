import {Request, Response } from 'express'

const homeInterpolation = {
    page: "Home"
}

class Home {
    public static index (req: Request, res: Response): void {
        return res.render('pages/home.pug', homeInterpolation)
    }
}

export default Home;