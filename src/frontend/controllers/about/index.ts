import {Request, Response } from 'express'

const aboutInterpolation = {
    page: "About"
}

class About {
    public static index (req: Request, res: Response): void {
        return res.render('about/index.pug', aboutInterpolation)
    }
    public static team (req: Request, res: Response): void {
        return res.render('about/team.pug', aboutInterpolation)
    }
}

export default About