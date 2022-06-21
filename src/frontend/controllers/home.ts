import {Request, Response } from 'express'

class Home {
    public static index (req: Request, res: Response): void {
        return res.render('pages/home')
    }
}

export default Home;