import { Request, Response } from 'express'
import { getUserToken } from '../../../frontend/controllers/common'
import { adminInterpolationObject } from '../common'
import * as jwt from 'jsonwebtoken'
import * as userService from '../../../db/sql/services/userService'
import { SignInUserDTO } from '../../../api/dto/user.dto'
import { saltHash } from '../../../api/controllers/user'

type adminHomeInterpolation = adminInterpolationObject

let adminHomeInterpolation : adminHomeInterpolation = {
    page: "Home",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Home {
    public static async index (req: Request, res: Response): Promise<void> {
        [adminHomeInterpolation.usernameToken, adminHomeInterpolation.userIDToken, adminHomeInterpolation.isAdmin] = await getUserToken(req)
        if (adminHomeInterpolation.isAdmin) {
                return res.render('admin/index.pug', adminHomeInterpolation)
        }
        return res.status(404).render('error/404.pug', adminHomeInterpolation)
    }
    public static async authenticate(req: Request, res: Response) {
        [adminHomeInterpolation.usernameToken, adminHomeInterpolation.userIDToken, adminHomeInterpolation.isAdmin] = await getUserToken(req)
        let payload: SignInUserDTO = req.body
        try {
            if (adminHomeInterpolation.usernameToken != undefined){
                const adminJWT = await setJWT(payload, adminHomeInterpolation.usernameToken)
                console.log(adminJWT)
                if (adminJWT != undefined){
                    res.cookie("adminToken", adminJWT, {signed: true, maxAge: 1800000})
                    return res.status(200).send()
                }
            }
           return res.status(403).send()
        }
        catch {
            return res.status(401).send()
        }
    }
}

const setJWT = async (payload: SignInUserDTO, usernameToken: string): Promise<string | undefined> => {
    const jwtSignature = process.env.JWT_SIGNATURE as string;
    if (payload.password != undefined){
        const salt = await userService.getSaltFromEmail(payload.email)
        const hash = saltHash(payload.password, salt).hexHash
        const newPayload: SignInUserDTO = {
            email: payload.email,
            hash: hash
        }
        const matchedUsername = await userService.authenticateByEmail(newPayload)
        if (matchedUsername == usernameToken){
            return jwt.sign({authenticated: true}, jwtSignature, {expiresIn: '1800s'})
        }
    }
    return undefined
}

export default Home