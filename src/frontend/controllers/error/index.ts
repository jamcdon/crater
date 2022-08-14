import { Request, Response } from "express";

class Error {
    public static index (req: Request, res: Response): void {
        res.status(404)
        res.render('error/404.pug', {"page": 404})
    }
}

export default Error