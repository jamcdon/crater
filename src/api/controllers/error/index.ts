import { Request, Response } from "express";

export class errorController {
    public static index (req: Request, res: Response): void {
        res.status(404)
        res.send({"Error": "404: Route not found"})
    }
}
