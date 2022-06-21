import { Router, Request, Response } from 'express'

const homeRouter = Router()

homeRouter.get('/', async (req: Request, res: Response) => {
    return res.render("pages/home")
})

export default homeRouter