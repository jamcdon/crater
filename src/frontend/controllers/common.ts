import { Request } from "express";
import { redisClient } from "../../db/cache/init";
import { UserCookieDTO } from "../../api/dto/user.dto";

export const getUserToken = async function (req: Request): Promise<[string | undefined, number | undefined]>{
    if (req.signedCookies.loginToken) {
        const loginToken = await redisClient.get(req.signedCookies.loginToken)
        if (loginToken != null){
            try {
                const userCookie: UserCookieDTO = JSON.parse(loginToken)
                return [userCookie.username, userCookie.id]
            }
            catch {
                return [undefined, undefined]
            }
        }
    }
    return [undefined, undefined]
}

export type interpolationObject = {
    page: string,
    minioPublic: string,
    userIDToken?: number,
    usernameToken?: string
}