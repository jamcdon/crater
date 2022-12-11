import { Request } from "express";
import { redisClient } from "../../db/cache/init";

export const getUserToken = async function (req: Request): Promise<string | undefined> {
    if (req.signedCookies.loginToken) {
        const userToken = await redisClient.get(req.signedCookies.loginToken)
        if (userToken != null){
            return userToken
        }
    }
    return undefined
}