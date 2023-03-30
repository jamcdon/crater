import { Request } from "express";
import { redisClient } from "../../db/cache/init";
import { UserCookieDTO } from "../../api/dto/user.dto";

export const getUserToken = async function (req: Request): Promise<[username: string | undefined, id: number | undefined, isAdmin: boolean]>{
    if (req.signedCookies.loginToken) {
        const loginToken = await redisClient.get(req.signedCookies.loginToken)
        if (loginToken != null){
            try {
                const userCookie: UserCookieDTO = JSON.parse(loginToken)
                return [userCookie.username, userCookie.id, userCookie.isAdmin]
            }
            catch {
                return [undefined, undefined, false]
            }
        }
    }
    return [undefined, undefined, false]
}

export type interpolationObject = {
    page: string,
    minioPublic: string,
    userIDToken?: number,
    usernameToken?: string
    isAdmin?: boolean
}